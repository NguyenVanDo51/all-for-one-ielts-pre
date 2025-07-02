/*
  # Create Quiz Questions Table

  1. New Tables
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `question` (text)
      - `options` (text array)
      - `correct_answer` (integer)
      - `explanation_en` (text)
      - `explanation_vi` (text)
      - `level` (text)
      - `grammar_type_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_questions` table
    - Add policy for public read access
    - Add policy for authenticated users to manage data

  3. Relationships
    - Foreign key to grammar_types table
*/

CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options text[] NOT NULL CHECK (array_length(options, 1) = 4),
  correct_answer integer NOT NULL CHECK (correct_answer >= 0 AND correct_answer <= 3),
  explanation_en text NOT NULL,
  explanation_vi text NOT NULL,
  level text NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  grammar_type_id uuid NOT NULL REFERENCES grammar_types(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to quiz questions
CREATE POLICY "Quiz questions are publicly readable"
  ON quiz_questions
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage quiz questions
CREATE POLICY "Authenticated users can manage quiz questions"
  ON quiz_questions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_quiz_questions_level ON quiz_questions(level);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_grammar_type ON quiz_questions(grammar_type_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at for grammar_types
CREATE TRIGGER update_grammar_types_updated_at
  BEFORE UPDATE ON grammar_types
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to automatically update updated_at for quiz_questions
CREATE TRIGGER update_quiz_questions_updated_at
  BEFORE UPDATE ON quiz_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();