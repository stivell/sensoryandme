import React from 'react';
import { Link } from 'react-router-dom';
import { Class } from '../types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClassCardProps {
  classItem: Class;
  index?: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, index = 0 }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate spots left
  const spotsLeft = classItem.capacity - classItem.enrolled;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card group h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img 
          src={classItem.image_url} 
          alt={classItem.title} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-purple-700 font-bold px-3 py-1 rounded-full text-sm">
          ${classItem.price}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
          <span className="inline-block bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded">
            Ages {classItem.age_group}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{classItem.title}</h3>
        
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            <span>{formatDate(classItem.date)}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span>{classItem.time} ({classItem.duration} min)</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-purple-500" />
            <span>Location {classItem.location_id.slice(0, 8)}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            <span className={spotsLeft <= 2 ? 'text-error-600 font-medium' : ''}>
              {spotsLeft} spots left
            </span>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {classItem.skills.slice(0, 3).map((skill, i) => (
              <span 
                key={i} 
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <Link 
            to={`/classes/${classItem.id}`} 
            className="block w-full text-center btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassCard;