/*
  # Create Grammar Types Table

  1. New Tables
    - `grammar_types`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `grammar_types` table
    - Add policy for public read access
    - Add policy for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS grammar_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE grammar_types ENABLE ROW LEVEL SECURITY;

-- Allow public read access to grammar types
CREATE POLICY "Grammar types are publicly readable"
  ON grammar_types
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage grammar types
CREATE POLICY "Authenticated users can manage grammar types"
  ON grammar_types
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default grammar types
INSERT INTO grammar_types (name, category) VALUES
  ('Present Simple Positive', 'Present Tenses'),
  ('Present Simple Negative', 'Present Tenses'),
  ('Present Simple Questions', 'Present Tenses'),
  ('Present Continuous Positive', 'Present Tenses'),
  ('Present Continuous Negative', 'Present Tenses'),
  ('Present Continuous Questions', 'Present Tenses'),
  ('Past Simple Positive', 'Past Tenses'),
  ('Past Simple Negative', 'Past Tenses'),
  ('Past Simple Questions', 'Past Tenses'),
  ('Past Continuous Positive', 'Past Tenses'),
  ('First Conditional', 'Conditionals'),
  ('Second Conditional', 'Conditionals'),
  ('Third Conditional', 'Conditionals'),
  ('Zero Conditional', 'Conditionals'),
  ('Present Perfect Positive', 'Perfect Tenses'),
  ('Present Perfect Negative', 'Perfect Tenses'),
  ('Modal Verbs - Can/Could', 'Modal Verbs'),
  ('Modal Verbs - Should/Must', 'Modal Verbs'),
  ('Passive Voice Present', 'Passive Voice'),
  ('Passive Voice Past', 'Passive Voice')
ON CONFLICT (name) DO NOTHING;