/*
  # Insert mock data

  1. Data Population
    - Insert location records with proper UUIDs
    - Insert class records with dynamic dates
    - All records use proper data types and constraints

  2. Changes
    - Use gen_random_uuid() for IDs instead of string literals
    - Maintain referential integrity between classes and locations
    - Ensure dates are always in the future using CURRENT_DATE
*/

-- Create temporary table to store location mappings
CREATE TEMPORARY TABLE temp_location_ids (
  temp_id text PRIMARY KEY,
  real_id uuid DEFAULT gen_random_uuid()
);

-- Insert temporary location IDs
INSERT INTO temp_location_ids (temp_id) VALUES
  ('loc1'),
  ('loc2'),
  ('loc3');

-- Insert locations using the generated UUIDs
INSERT INTO locations (id, name, address, city, state, zip, image_url)
SELECT 
  real_id,
  CASE temp_id
    WHEN 'loc1' THEN 'Sensory Center Downtown'
    WHEN 'loc2' THEN 'Eastside Play Studio'
    WHEN 'loc3' THEN 'West Hills Center'
  END,
  CASE temp_id
    WHEN 'loc1' THEN '12334 SilverSpring Place'
    WHEN 'loc2' THEN '456 Oak Avenue'
    WHEN 'loc3' THEN '789 Pine Boulevard'
  END,
  'Portland',
  'OR',
  CASE temp_id
    WHEN 'loc1' THEN '97201'
    WHEN 'loc2' THEN '97215'
    WHEN 'loc3' THEN '97221'
  END,
  CASE temp_id
    WHEN 'loc1' THEN 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg'
    WHEN 'loc2' THEN 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg'
    WHEN 'loc3' THEN 'https://images.pexels.com/photos/8613335/pexels-photo-8613335.jpeg'
  END
FROM temp_location_ids;

-- Insert classes with proper location_id references
INSERT INTO classes (
  id, title, description, date, time, duration, capacity, enrolled, price,
  location_id, age_group, skills, image_url
)
SELECT
  gen_random_uuid(),
  title,
  description,
  (CURRENT_DATE + (interval_days || ' days')::interval)::date as date,
  time,
  duration,
  capacity,
  enrolled,
  price,
  (SELECT real_id FROM temp_location_ids WHERE temp_id = loc_ref),
  age_group,
  skills,
  image_url
FROM (VALUES
  (
    'Sensory Exploration',
    'A play group focused on sensory exploration and regulation through tactile experiences.',
    2,
    '10:00 AM',
    60,
    8,
    5,
    35,
    'loc1',
    '3-5',
    ARRAY['Sensory Processing', 'Fine Motor', 'Social Interaction'],
    'https://images.pexels.com/photos/8535925/pexels-photo-8535925.jpeg'
  ),
  (
    'Social Skills Play',
    'Interactive play designed to develop social skills through collaborative activities.',
    3,
    '1:00 PM',
    60,
    8,
    3,
    35,
    'loc2',
    '6-8',
    ARRAY['Social Skills', 'Communication', 'Emotional Regulation'],
    'https://images.pexels.com/photos/8613165/pexels-photo-8613165.jpeg'
  ),
  (
    'Creative Movement',
    'Movement-based play that encourages body awareness and coordination.',
    4,
    '11:00 AM',
    45,
    10,
    6,
    30,
    'loc3',
    '3-5',
    ARRAY['Gross Motor', 'Coordination', 'Body Awareness'],
    'https://images.pexels.com/photos/8612967/pexels-photo-8612967.jpeg'
  ),
  (
    'Language & Literacy Play',
    'Fun activities focused on language development through stories and interactive play.',
    5,
    '9:30 AM',
    60,
    8,
    4,
    35,
    'loc1',
    '4-6',
    ARRAY['Language', 'Listening', 'Pre-literacy'],
    'https://images.pexels.com/photos/8613261/pexels-photo-8613261.jpeg'
  ),
  (
    'STEM Explorers',
    'Hands-on science and math activities designed for young learners.',
    6,
    '2:00 PM',
    60,
    8,
    7,
    40,
    'loc2',
    '6-8',
    ARRAY['Problem Solving', 'Critical Thinking', 'Curiosity'],
    'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg'
  ),
  (
    'Art & Expression',
    'Creative art experiences that foster self-expression and fine motor development.',
    7,
    '11:00 AM',
    60,
    10,
    5,
    35,
    'loc3',
    '4-6',
    ARRAY['Fine Motor', 'Creativity', 'Self-expression'],
    'https://images.pexels.com/photos/8613335/pexels-photo-8613335.jpeg'
  ),
  (
    'Early Learners Play',
    'Gentle introduction to structured play for our youngest participants.',
    8,
    '9:00 AM',
    45,
    6,
    3,
    30,
    'loc1',
    '2-3',
    ARRAY['Motor Skills', 'Language', 'Social Awareness'],
    'https://images.pexels.com/photos/8612906/pexels-photo-8612906.jpeg'
  ),
  (
    'Mindfulness & Calm',
    'Activities focused on emotional regulation and mindfulness practices.',
    9,
    '1:30 PM',
    45,
    8,
    4,
    35,
    'loc2',
    '6-8',
    ARRAY['Emotional Regulation', 'Focus', 'Self-awareness'],
    'https://images.pexels.com/photos/8613019/pexels-photo-8613019.jpeg'
  ),
  (
    'Music & Movement',
    'Rhythmic activities that combine music, movement, and sensory experiences.',
    10,
    '10:30 AM',
    60,
    10,
    7,
    35,
    'loc3',
    '3-5',
    ARRAY['Rhythm', 'Coordination', 'Listening'],
    'https://images.pexels.com/photos/8612977/pexels-photo-8612977.jpeg'
  ),
  (
    'Play & Learn Together',
    'Parent-child interactive session focusing on guided play techniques.',
    11,
    '4:00 PM',
    75,
    8,
    6,
    45,
    'loc1',
    '2-4',
    ARRAY['Parent-Child Bonding', 'Guided Play', 'Communication'],
    'https://images.pexels.com/photos/8612916/pexels-photo-8612916.jpeg'
  )
) AS t (
  title, description, interval_days, time, duration, capacity, enrolled, price,
  loc_ref, age_group, skills, image_url
);

-- Clean up temporary table
DROP TABLE temp_location_ids;