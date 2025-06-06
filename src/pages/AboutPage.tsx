import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Lightbulb, Brain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
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
              About <span className="text-secondary-600">Learn by Sensory</span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover our story, our mission, and how we're transforming child development 
              through AI-powered structured play.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Learn by Sensory was founded by Jysseka Campbell-George, a Certified Occupational Therapy 
                  Assistant (COTA-L) with a passion for helping children develop through play.
                </p>
                <p>
                  After years of working with children with diverse needs, Jysseka recognized that 
                  structured, intentional play could make a significant difference in developmental 
                  outcomes, especially for children with Autism Spectrum Disorder (ASD).
                </p>
                <p>
                  What began as a small initiative to provide specialized play opportunities has grown 
                  into a comprehensive program that leverages AI insights to create truly personalized 
                  development experiences through play.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/8535239/pexels-photo-8535239.jpeg" 
                alt="Children engaged in structured play" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
              <p className="text-xl text-gray-600">
                At Learn by Sensory, we're committed to supporting every child's development journey 
                through the power of purposeful play in a supportive community.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart className="h-12 w-12 text-secondary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Inclusive & Supportive</h3>
                <p className="text-gray-600">
                  We create welcoming environments where every child feels valued and supported, 
                  regardless of their abilities or learning style. Our approach celebrates 
                  neurodiversity and embraces individual differences.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Lightbulb className="h-12 w-12 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Skill-Focused Activities</h3>
                <p className="text-gray-600">
                  Every activity is purposefully designed to build specific developmental skills. 
                  We believe in making learning fun and engaging, ensuring children are developing 
                  crucial abilities while simply enjoying play.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Users className="h-12 w-12 text-accent-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Small Group Sizes</h3>
                <p className="text-gray-600">
                  We maintain small group sizes to ensure each child receives the attention and 
                  support they need. This creates an optimal environment for social learning and 
                  allows our facilitators to adapt to individual needs.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Brain className="h-12 w-12 text-success-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Informed Approach</h3>
                <p className="text-gray-600">
                  We leverage artificial intelligence to analyze developmental patterns and optimize 
                  our activities. This technology helps us tailor experiences that are developmentally 
                  appropriate and effective for each child's unique needs.
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-xl text-gray-600">
                We believe in the power of structured play to support child development, especially
                for children with unique learning needs.
              </p>
            </motion.div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Why Structured Play?
                  </h3>
                  
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Unlike traditional free play, our structured play approach is designed with 
                      specific developmental goals in mind. Each session is carefully crafted to 
                      build skills in areas such as:
                    </p>
                    
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Social interaction and communication</li>
                      <li>Fine and gross motor development</li>
                      <li>Sensory processing and integration</li>
                      <li>Emotional regulation and self-awareness</li>
                      <li>Cognitive skills and problem-solving</li>
                    </ul>
                    
                    <p>
                      By combining the joy of play with intentional learning opportunities, we create
                      an environment where children can thrive and develop essential life skills.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <img 
                    src="https://images.pexels.com/photos/8535226/pexels-photo-8535226.jpeg" 
                    alt="Children in a structured play session" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Experience the difference our structured play approach can make for your child's development.
            </p>
            <Link to="/classes" className="btn-primary inline-flex items-center">
              Browse Our Classes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;