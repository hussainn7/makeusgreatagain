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
    if (!user) {
      // eslint-disable-next-line no-console
      console.error('[ProgressContext] No user found');
      return;
    }

    // eslint-disable-next-line no-console
    console.log('[ProgressContext] Marking lesson complete:', { courseSlug, lessonSlug, quizScore, quizTotal });

    try {
      // First check if we already have this lesson marked complete
      const { data: existing } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_slug', courseSlug)
        .eq('lesson_slug', lessonSlug)
        .maybeSingle();

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
      if (existing?.id) {
        // Update existing record
        const result = await supabase
          .from('user_progress')
          .update(progressData)
          .eq('id', existing.id);
        error = result.error;
      } else {
        // Insert new record
        const result = await supabase
          .from('user_progress')
          .insert([progressData]);
        error = result.error;
      }

      if (error) {
        // eslint-disable-next-line no-console
        console.error('[ProgressContext] Error marking complete:', error);
        throw error;
      }

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
