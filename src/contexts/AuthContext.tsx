import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
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
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  const refreshProfile = async () => {
    if (user) {
      const { data, error } = await getUserProfile(user.id);
      if (!error && data) {
        setProfile(data);
      }
    }
  };

  const signOut = async () => {
    console.log('[AuthContext] 🔄 Starting sign out process...');

    try {
      // Clear local session first for responsive UI
      console.log('[AuthContext] 📤 Signing out locally...');
      await supabase.auth.signOut({ scope: 'local' });

      // Attempt global sign out (non-blocking)
      console.log('[AuthContext] 🌐 Attempting global sign out...');
      supabase.auth.signOut({ scope: 'global' }).catch((error) => {
        console.error('[AuthContext] ⚠️ Global sign out error (non-critical):', error);
      });
    } catch (err) {
      console.error('[AuthContext] ❌ Sign out error:', err);
    } finally {
      // Comprehensive cleanup of all auth-related data
      console.log('[AuthContext] 🧹 Cleaning up authentication data...');

      try {
        // Clear all Supabase-related localStorage keys
        const keys = Object.keys(window.localStorage);
        let clearedKeys = 0;
        for (const key of keys) {
          if (key.startsWith('sb-') || key.includes('supabase')) {
            window.localStorage.removeItem(key);
            clearedKeys++;
          }
        }
        console.log(`[AuthContext] 🗑️ Cleared ${clearedKeys} auth-related keys from localStorage`);

        // Clear sessionStorage as well (just in case)
        const sessionKeys = Object.keys(window.sessionStorage);
        for (const key of sessionKeys) {
          if (key.startsWith('sb-') || key.includes('supabase')) {
            window.sessionStorage.removeItem(key);
          }
        }
      } catch (storageError) {
        console.error('[AuthContext] ⚠️ Storage cleanup error (non-critical):', storageError);
      }

      // Reset all auth state
      console.log('[AuthContext] 🔄 Resetting authentication state...');
      setUser(null);
      setSession(null);
      setProfile(null);

      console.log('[AuthContext] ✅ Sign out process completed');
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
      }

      if (session?.user) {
        // Fetch user profile
        const { data, error } = await getUserProfile(session.user.id);
        if (!error && data) {
          setProfile(data);
        }
      } else {
        setProfile(null);
        setIsPasswordRecovery(false);
      }
    });

    return () => subscription.unsubscribe();
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