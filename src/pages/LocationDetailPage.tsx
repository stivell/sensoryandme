import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ClassCard from '../components/ClassCard';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { locations, classes } = useAppContext();
  
  const location = locations.find(l => l.id === id);
  const locationClasses = classes.filter(c => c.location_id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!location) {
      navigate('/404');
    }
  }, [location, navigate]);
  
  if (!location) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <>
      <section className="pt-28 pb-10 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          <Link to="/locations" className="inline-flex items-center text-secondary-600 hover:text-secondary-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all locations
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {location.name}
            </h1>
            <p className="text-xl text-gray-600 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-secondary-500" />
              {location.address}, {location.city}, {location.state} {location.zip}
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="mb-8">
                <div className="rounded-xl overflow-hidden shadow-md mb-6">
                  <img 
                    src={location.image_url} 
                    alt={location.name} 
                    className="w-full h-auto"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Location</h2>
                <p className="text-gray-700 mb-4">
                  Our {location.name} center is a purpose-built space designed to support children's 
                  learning and development through play. The environment is carefully crafted to be 
                  sensory-friendly while providing all the equipment needed for our structured play activities.
                </p>
                <p className="text-gray-700">
                  This location features open play areas, quiet zones for children who need a sensory 
                  break, and specialized equipment to support various developmental activities.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Classes at This Location</h2>
                
                {locationClasses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {locationClasses.map((classItem, index) => (
                      <ClassCard key={classItem.id} classItem={classItem} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Classes Scheduled</h3>
                    <p className="text-gray-600 mb-4">
                      There are currently no upcoming classes scheduled for this location.
                      Check back soon or view classes at our other locations.
                    </p>
                    <Link to="/classes" className="btn-secondary">
                      View All Classes
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Location Information</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-700">Address:</h4>
                      <p className="text-gray-600">
                        {location.address}
                        <br />
                        {location.city}, {location.state} {location.zip}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Contact:</h4>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Phone className="h-4 w-4 mr-2 text-secondary-500" />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-secondary-500" />
                        <span>info@learnbysensory.com</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700">Hours:</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 2:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/classes" className="btn-primary w-full text-center">
                    View All Classes
                  </Link>
                </div>
                
                <div className="h-64 bg-gray-200">
                  {/* Map would go here in a real implementation */}
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Map preview would be displayed here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationDetailPage;