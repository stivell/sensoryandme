import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Lightbulb, Shield, Award, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-purple-600">Learn by Sensory</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe every child deserves the opportunity to learn, grow, and thrive through 
            purposeful play. Our AI-powered structured play groups create inclusive environments 
            where children develop essential skills while having fun.
          </p>
        </motion.div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                At Learn by Sensory, we're dedicated to supporting child development through 
                intentional, structured play experiences. Our approach combines research-backed 
                methodologies with innovative AI technology to create personalized learning 
                environments for every child.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We understand that every child is unique, with their own strengths, challenges, 
                and learning style. That's why our programs are designed to be inclusive, 
                adaptive, and supportive of all children, including those with special needs 
                and developmental differences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img 
                src="https://images.pexels.com/photos/8613261/pexels-photo-8613261.jpeg" 
                alt="Children engaged in structured play"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for children and families.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8 text-purple-500" />,
                title: "Inclusive & Welcoming",
                description: "Every child is valued and supported, regardless of their abilities or challenges."
              },
              {
                icon: <Users className="h-8 w-8 text-green-500" />,
                title: "Community Focused",
                description: "Building connections between children, families, and our broader community."
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-purple-600" />,
                title: "Evidence-Based",
                description: "Our methods are grounded in research and proven developmental practices."
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: "Safe & Supportive",
                description: "Creating environments where children feel secure to explore and learn."
              },
              {
                icon: <Award className="h-8 w-8 text-purple-500" />,
                title: "Excellence",
                description: "Committed to the highest standards in child development and family support."
              },
              {
                icon: <Clock className="h-8 w-8 text-green-500" />,
                title: "Responsive",
                description: "Adapting our approach to meet each child's individual needs and pace."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Approach Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/8612967/pexels-photo-8612967.jpeg" 
                alt="AI-powered learning environment"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Structured Play</h4>
                    <p className="text-gray-600">Carefully designed activities that balance fun with skill development.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">AI-Powered Personalization</h4>
                    <p className="text-gray-600">Technology that adapts to each child's unique learning style and pace.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Small Group Settings</h4>
                    <p className="text-gray-600">Intimate environments that foster connection and individual attention.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Expert Facilitation</h4>
                    <p className="text-gray-600">Trained professionals who understand child development and special needs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn by Sensory was founded with a passion for supporting every child's unique journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg" 
                  alt="Founder"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jysseka Campbell-George</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  With over a decade of experience in child development and special education, 
                  Jysseka founded Learn by Sensory to bridge the gap between traditional therapy 
                  and everyday play experiences.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Her vision combines cutting-edge AI technology with time-tested developmental 
                  approaches to create programs that truly meet children where they are and help 
                  them grow at their own pace.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Child Development Specialist
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Special Education Expert
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    AI Innovation Leader
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-green-50 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Support Your Child's Development?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of families who are discovering the power of structured play 
            for their children's growth and development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/classes" className="btn-primary">
              Explore Our Classes
            </a>
            <a href="/contact" className="btn-outline">
              Get in Touch
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;