import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, getUserProfile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isPasswordRecovery: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const SIGNOUT_TIMEOUT_MS = 6000;

function forceLocalSignOut() {
  try {
    // Remove Supabase tokens from localStorage/sessionStorage
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith('sb-') && k.endsWith('-auth-token')) localStorage.removeItem(k);
      if (k.toLowerCase().includes('supabase')) localStorage.removeItem(k);
    }
    for (const k of Object.keys(sessionStorage)) {
      if (k.startsWith('sb-') || k.toLowerCase().includes('supabase')) sessionStorage.removeItem(k);
    }
  } catch (e) {
    console.warn('[AuthContext] Storage cleanup warning:', e);
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  const refreshProfile = async () => {
    if (!user) return;
    const { data, error } = await getUserProfile(user.id);
    if (!error && data) setProfile(data);
  };

  const signOut = async () => {
    console.log('[AuthContext] 🔄 Starting sign out process...');
    console.log('[AuthContext] 📤 Signing out locally...');

    const localSignOut = supabase.auth.signOut({ scope: 'local' });
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('signOut timeout')), SIGNOUT_TIMEOUT_MS)
    );

    let hung = false;
    try {
      await Promise.race([localSignOut, timeout]);
    } catch (e) {
      hung = true;
      console.warn('[AuthContext] signOut hung, forcing local cleanup:', e);
      forceLocalSignOut();
    }

    // Best-effort global revoke (non-blocking)
    console.log('[AuthContext] 🌐 Attempting global sign out (non-blocking)...');
    supabase.auth.signOut({ scope: 'global' }).catch(err =>
      console.warn('[AuthContext] Global revoke failed (non-critical):', err)
    );

    // Reset local app state immediately
    console.log('[AuthContext] 🧹 Cleaning up authentication state...');
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsPasswordRecovery(false);

    // Extra safety: if local signOut didn’t hang, still nuke any stray tokens
    if (!hung) forceLocalSignOut();

    console.log('[AuthContext] ✅ Sign out process completed, redirecting…');
    // Hard navigate so a stale in-memory session can’t resurrect the UI
    window.location.assign('/login');
  };

  useEffect(() => {
    // Bootstrap session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (login/logout/password recovery)
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'PASSWORD_RECOVERY') setIsPasswordRecovery(true);
      if (!session?.user) {
        setProfile(null);
        setIsPasswordRecovery(false);
        return;
      }

      const { data: prof, error } = await getUserProfile(session.user.id);
      if (!error && prof) setProfile(prof);
    });

    return () => {
      try {
        data.subscription.unsubscribe();
      } catch {}
    };
  }, []);

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
    refreshProfile,
    isPasswordRecovery,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 