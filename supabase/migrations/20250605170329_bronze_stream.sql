/*
  # Fix bookings and users relationship

  1. Changes
    - Add foreign key constraint between bookings.user_id and public.users.id
    
  2. Notes
    - This ensures the relationship between bookings and users tables is properly established
    - The relationship is needed for the admin dashboard to fetch booking data with user information
*/

-- First ensure the foreign key exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'bookings_user_id_users_fkey'
  ) THEN
    ALTER TABLE bookings
    ADD CONSTRAINT bookings_user_id_users_fkey
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE;
  END IF;
END $$;