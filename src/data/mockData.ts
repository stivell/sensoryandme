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
    address: '123 Main Street',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    imageUrl: 'https://images.pexels.com/photos/3933021/pexels-photo-3933021.jpeg'
  },
  {
    id: 'loc2',
    name: 'Eastside Play Studio',
    address: '456 Oak Avenue',
    city: 'Portland',
    state: 'OR',
    zip: '97215',
    imageUrl: 'https://images.pexels.com/photos/3933022/pexels-photo-3933022.jpeg'
  },
  {
    id: 'loc3',
    name: 'West Hills Center',
    address: '789 Pine Boulevard',
    city: 'Portland',
    state: 'OR',
    zip: '97221',
    imageUrl: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/4473870/pexels-photo-4473870.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/8612921/pexels-photo-8612921.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/256468/pexels-photo-256468.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/8535226/pexels-photo-8535226.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/8535239/pexels-photo-8535239.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/3662844/pexels-photo-3662844.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/7346634/pexels-photo-7346634.jpeg'
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
    imageUrl: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg'
  }
];