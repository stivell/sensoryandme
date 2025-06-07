import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ClassCard from '../components/ClassCard';
import { MapPin, ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { locations, classes } = useAppContext();
  const [location, setLocation] = useState(null);
  const [locationClasses, setLocationClasses] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundLocation = locations.find(l => l.id === id);
    if (!foundLocation) {
      navigate('/locations');
      return;
    }
    
    setLocation(foundLocation);
    
    // Filter classes for this location
    const filteredClasses = classes.filter(c => c.location_id === id);
    setLocationClasses(filteredClasses);
  }, [id, locations, classes, navigate]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/locations')}
          className="flex items-center text-secondary-600 hover:text-secondary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Locations
        </motion.button>

        {/* Location Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="relative">
            <img 
              src={location.image_url} 
              alt={location.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{location.name}</h1>
                <div className="flex items-center text-white/90">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{location.address}, {location.city}, {location.state} {location.zip}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Location</h2>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Our {location.name} facility is designed with children's developmental needs in mind. 
                  The space features specialized areas for different types of sensory and motor activities, 
                  ensuring that every child can find their comfort zone while being gently challenged to grow.
                </p>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Facility Features</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Sensory-friendly lighting and acoustics</li>
                  <li>Adaptive equipment for children with special needs</li>
                  <li>Quiet spaces for regulation and calming</li>
                  <li>Open areas for movement and gross motor activities</li>
                  <li>Art and creativity stations</li>
                  <li>Parent observation areas</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Accessibility</h3>
                <p className="mb-4">
                  All our locations are fully accessible and designed to accommodate children 
                  with diverse needs. We have wheelchair accessibility, sensory-friendly 
                  environments, and trained staff to support all children.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Location Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Address</h4>
                  <p className="text-gray-600">
                    {location.address}<br />
                    {location.city}, {location.state} {location.zip}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Parking</h4>
                  <p className="text-gray-600">Free parking available on-site</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Public Transit</h4>
                  <p className="text-gray-600">Accessible by bus routes 15, 20, and 35</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Contact</h4>
                  <p className="text-gray-600">
                    <a href="tel:+15035551234" className="text-secondary-600 hover:text-secondary-700">
                      (503) 555-1234
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => navigate('/contact')}
                  className="btn-secondary w-full"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Classes at This Location */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-secondary-600" />
              Classes at This Location
            </h2>
            <span className="bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-medium">
              {locationClasses.length} Classes Available
            </span>
          </div>

          {locationClasses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Classes Currently Scheduled
              </h3>
              <p className="text-gray-500 mb-6">
                We're working on scheduling new classes at this location. Check back soon or contact us for updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/classes')}
                  className="btn-secondary"
                >
                  View All Classes
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="btn-outline"
                >
                  Contact Us
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationClasses.map((classItem, index) => (
                <ClassCard 
                  key={classItem.id} 
                  classItem={classItem} 
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default LocationDetailPage;