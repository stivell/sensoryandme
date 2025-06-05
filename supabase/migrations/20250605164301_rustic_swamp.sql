/*
  # Update bookings policies for admin access
  
  1. Changes
    - Add policy to allow admin users to read all bookings
    - Add policy to allow admin users to update any booking
  
  2. Security
    - Maintains existing user policies
    - Adds admin-specific policies
*/

-- Add policy for admin users to read all bookings
CREATE POLICY "Admin users can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Add policy for admin users to update any booking
CREATE POLICY "Admin users can update any booking"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );