/*
  # Add function to increment class enrollment

  This migration adds a stored procedure to safely increment
  the enrolled count for a class while checking capacity limits.
*/

CREATE OR REPLACE FUNCTION increment_enrollment(p_class_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE classes
  SET enrolled = enrolled + 1
  WHERE id = p_class_id
    AND enrolled < capacity;
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Class is full or does not exist';
  END IF;
END;
$$;