import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import Calendar from '../components/Calendar';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { classes } = useAppContext();
  
  // Get next 3 upcoming classes
  const upcomingClasses = classes
    .filter(c => new Date(c.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <Hero />
      <FeatureSection />
      
      {/* Upcoming Classes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Classes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for these exciting upcoming sessions designed to support your child's development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {upcomingClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img 
                  src={classItem.image_url} 
                  alt={classItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{classItem.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{new Date(classItem.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-500" />
                      <span>Ages {classItem.age_group}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/classes/${classItem.id}`}
                    className="btn-primary w-full text-center block"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/classes" className="btn-secondary inline-flex items-center">
              View All Classes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Calendar />
            </div>
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 text-purple-800">
                  Why Choose Our Classes?
                </h3>
                <ul className="space-y-3 text-purple-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Small group sizes for personalized attention</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>AI-optimized activities for skill development</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Trained facilitators with special needs expertise</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Inclusive environment for all children</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4 text-green-800">
                  Ready to Get Started?
                </h3>
                <p className="text-green-700 mb-4">
                  Book your first session today and see the difference structured play can make.
                </p>
                <Link to="/classes" className="btn-accent w-full text-center block">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
    </div>
  );
};

export default HomePage;