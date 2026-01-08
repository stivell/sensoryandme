/*
  # Create increment_enrollment function

  1. New Functions
    - `increment_enrollment` - Increments the enrolled count for a class
      - Takes class_id as parameter
      - Updates the enrolled count in classes table
      - Returns void

  2. Purpose
    - Used when creating a new booking to update class enrollment count
    - Ensures atomic updates to prevent race conditions
*/

-- Create function to increment enrollment count
CREATE OR REPLACE FUNCTION increment_enrollment(p_class_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE classes
  SET enrolled = COALESCE(enrolled, 0) + 1
  WHERE id = p_class_id;
END;
$$;

-- Grant execute permission to public (since bookings are public)
GRANT EXECUTE ON FUNCTION increment_enrollment(uuid) TO public;