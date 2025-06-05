/*
  # Insert mock data

  1. Data Population
    - Locations data for all centers
    - Classes data with relationships to locations
    - Sample newsletter subscriptions

  2. Changes
    - Populates initial data for the application
    - Sets up test data for development
*/

-- Insert locations
INSERT INTO locations (id, name, address, city, state, zip, image_url) VALUES
  ('loc1', 'Sensory Center Downtown', '12334 SilverSpring Place', 'Portland', 'OR', '97201', 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg'),
  ('loc2', 'Eastside Play Studio', '456 Oak Avenue', 'Portland', 'OR', '97215', 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg'),
  ('loc3', 'West Hills Center', '789 Pine Boulevard', 'Portland', 'OR', '97221', 'https://images.pexels.com/photos/8613335/pexels-photo-8613335.jpeg');

-- Insert classes
INSERT INTO classes (
  id, title, description, date, time, duration, capacity, enrolled, price,
  location_id, age_group, skills, image_url
) VALUES
  (
    'class1',
    'Sensory Exploration',
    'A play group focused on sensory exploration and regulation through tactile experiences.',
    (CURRENT_DATE + INTERVAL '2 days')::date,
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
    'class2',
    'Social Skills Play',
    'Interactive play designed to develop social skills through collaborative activities.',
    (CURRENT_DATE + INTERVAL '3 days')::date,
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
    'class3',
    'Creative Movement',
    'Movement-based play that encourages body awareness and coordination.',
    (CURRENT_DATE + INTERVAL '4 days')::date,
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
    'class4',
    'Language & Literacy Play',
    'Fun activities focused on language development through stories and interactive play.',
    (CURRENT_DATE + INTERVAL '5 days')::date,
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
    'class5',
    'STEM Explorers',
    'Hands-on science and math activities designed for young learners.',
    (CURRENT_DATE + INTERVAL '6 days')::date,
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
    'class6',
    'Art & Expression',
    'Creative art experiences that foster self-expression and fine motor development.',
    (CURRENT_DATE + INTERVAL '7 days')::date,
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
    'class7',
    'Early Learners Play',
    'Gentle introduction to structured play for our youngest participants.',
    (CURRENT_DATE + INTERVAL '8 days')::date,
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
    'class8',
    'Mindfulness & Calm',
    'Activities focused on emotional regulation and mindfulness practices.',
    (CURRENT_DATE + INTERVAL '9 days')::date,
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
    'class9',
    'Music & Movement',
    'Rhythmic activities that combine music, movement, and sensory experiences.',
    (CURRENT_DATE + INTERVAL '10 days')::date,
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
    'class10',
    'Play & Learn Together',
    'Parent-child interactive session focusing on guided play techniques.',
    (CURRENT_DATE + INTERVAL '11 days')::date,
    '4:00 PM',
    75,
    8,
    6,
    45,
    'loc1',
    '2-4',
    ARRAY['Parent-Child Bonding', 'Guided Play', 'Communication'],
    'https://images.pexels.com/photos/8612916/pexels-photo-8612916.jpeg'
  );