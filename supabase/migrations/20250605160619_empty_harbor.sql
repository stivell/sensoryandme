/*
  # Add initial admin user
  
  1. Changes
    - Insert admin user into auth.users
    - The trigger will automatically create the corresponding entry in public.users with role='admin'
*/

-- Insert admin user into auth.users if not exists
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token
)
SELECT 
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@sensorymeplay.org',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  encode(gen_random_bytes(32), 'base64')
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@sensorymeplay.org'
);