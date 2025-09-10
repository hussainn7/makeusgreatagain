import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import type { UserProgress, CourseProgress } from '../lib/types';

interface ProgressContextType {
  markLessonComplete: (courseSlug: string, unitOrder: number, lessonSlug: string, quizScore?: number, quizTotal?: number) => Promise<void>;
  getCourseProgress: (courseSlug: string) => Promise<CourseProgress>;
  isLessonCompleted: (courseSlug: string, lessonSlug: string) => boolean;
  loading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user's progress when they log in
  useEffect(() => {
    if (!user) {
      setCompletedLessons([]);
      setLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        setCompletedLessons(data || []);
      } catch (err) {
        console.error('Error loading progress:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const markLessonComplete = async (
    courseSlug: string,
    unitOrder: number,
    lessonSlug: string,
    quizScore?: number,
    quizTotal?: number
  ) => {
    console.log('[ProgressContext] === STARTING LESSON COMPLETION ===');
    console.log('[ProgressContext] User object:', user);
    console.log('[ProgressContext] User ID:', user?.id);
    console.log('[ProgressContext] User email:', user?.email);

    // Test basic Supabase connectivity
    console.log('[ProgressContext] 🧪 Testing Supabase connectivity...');
    try {
      const { data: testData, error: testError } = await supabase.auth.getUser();
      console.log('[ProgressContext] Connectivity test result:', {
        success: !testError,
        hasUser: !!testData?.user,
        error: testError?.message
      });
    } catch (connectError) {
      console.error('[ProgressContext] 🚨 Connectivity test failed:', connectError);
    }

    if (!user) {
      console.error('[ProgressContext] ❌ No user found - cannot save to database');
      console.log('[ProgressContext] Auth state check - user exists:', !!user);
      console.log('[ProgressContext] This might be a guest user or authentication issue');
      return;
    }

    if (!user.id) {
      console.error('[ProgressContext] ❌ User exists but no user.id found');
      console.log('[ProgressContext] User object structure:', Object.keys(user));
      return;
    }

    // Check environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    console.log('[ProgressContext] Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      url: supabaseUrl,
      keyPresent: !!supabaseKey
    });

    if (!supabaseUrl || !supabaseKey) {
      console.error('[ProgressContext] Missing Supabase environment variables');
      return;
    }

    // eslint-disable-next-line no-console
    console.log('[ProgressContext] Marking lesson complete:', { courseSlug, lessonSlug, quizScore, quizTotal });

    try {
      console.log('[ProgressContext] Checking existing progress...');

      // First check if we already have this lesson marked complete
      console.log('[ProgressContext] 🔍 Checking for existing progress record...');
      console.log('[ProgressContext] Query params:', {
        user_id: user.id,
        course_slug: courseSlug,
        lesson_slug: lessonSlug
      });

      // Add timeout to catch hanging requests
      const queryPromise = supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_slug', courseSlug)
        .eq('lesson_slug', lessonSlug)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database query timeout')), 10000)
      );

      const { data: existing, error: checkError } = await Promise.race([
        queryPromise,
        timeoutPromise
      ]).catch((error) => {
        console.error('[ProgressContext] 🚨 Query promise failed:', error);
        return { data: null, error: { message: error.message, code: 'TIMEOUT' } };
      });

      if (checkError) {
        console.error('[ProgressContext] ❌ Database query failed:', {
          error: checkError.message,
          code: checkError.code,
          details: checkError.details,
          hint: checkError.hint
        });

        // Check if it's an authentication error
        if (checkError.message?.includes('JWT') || checkError.message?.includes('auth') || checkError.code === 'PGRST301') {
          console.error('[ProgressContext] 🚨 Authentication error detected!');
          console.log('[ProgressContext] User might need to re-authenticate');
          alert('Your session may have expired. Please try logging in again.');
        }

        return;
      }

      console.log('[ProgressContext] ✅ Database query successful');
      console.log('[ProgressContext] Existing record:', existing);

      // eslint-disable-next-line no-console
      console.log('[ProgressContext] Existing progress:', existing);

      const progressData = {
        user_id: user.id,
        course_slug: courseSlug,
        unit_order: unitOrder,
        lesson_slug: lessonSlug,
        completed_at: new Date().toISOString(),
        quiz_score: quizScore,
        quiz_total: quizTotal,
      };

      let error;
      console.log('[ProgressContext] Progress data to save:', progressData);

      if (existing?.id) {
        console.log('[ProgressContext] Updating existing record...');
        // Update existing record
        const result = await supabase
          .from('user_progress')
          .update(progressData)
          .eq('id', existing.id);
        error = result.error;
        console.log('[ProgressContext] Update result:', { success: !error, error });
      } else {
        console.log('[ProgressContext] Inserting new record...');
        // Insert new record
        const result = await supabase
          .from('user_progress')
          .insert([progressData]);
        error = result.error;
        console.log('[ProgressContext] Insert result:', { success: !error, error });
      }

      if (error) {
        console.error('[ProgressContext] Database operation failed:', {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          operation: existing?.id ? 'update' : 'insert'
        });
        throw error;
      }

      console.log('[ProgressContext] Database operation successful!');

      // eslint-disable-next-line no-console
      console.log('[ProgressContext] Successfully marked complete');

      // Refresh progress with explicit course filter
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_slug', courseSlug);

      // Update local state
      if (data) {
        setCompletedLessons(prev => {
          // Remove old entries for this course
          const filtered = prev.filter(p => p.course_slug !== courseSlug);
          // Add new entries
          return [...filtered, ...data];
        });
      }

      // eslint-disable-next-line no-console
      console.log('[ProgressContext] Updated completed lessons:', data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[ProgressContext] Error marking complete:', err);
      throw err; // Re-throw to let component handle error
    }
  };

  const getCourseProgress = async (courseSlug: string): Promise<CourseProgress> => {
    if (!user) {
      return {
        total_lessons: 0,
        completed_lessons: 0,
        current_unit: 1,
        current_lesson: null,
        completion_percentage: 0,
      };
    }

    try {
      const { data, error } = await supabase
        .rpc('get_course_progress', {
          p_user_id: user.id,
          p_course_slug: courseSlug,
        });

      if (error) throw error;

      return data[0] || {
        total_lessons: 0,
        completed_lessons: 0,
        current_unit: 1,
        current_lesson: null,
        completion_percentage: 0,
      };
    } catch (err) {
      console.error('Error getting course progress:', err);
      return {
        total_lessons: 0,
        completed_lessons: 0,
        current_unit: 1,
        current_lesson: null,
        completion_percentage: 0,
      };
    }
  };

  const isLessonCompleted = (courseSlug: string, lessonSlug: string): boolean => {
    return completedLessons.some(
      (progress) => progress.course_slug === courseSlug && progress.lesson_slug === lessonSlug
    );
  };

  const value = {
    markLessonComplete,
    getCourseProgress,
    isLessonCompleted,
    loading,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};
