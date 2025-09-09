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
    try {
      // Always clear local session immediately for responsive UI
      await supabase.auth.signOut({ scope: 'local' });
      // Best-effort global revocation (non-blocking for UI correctness)
      supabase.auth.signOut({ scope: 'global' }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Global sign out error:', error);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Unexpected sign out error:', err);
    } finally {
      // Hard clear any lingering Supabase auth tokens from localStorage (rare edge cases)
      try {
        const keys = Object.keys(window.localStorage);
        for (const key of keys) {
          if (key.startsWith('sb-')) {
            window.localStorage.removeItem(key);
          }
        }
        window.localStorage.removeItem('supabase.auth.token');
      } catch {
        // ignore storage access issues
      }

      setUser(null);
      setSession(null);
      setProfile(null);
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