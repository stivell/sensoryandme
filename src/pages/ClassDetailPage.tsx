import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BookingForm from '../components/BookingForm';
import { Calendar, Clock, MapPin, Users, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Class, Location } from '../types';

const ClassDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedClass } = useAppContext();
  const [classItem, setClassItem] = useState<Class | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchClassDetails = async () => {
      try {
        if (!id) return;

        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', id)
          .single();

        if (classError || !classData) {
          console.error('Error fetching class:', classError);
          navigate('/404');
          return;
        }

        setClassItem(classData);
        setSelectedClass(classData);

        const { data: locationData, error: locationError } = await supabase
          .from('locations')
          .select('*')
          .eq('id', classData.location_id)
          .single();

        if (locationError || !locationData) {
          console.error('Error fetching location:', locationError);
          return;
        }

        setLocation(locationData);
      } catch (error) {
        console.error('Error:', error);
        navigate('/404');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassDetails();
    
    return () => {
      setSelectedClass(null);
    };
  }, [id, navigate, setSelectedClass]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }
  
  if (!classItem || !location) {
    return null;
  }
  
  // Format date
  const formattedDate = new Date(classItem.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate spots left
  const spotsLeft = classItem.capacity - classItem.enrolled;
  
  return (
    <>
      <section className="pt-28 pb-10 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {classItem.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-secondary-500" />
                <span>{formattedDate}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-secondary-500" />
                <span>{classItem.time} ({classItem.duration} min)</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-secondary-500" />
                <span>{location.name}</span>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-secondary-500" />
                <span className={spotsLeft <= 2 ? 'text-error-600 font-medium' : ''}>
                  {spotsLeft} spots left
                </span>
              </div>
            </div>
            
            <span className="inline-block bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-6">
              Ages {classItem.age_group}
            </span>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src={classItem.image_url} 
                    alt={classItem.title} 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Class</h2>
                  <p className="text-gray-700 mb-6">{classItem.description}</p>
                  <p className="text-gray-700">
                    Our structured play groups are designed to support your child's development 
                    through intentional play. Each session is carefully planned to build specific 
                    skills while keeping the activities fun and engaging.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills Development</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classItem.skills.map((skill, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-secondary-100 rounded-full p-1 mr-3 mt-0.5">
                          <CheckCheck className="h-4 w-4 text-secondary-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{skill}</h4>
                          <p className="text-gray-600 text-sm">
                            Activities designed to strengthen this developmental area
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
                  <div className="bg-white shadow-md rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      <p className="text-gray-600">
                        {location.address}, {location.city}, {location.state} {location.zip}
                      </p>
                    </div>
                    <div className="h-64 bg-gray-200">
                      {/* Map would go here in a real implementation */}
                      <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">Map preview would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="sticky top-24"
              >
                <BookingForm 
                  classId={classItem.id}
                  className={classItem.title}
                  classDate={classItem.date}
                  classTime={classItem.time}
                  price={Number(classItem.price)}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassDetailPage;