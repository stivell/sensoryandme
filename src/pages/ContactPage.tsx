import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
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
              Get in <span className="text-secondary-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600">
              We're here to answer your questions and help you find the perfect play group for your child.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-8 mb-8">
                <div className="flex">
                  <div className="bg-secondary-100 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-700">info@learnbysensory.com</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We aim to respond to all inquiries within 24 hours.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-gray-700">(555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Available Monday-Friday, 9am-5pm PT
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-accent-100 rounded-full p-3 mr-4">
                    <Instagram className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Social Media</h3>
                    <p className="text-gray-700">Instagram: @jyssekasensoryme</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Follow us for updates, activity ideas, and more.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 rounded-full overflow-hidden w-16 h-16 bg-secondary-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-secondary-600">JC</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Jysseka Campbell-George</h3>
                      <p className="text-gray-600">Founder, COTA-L</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Jysseka is a Certified Occupational Therapy Assistant (COTA-L) with extensive 
                    experience supporting children with diverse needs. She founded Learn by Sensory to 
                    create structured play opportunities that foster development in a fun, supportive 
                    environment.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to commonly asked questions about our structured play groups.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">What age groups do you serve?</h3>
              <p className="text-gray-600">
                Our structured play groups are designed for children ages 2-8, with specific 
                groups tailored to narrower age ranges to ensure developmentally appropriate activities.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">How large are your play groups?</h3>
              <p className="text-gray-600">
                We keep our groups small—typically 6-8 children per session—to ensure each child 
                receives personalized attention and has plenty of opportunities for interaction.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">How do you accommodate special needs?</h3>
              <p className="text-gray-600">
                Our facilitators are trained to work with children with diverse needs, including 
                those with ASD, sensory processing differences, and other developmental considerations. 
                We encourage parents to share specific needs during registration so we can provide 
                appropriate support.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">What is your cancellation policy?</h3>
              <p className="text-gray-600">
                We understand that plans change. Cancellations made at least 48 hours before the 
                scheduled session are eligible for a full refund or credit toward a future session. 
                For cancellations within 48 hours, we offer a 50% credit that can be applied to a future booking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;