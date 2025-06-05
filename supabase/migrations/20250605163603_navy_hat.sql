/*
  # Add Users-Bookings Relationship

  1. Changes
    - Add foreign key constraint between users and bookings tables
    - This allows proper joining of users with their bookings
    - Ensures referential integrity between the tables

  2. Technical Details
    - Adds foreign key constraint on bookings.user_id referencing users.id
    - Uses ON DELETE CASCADE to automatically remove bookings when a user is deleted
*/

DO $$ BEGIN
  -- Only add the constraint if it doesn't already exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'bookings_user_id_fkey'
    AND table_name = 'bookings'
  ) THEN
    ALTER TABLE public.bookings
    ADD CONSTRAINT bookings_user_id_fkey 
    FOREIGN KEY (user_id) 
    REFERENCES public.users(id)
    ON DELETE CASCADE;
  END IF;
END $$;