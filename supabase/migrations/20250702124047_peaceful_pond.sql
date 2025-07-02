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
-- Present Tenses
  ('Present Perfect Continuous', 'Present Tenses'),

-- Past Tenses
  ('Past Perfect', 'Past Tenses'),
  ('Past Perfect Continuous', 'Past Tenses'),

-- Future Tenses
  ('Future Simple (will)', 'Future Tenses'),
  ('Be going to', 'Future Tenses'),
  ('Future Continuous', 'Future Tenses'),
  ('Future Perfect', 'Future Tenses'),
  ('Future Perfect Continuous', 'Future Tenses'),

-- Conditionals
  ('Mixed Conditionals', 'Conditionals'),

-- Perfect Tenses
  ('Future Perfect', 'Perfect Tenses'),
  ('Future Perfect Continuous', 'Perfect Tenses'),

-- Modal Verbs
  ('Modal Verbs - May/Might', 'Modal Verbs'),
  ('Modal Verbs - Have to/Need to/Ought to', 'Modal Verbs'),
  ('Modal Verbs - Deduction', 'Modal Verbs'),

-- Passive Voice
  ('Passive Voice Future', 'Passive Voice'),
  ('Passive Voice with Modals', 'Passive Voice'),

-- Reported Speech
  ('Reported Speech - Statements', 'Reported Speech'),
  ('Reported Speech - Questions', 'Reported Speech'),
  ('Reported Speech - Commands/Requests', 'Reported Speech'),

-- Relative Clauses
  ('Relative Clauses - Defining/Non-defining', 'Relative Clauses'),
  ('Relative Pronouns', 'Relative Clauses'),

-- Verb Patterns
  ('Gerund after verb', 'Verb Patterns'),
  ('Infinitive after verb', 'Verb Patterns'),
  ('Verb + object + to V', 'Verb Patterns'),

-- Articles & Determiners
  ('Articles - a/an/the', 'Articles'),
  ('Some/Any/Much/Many', 'Quantifiers'),
  ('This/That/These/Those', 'Determiners'),

-- Comparisons
  ('Comparatives and Superlatives', 'Comparisons'),
  ('As...as / Not as...as', 'Comparisons'),
  ('Too / Enough', 'Comparisons'),

-- Question Forms
  ('WH- Questions', 'Question Forms'),
  ('Yes/No Questions', 'Question Forms'),
  ('Question Tags', 'Question Forms'),

-- Sentence Structures
  ('So / Such', 'Sentence Structures'),
  ('Although / Even though / In spite of', 'Sentence Structures'),
  ('Because / Because of / Due to', 'Sentence Structures'),
  ('Neither / Either / Both', 'Sentence Structures'),
  ('Inversion', 'Advanced Grammar'),

-- Miscellaneous
  ('Causative Form', 'Advanced Grammar'),
  ('Emphasis with do/does', 'Sentence Structures'),
  ('Ellipsis and Substitution', 'Advanced Grammar'),
  ('Common Phrasal Verbs', 'Vocabulary & Usage')
ON CONFLICT (name) DO NOTHING;
