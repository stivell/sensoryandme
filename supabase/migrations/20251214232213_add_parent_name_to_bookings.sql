/*
  # Add parent_name column to bookings table

  1. Changes
    - Add `parent_name` column to bookings table to store the parent's name
  
  2. Notes
    - Column is nullable to allow for existing records
    - New bookings should include parent_name
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'parent_name'
  ) THEN
    ALTER TABLE bookings ADD COLUMN parent_name text;
  END IF;
END $$;
