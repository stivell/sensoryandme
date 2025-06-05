/*
  # Add existing users to users table
  
  1. Changes
    - Inserts any existing auth.users into public.users table that don't already exist
    - Preserves existing user data
    - Sets appropriate role based on email domain
  
  2. Security
    - Maintains existing RLS policies
    - Preserves data integrity with foreign key constraints
*/

-- Insert any existing auth users that aren't already in the users table
INSERT INTO public.users (id, email, role, created_at)
SELECT 
  id,
  email,
  CASE 
    WHEN email LIKE '%@sensorymeplay.org' THEN 'admin'
    ELSE 'parent'
  END as role,
  created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;