-- Create user_progress table to track course progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  unit_order INTEGER NOT NULL,
  lesson_slug TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  quiz_score INTEGER,
  quiz_total INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_slug, lesson_slug)
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course ON user_progress(course_slug);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON user_progress(lesson_slug);

-- Add trigger for updated_at
CREATE TRIGGER update_user_progress_updated_at 
  BEFORE UPDATE ON user_progress 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to get user's course progress
CREATE OR REPLACE FUNCTION get_course_progress(
  p_user_id UUID,
  p_course_slug TEXT
)
RETURNS TABLE (
  total_lessons INTEGER,
  completed_lessons INTEGER,
  current_unit INTEGER,
  current_lesson TEXT,
  completion_percentage NUMERIC
) AS $$
DECLARE
  total INTEGER;
  completed INTEGER;
  curr_unit INTEGER;
  curr_lesson TEXT;
BEGIN
  -- Get the latest lesson's unit and slug
  SELECT unit_order, lesson_slug INTO curr_unit, curr_lesson
  FROM user_progress
  WHERE user_id = p_user_id AND course_slug = p_course_slug
  ORDER BY completed_at DESC
  LIMIT 1;

  -- Count total and completed lessons
  SELECT COUNT(DISTINCT lesson_slug) INTO completed
  FROM user_progress
  WHERE user_id = p_user_id AND course_slug = p_course_slug;

  -- For total, we'll need to pass this from the application since course content is in JSON files

  RETURN QUERY
  SELECT 
    0 as total_lessons, -- Application needs to provide this
    completed as completed_lessons,
    COALESCE(curr_unit, 1) as current_unit,
    curr_lesson as current_lesson,
    0 as completion_percentage; -- Application will calculate this
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
