import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ClassCard from '../components/ClassCard';
import ClassFilter from '../components/ClassFilter';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const ClassesPage: React.FC = () => {
  const { filteredClasses } = useAppContext();

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
            Our <span className="text-purple-600">Classes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of structured play sessions designed to support your child's 
            development in a fun, inclusive environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ClassFilter />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {filteredClasses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No classes found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more classes.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Available Classes ({filteredClasses.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredClasses.map((classItem, index) => (
                    <ClassCard 
                      key={classItem.id} 
                      classItem={classItem} 
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;