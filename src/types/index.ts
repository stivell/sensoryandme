export interface Class {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  price: number;
  locationId: string;
  ageGroup: string;
  skills: string[];
  imageUrl: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  classId: string;
  userId: string;
  childName: string;
  childAge: number;
  paymentStatus: 'pending' | 'completed';
  bookingDate: string;
  specialNeeds?: string;
}

export interface Newsletter {
  email: string;
  name?: string;
  subscribeDate: string;
}