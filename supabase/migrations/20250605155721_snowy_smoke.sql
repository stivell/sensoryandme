/*
  # Add users table for profile information
  
  1. New Tables
    - `users`
      - `id` (uuid, primary key) - references auth.users
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `role` (text) - either 'admin' or 'parent'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Add policies for:
      - Users can read/update their own data
      - Admins can read all user data
  
  3. Functions
    - Trigger to automatically create user profile on auth.user creation
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  phone text,
  role text NOT NULL DEFAULT 'parent' CHECK (role IN ('admin', 'parent')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    CASE 
      WHEN NEW.email LIKE '%@sensorymeplay.org' THEN 'admin'
      ELSE 'parent'
    END
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create index for better query performance
CREATE INDEX idx_users_role ON users(role);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();