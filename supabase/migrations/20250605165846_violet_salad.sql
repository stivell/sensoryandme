/*
  # Add parent_name column to bookings table
  
  1. Changes
    - Add parent_name column to bookings table
    - Migrate existing data from users table
    - Set NOT NULL constraint
  
  2. Notes
    - Uses a safe migration approach to handle existing data
    - Ensures no null values in the final state
*/

-- First add the column as nullable to handle existing data
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS parent_name text;

-- Update existing bookings with parent names from users table
-- Use COALESCE to handle null values from the users table
UPDATE bookings b
SET parent_name = COALESCE(
  (SELECT name FROM users u WHERE u.id = b.user_id),
  'Unknown Parent'
);

-- Update any remaining null values
UPDATE bookings
SET parent_name = 'Unknown Parent'
WHERE parent_name IS NULL;

-- Now make the column NOT NULL since all existing rows have values
ALTER TABLE bookings
ALTER COLUMN parent_name SET NOT NULL;