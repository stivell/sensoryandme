import React from 'react';
import { Link } from 'react-router-dom';
import { Location } from '../types';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationCardProps {
  location: Location;
  index?: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card group"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={location.imageUrl} 
          alt={location.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4">
          <h3 className="font-bold text-white text-xl">{location.name}</h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start mb-4">
          <MapPin className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" />
          <div className="ml-2">
            <p className="text-gray-700">{location.address}</p>
            <p className="text-gray-700">{location.city}, {location.state} {location.zip}</p>
          </div>
        </div>
        
        <Link 
          to={`/locations/${location.id}`} 
          className="block w-full text-center btn-secondary"
        >
          View Classes
        </Link>
      </div>
    </motion.div>
  );
};

export default LocationCard;