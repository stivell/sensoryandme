/*
  # Initial database schema for Sensory & ME platform

  1. New Tables
    - `locations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `zip` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `classes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `time` (text)
      - `duration` (integer)
      - `capacity` (integer)
      - `enrolled` (integer)
      - `price` (decimal)
      - `location_id` (uuid, foreign key)
      - `age_group` (text)
      - `skills` (text[])
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `class_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `child_name` (text)
      - `child_age` (integer)
      - `special_needs` (text)
      - `payment_status` (text)
      - `created_at` (timestamp)
    
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create locations table
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to locations"
  ON locations
  FOR SELECT
  TO public
  USING (true);

-- Create classes table
CREATE TABLE classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  duration integer NOT NULL,
  capacity integer NOT NULL,
  enrolled integer DEFAULT 0,
  price decimal NOT NULL,
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  age_group text NOT NULL,
  skills text[] NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to classes"
  ON classes
  FOR SELECT
  TO public
  USING (true);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name text NOT NULL,
  child_age integer NOT NULL,
  special_needs text,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public newsletter subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_classes_date ON classes(date);
CREATE INDEX idx_classes_location_id ON classes(location_id);
CREATE INDEX idx_bookings_class_id ON bookings(class_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);