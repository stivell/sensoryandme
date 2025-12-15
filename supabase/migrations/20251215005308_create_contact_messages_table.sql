/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Sender's name
      - `email` (text) - Sender's email address
      - `subject` (text) - Message subject
      - `message` (text) - Message content
      - `status` (text) - Message status (new, read, replied)
      - `created_at` (timestamptz) - Timestamp when message was received

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for authenticated admins to view all messages
    - Add policy for users to insert their own messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );