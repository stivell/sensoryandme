/*
  # Add parent name to bookings table

  1. Changes
    - Add parent_name column to bookings table
    - Handle existing records by coalescing null values
    - Ensure data consistency for future records

  2. Notes
    - Uses COALESCE to handle null values from users table
    - Maintains NOT NULL constraint for new records
*/

-- First add the column as nullable to handle existing data
ALTER TABLE bookings
ADD COLUMN parent_name text;

-- Update existing bookings with parent names from users table
-- Use COALESCE to handle null values from the users table
UPDATE bookings b
SET parent_name = COALESCE(u.name, 'Unknown Parent')
FROM users u
WHERE b.user_id = u.id;

-- Update any remaining null values
UPDATE bookings
SET parent_name = 'Unknown Parent'
WHERE parent_name IS NULL;

-- Now make the column NOT NULL since all existing rows have values
ALTER TABLE bookings
ALTER COLUMN parent_name SET NOT NULL;