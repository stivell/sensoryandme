import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ClassCard from '../components/ClassCard';
import ClassFilter from '../components/ClassFilter';
import Calendar from '../components/Calendar';
import { motion } from 'framer-motion';

const ClassesPage: React.FC = () => {
  const { filteredClasses } = useAppContext();
  
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
              Find the Perfect <span className="text-secondary-600">Play Group</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse our upcoming sessions and find the perfect match for your child's needs and interests.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ClassFilter />
                
                <div className="mt-8 hidden lg:block">
                  <Calendar />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Classes
                </h2>
                <span className="text-gray-600">
                  {filteredClasses.length} classes found
                </span>
              </div>
              
              {filteredClasses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClasses.map((classItem, index) => (
                    <ClassCard key={classItem.id} classItem={classItem} index={index} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Classes Found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to see more results, or check back later for new classes.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="btn-secondary"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassesPage;