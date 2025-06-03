import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import LocationCard from '../components/LocationCard';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const LocationsPage: React.FC = () => {
  const { locations } = useAppContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <section className="pt-28 pb-10 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-secondary-600">Locations</span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover our purpose-built spaces where children can learn, grow, and thrive through play.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
              <MapPin className="mr-2 h-6 w-6 text-secondary-500" />
              Find a Location Near You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Each Sensory & ME location is designed with children in mind, featuring sensory-friendly 
              environments and specialized equipment to support our structured play activities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <LocationCard key={location.id} location={location} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationsPage;