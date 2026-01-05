/*
  # Remove Authentication Requirements from Bookings

  1. Changes
    - Make user_id nullable in bookings table
    - Update RLS policies to allow public booking creation
    - Update RLS policies to allow public booking reads (for admin purposes)
  
  2. Security
    - Allow anyone to create bookings without authentication
    - Remove user-specific read restrictions
    - Maintain admin access for all bookings
*/

-- Drop existing policies on bookings
DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;

-- Make user_id nullable
DO $$
BEGIN
  ALTER TABLE bookings ALTER COLUMN user_id DROP NOT NULL;
EXCEPTION
  WHEN others THEN
    -- Column is already nullable or doesn't exist
    NULL;
END $$;

-- Allow public to create bookings
CREATE POLICY "Allow public to create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read all bookings (for admin purposes)
CREATE POLICY "Allow authenticated users to read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);
