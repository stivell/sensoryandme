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
  location_id: string;
  age_group: string;
  skills: string[];
  image_url: string;
  created_at?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image_url: string;
  created_at?: string;
}

export interface Booking {
  id: string;
  class_id: string;
  user_id: string;
  child_name: string;
  child_age: number;
  payment_status: 'pending' | 'completed';
  created_at: string;
  special_needs?: string;
}

export interface Newsletter {
  email: string;
  name?: string;
  created_at: string;
}