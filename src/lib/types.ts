export interface UserProgress {
  id: string;
  user_id: string;
  course_slug: string;
  unit_order: number;
  lesson_slug: string;
  completed_at: string;
  quiz_score?: number;
  quiz_total?: number;
  created_at: string;
  updated_at: string;
}

export interface CourseProgress {
  total_lessons: number;
  completed_lessons: number;
  current_unit: number;
  current_lesson: string | null;
  completion_percentage: number;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  units: CourseUnit[];
}

export interface CourseUnit {
  order: number;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  slug: string;
  title: string;
}
