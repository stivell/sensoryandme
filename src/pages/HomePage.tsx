import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ClassCard from '../components/ClassCard';

const HomePage: React.FC = () => {
  const { classes } = useAppContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get upcoming classes (next 3)
  const upcomingClasses = [...classes]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  return (
    <>
      <Hero />
      
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Play Groups</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book your spot in one of our carefully designed play sessions, led by experienced facilitators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {upcomingClasses.map((classItem, index) => (
              <ClassCard key={classItem.id} classItem={classItem} index={index} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/classes" className="btn-primary inline-flex items-center">
              View All Classes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      <FeatureSection />
      
      <section className="py-16 bg-gradient-to-br from-green-50 to-purple-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Our AI-Powered <span className="text-purple-600">Approach</span>
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6 text-lg"
              >
                <p>
                  At Learn by Sensory, we believe in the transformative power of purposeful play. 
                  Our AI-powered approach helps us design activities that are perfectly tailored 
                  to each child's developmental needs.
                </p>
                
                <p>
                  Unlike traditional free play, our structured sessions are facilitated with intention, 
                  focusing on building specific skills in a supportive, fun, and social environment.
                </p>
                
                <div className="pt-4">
                  <Link to="/about" className="btn-outline">
                    Learn More About Our Approach
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/8535239/pexels-photo-8535239.jpeg" 
                  alt="Children engaging in structured play" 
                  className="w-full h-auto"
                />
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs"
              >
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-medium text-gray-800">Classes optimized for maximum skill development</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      <section className="py-16 bg-purple-600">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Support Your Child's Development?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community of families who believe in the power of intentional play.
              Book your first session today or sign up for our newsletter to stay informed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/classes" className="btn bg-white text-purple-700 hover:bg-gray-100 focus:ring-white">
                Book a Session
              </Link>
              <a href="#newsletter" className="btn border-2 border-white text-white hover:bg-white/10 focus:ring-white">
                Join Our Newsletter
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;