import { Class, Location } from '../types';
import { format, addDays } from 'date-fns';

// Generate dates for the next 30 days
const generateDates = (numDays: number) => {
  return Array.from({ length: numDays }, (_, i) => 
    format(addDays(new Date(), i + 1), 'yyyy-MM-dd')
  );
};

const nextDates = generateDates(30);

export const mockLocations: Location[] = [
  {
    id: 'loc1',
    name: 'Sensory Center Downtown',
    address: '12334 SilverSpring Place',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    imageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg'
  },
  {
    id: 'loc2',
    name: 'Eastside Play Studio',
    address: '456 Oak Avenue',
    city: 'Portland',
    state: 'OR',
    zip: '97215',
    imageUrl: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg'
  },
  {
    id: 'loc3',
    name: 'West Hills Center',
    address: '789 Pine Boulevard',
    city: 'Portland',
    state: 'OR',
    zip: '97221',
    imageUrl: 'https://images.pexels.com/photos/8613335/pexels-photo-8613335.jpeg'
  }
];

export const mockClasses: Class[] = [
  {
    id: 'class1',
    title: 'Sensory Exploration',
    description: 'A play group focused on sensory exploration and regulation through tactile experiences.',
    date: nextDates[2],
    time: '10:00 AM',
    duration: 60,
    capacity: 8,
    enrolled: 5,
    price: 35,
    locationId: 'loc1',
    ageGroup: '3-5',
    skills: ['Sensory Processing', 'Fine Motor', 'Social Interaction'],
    imageUrl: 'https://images.pexels.com/photos/8535925/pexels-photo-8535925.jpeg'
  },
  {
    id: 'class2',
    title: 'Social Skills Play',
    description: 'Interactive play designed to develop social skills through collaborative activities.',
    date: nextDates[3],
    time: '1:00 PM',
    duration: 60,
    capacity: 8,
    enrolled: 3,
    price: 35,
    locationId: 'loc2',
    ageGroup: '6-8',
    skills: ['Social Skills', 'Communication', 'Emotional Regulation'],
    imageUrl: 'https://images.pexels.com/photos/8613165/pexels-photo-8613165.jpeg'
  },
  {
    id: 'class3',
    title: 'Creative Movement',
    description: 'Movement-based play that encourages body awareness and coordination.',
    date: nextDates[4],
    time: '11:00 AM',
    duration: 45,
    capacity: 10,
    enrolled: 6,
    price: 30,
    locationId: 'loc3',
    ageGroup: '3-5',
    skills: ['Gross Motor', 'Coordination', 'Body Awareness'],
    imageUrl: 'https://images.pexels.com/photos/8612967/pexels-photo-8612967.jpeg'
  },
  {
    id: 'class4',
    title: 'Language & Literacy Play',
    description: 'Fun activities focused on language development through stories and interactive play.',
    date: nextDates[5],
    time: '9:30 AM',
    duration: 60,
    capacity: 8,
    enrolled: 4,
    price: 35,
    locationId: 'loc1',
    ageGroup: '4-6',
    skills: ['Language', 'Listening', 'Pre-literacy'],
    imageUrl: 'https://images.pexels.com/photos/8613261/pexels-photo-8613261.jpeg'
  },
  {
    id: 'class5',
    title: 'STEM Explorers',
    description: 'Hands-on science and math activities designed for young learners.',
    date: nextDates[6],
    time: '2:00 PM',
    duration: 60,
    capacity: 8,
    enrolled: 7,
    price: 40,
    locationId: 'loc2',
    ageGroup: '6-8',
    skills: ['Problem Solving', 'Critical Thinking', 'Curiosity'],
    imageUrl: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg'
  },
  {
    id: 'class6',
    title: 'Art & Expression',
    description: 'Creative art experiences that foster self-expression and fine motor development.',
    date: nextDates[7],
    time: '11:00 AM',
    duration: 60,
    capacity: 10,
    enrolled: 5,
    price: 35,
    locationId: 'loc3',
    ageGroup: '4-6',
    skills: ['Fine Motor', 'Creativity', 'Self-expression'],
    imageUrl: 'https://images.pexels.com/photos/8613335/pexels-photo-8613335.jpeg'
  },
  {
    id: 'class7',
    title: 'Early Learners Play',
    description: 'Gentle introduction to structured play for our youngest participants.',
    date: nextDates[8],
    time: '9:00 AM',
    duration: 45,
    capacity: 6,
    enrolled: 3,
    price: 30,
    locationId: 'loc1',
    ageGroup: '2-3',
    skills: ['Motor Skills', 'Language', 'Social Awareness'],
    imageUrl: 'https://images.pexels.com/photos/8612906/pexels-photo-8612906.jpeg'
  },
  {
    id: 'class8',
    title: 'Mindfulness & Calm',
    description: 'Activities focused on emotional regulation and mindfulness practices.',
    date: nextDates[9],
    time: '1:30 PM',
    duration: 45,
    capacity: 8,
    enrolled: 4,
    price: 35,
    locationId: 'loc2',
    ageGroup: '6-8',
    skills: ['Emotional Regulation', 'Focus', 'Self-awareness'],
    imageUrl: 'https://images.pexels.com/photos/8613019/pexels-photo-8613019.jpeg'
  },
  {
    id: 'class9',
    title: 'Music & Movement',
    description: 'Rhythmic activities that combine music, movement, and sensory experiences.',
    date: nextDates[10],
    time: '10:30 AM',
    duration: 60,
    capacity: 10,
    enrolled: 7,
    price: 35,
    locationId: 'loc3',
    ageGroup: '3-5',
    skills: ['Rhythm', 'Coordination', 'Listening'],
    imageUrl: 'https://images.pexels.com/photos/8612977/pexels-photo-8612977.jpeg'
  },
  {
    id: 'class10',
    title: 'Play & Learn Together',
    description: 'Parent-child interactive session focusing on guided play techniques.',
    date: nextDates[11],
    time: '4:00 PM',
    duration: 75,
    capacity: 8,
    enrolled: 6,
    price: 45,
    locationId: 'loc1',
    ageGroup: '2-4',
    skills: ['Parent-Child Bonding', 'Guided Play', 'Communication'],
    imageUrl: 'https://images.pexels.com/photos/8612916/pexels-photo-8612916.jpeg'
  }
];