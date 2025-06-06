import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Learn by Sensory has been transformative for my son. The structured play approach has helped him develop social skills in a way that feels natural and fun for him.",
    author: "Sarah M.",
    relation: "Parent of a 6-year-old with ASD",
    stars: 5
  },
  {
    id: 2,
    content: "As a parent of a child with sensory processing challenges, finding the right program was tough. These play groups are perfect - engaging but not overwhelming.",
    author: "Michael T.",
    relation: "Parent of a 4-year-old",
    stars: 5
  },
  {
    id: 3,
    content: "The facilitators are incredible! They truly understand how to connect with children and create meaningful learning experiences through play.",
    author: "Jennifer K.",
    relation: "Parent of twins, age 5",
    stars: 5
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Parents Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from families who have experienced the impact of our structured play groups.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md relative"
            >
              {/* Quote mark decoration */}
              <div className="absolute -top-4 -left-4 text-5xl text-secondary-200 opacity-50">"</div>
              
              {/* Star rating */}
              <div className="flex mb-4">
                {Array(testimonial.stars).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning-400 fill-warning-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10">{testimonial.content}</p>
              
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;