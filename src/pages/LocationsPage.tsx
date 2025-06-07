import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import LocationCard from '../components/LocationCard';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LocationsPage: React.FC = () => {
  const { locations } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-purple-600">Locations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find a Learn by Sensory location near you. Each facility is specially designed 
            to provide a safe, supportive environment for children's development.
          </p>
        </motion.div>

        {/* Locations Grid */}
        {locations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No locations found
            </h3>
            <p className="text-gray-500">
              We're working on adding new locations. Check back soon!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Available Locations ({locations.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <LocationCard 
                  key={location.id} 
                  location={location} 
                  index={index}
                />
              ))}
            </div>
          </>
        )}

        {/* Additional Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-50 to-green-50 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't Find a Location Near You?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're always looking to expand and bring our programs to more communities. 
              Let us know where you'd like to see a Learn by Sensory location.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Request a Location</h3>
              <p className="text-gray-600 text-sm">
                Tell us about your community and we'll consider it for future expansion.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Partner With Us</h3>
              <p className="text-gray-600 text-sm">
                Interested in bringing our programs to your facility? Let's talk partnership.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">
                Subscribe to our newsletter for updates on new locations and programs.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a href="/contact" className="btn-primary mr-4">
              Contact Us
            </a>
            <a href="/" className="btn-outline">
              Learn More
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default LocationsPage;