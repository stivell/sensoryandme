/*
  # Add enrollment management functions

  1. Functions
    - `increment_enrollment` - Increases enrollment count for a class
    - `decrement_enrollment` - Decreases enrollment count for a class (for cancellations)
  
  2. Security
    - Functions can be called by authenticated users
    - Includes safety checks to prevent negative enrollment
*/

-- Function to increment enrollment count
CREATE OR REPLACE FUNCTION increment_enrollment(p_class_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE classes 
  SET enrolled = enrolled + 1 
  WHERE id = p_class_id;
END;
$$;

-- Function to decrement enrollment count
CREATE OR REPLACE FUNCTION decrement_enrollment(p_class_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE classes 
  SET enrolled = GREATEST(enrolled - 1, 0)
  WHERE id = p_class_id;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION increment_enrollment(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION decrement_enrollment(uuid) TO authenticated;