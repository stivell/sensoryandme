import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Lightbulb, Shield } from 'lucide-react';

const features = [
  {
    icon: <Heart className="h-8 w-8 text-purple-500" />,
    title: 'Inclusive & Supportive',
    description: 'Welcoming environment where every child feels valued, supported, and encouraged to participate at their own pace.',
    delay: 0.1
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-green-500" />,
    title: 'Skill-Focused Activities',
    description: 'Each activity is purposefully designed to build specific developmental skills while keeping the fun factor high.',
    delay: 0.2
  },
  {
    icon: <Users className="h-8 w-8 text-purple-600" />,
    title: 'Small Group Sizes',
    description: 'Limited group sizes ensure personalized attention and create the optimal environment for social learning.',
    delay: 0.3
  },
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: 'Trained Facilitators',
    description: 'Expert facilitators with specialized training in child development and special needs support.',
    delay: 0.4
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Learn by Sensory?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our approach to structured play is backed by research and designed with your child's development in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;