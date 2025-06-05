/*
  # Add parent name to bookings table
  
  1. Changes
    - Add parent_name column to bookings table
    - Make it required (NOT NULL)
    - Update existing bookings to use user's name from users table
*/

-- Add parent_name column
ALTER TABLE bookings
ADD COLUMN parent_name text NOT NULL DEFAULT '';

-- Update existing bookings with parent names from users table
UPDATE bookings b
SET parent_name = u.name
FROM users u
WHERE b.user_id = u.id;

-- Remove the default value constraint now that existing records are updated
ALTER TABLE bookings
ALTER COLUMN parent_name DROP DEFAULT;