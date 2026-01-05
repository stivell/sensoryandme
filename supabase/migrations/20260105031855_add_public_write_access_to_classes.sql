/*
  # Add Public Write Access to Classes Table

  1. Changes
    - Add INSERT policy to allow public users to create classes
    - Add UPDATE policy to allow public users to update classes  
    - Add DELETE policy to allow public users to delete classes
    
  2. Security Note
    - This removes authentication requirements from the admin dashboard
    - All users can now perform CRUD operations on classes
    - Consider adding proper authentication in production
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public insert access to classes" ON classes;
  DROP POLICY IF EXISTS "Allow public update access to classes" ON classes;
  DROP POLICY IF EXISTS "Allow public delete access to classes" ON classes;
END $$;

-- Allow public INSERT access to classes
CREATE POLICY "Allow public insert access to classes"
  ON classes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public UPDATE access to classes
CREATE POLICY "Allow public update access to classes"
  ON classes
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow public DELETE access to classes
CREATE POLICY "Allow public delete access to classes"
  ON classes
  FOR DELETE
  TO public
  USING (true);