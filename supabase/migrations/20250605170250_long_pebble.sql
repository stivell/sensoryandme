/*
  # Add foreign key relationship between bookings and users tables

  1. Changes
    - Add foreign key constraint between bookings.user_id and users.id
    - This enables joining bookings with users table for fetching user details

  2. Purpose
    - Allows fetching user details (email, phone) alongside booking information
    - Required for admin dashboard functionality
*/

DO $$ 
BEGIN
  -- Check if the foreign key constraint already exists
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'bookings_user_id_fkey' 
    AND table_name = 'bookings'
  ) THEN
    -- Add the foreign key constraint
    ALTER TABLE public.bookings
    ADD CONSTRAINT bookings_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users (id)
    ON DELETE CASCADE;
  END IF;
END $$;