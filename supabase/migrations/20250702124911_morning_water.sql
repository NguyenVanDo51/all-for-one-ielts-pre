/*
  # Add Vietnamese translation to grammar types table

  1. Changes
    - Add `name_vi` column to `grammar_types` table for Vietnamese translations
    - Update existing records with Vietnamese translations
    - Add constraint to ensure Vietnamese name is not null

  2. Security
    - No changes to existing RLS policies
*/

-- Add Vietnamese name column
ALTER TABLE grammar_types ADD COLUMN IF NOT EXISTS name_vi text;

-- Update existing records with Vietnamese translations
UPDATE grammar_types SET name_vi = CASE 
  WHEN name = 'Present Simple Positive' THEN 'Hiện tại đơn khẳng định'
  WHEN name = 'Present Simple Negative' THEN 'Hiện tại đơn phủ định'
  WHEN name = 'Present Simple Questions' THEN 'Hiện tại đơn nghi vấn'
  WHEN name = 'Present Continuous Positive' THEN 'Hiện tại tiếp diễn khẳng định'
  WHEN name = 'Present Continuous Negative' THEN 'Hiện tại tiếp diễn phủ định'
  WHEN name = 'Present Continuous Questions' THEN 'Hiện tại tiếp diễn nghi vấn'
  WHEN name = 'Past Simple Positive' THEN 'Quá khứ đơn khẳng định'
  WHEN name = 'Past Simple Negative' THEN 'Quá khứ đơn phủ định'
  WHEN name = 'Past Simple Questions' THEN 'Quá khứ đơn nghi vấn'
  WHEN name = 'Past Continuous Positive' THEN 'Quá khứ tiếp diễn khẳng định'
  WHEN name = 'First Conditional' THEN 'Câu điều kiện loại 1'
  WHEN name = 'Second Conditional' THEN 'Câu điều kiện loại 2'
  WHEN name = 'Third Conditional' THEN 'Câu điều kiện loại 3'
  WHEN name = 'Zero Conditional' THEN 'Câu điều kiện loại 0'
  WHEN name = 'Present Perfect Positive' THEN 'Hiện tại hoàn thành khẳng định'
  WHEN name = 'Present Perfect Negative' THEN 'Hiện tại hoàn thành phủ định'
  WHEN name = 'Modal Verbs - Can/Could' THEN 'Động từ khuyết thiếu - Can/Could'
  WHEN name = 'Modal Verbs - Should/Must' THEN 'Động từ khuyết thiếu - Should/Must'
  WHEN name = 'Passive Voice Present' THEN 'Câu bị động hiện tại'
  WHEN name = 'Passive Voice Past' THEN 'Câu bị động quá khứ'
  ELSE name
END;

-- Make Vietnamese name required for future records
ALTER TABLE grammar_types ALTER COLUMN name_vi SET NOT NULL;