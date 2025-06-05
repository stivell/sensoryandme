-- Update users table policies
DROP POLICY IF EXISTS "Users can read own profile" ON users;
CREATE POLICY "Users can read profiles"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    -- Users can read their own profile OR admins can read all profiles
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Update bookings table policies
DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
CREATE POLICY "Users can read bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    -- Users can read their own bookings OR admins can read all bookings
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Add index to improve query performance
CREATE INDEX IF NOT EXISTS idx_users_id_role ON users(id, role);