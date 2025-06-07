import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, MapPin, Heart, ArrowRight } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Classes', path: '/classes' },
    { name: 'Locations', path: '/locations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main footer content */}
        <div className="container-custom pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                    Learn by Sensory
                  </h3>
                  <p className="text-gray-400 text-sm">Purposeful Play for Every Child</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Supporting child development through intentional play. Our AI-Powered Structured 
                Play Groups offer a unique approach to building essential skills in a supportive, 
                fun, and social environment.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/jyssekasensoryme" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl hover:shadow-lg transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:info@learnbysensory.com" 
                  className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl hover:shadow-lg transition-all duration-300 group"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+15035551234" 
                  className="bg-gradient-to-br from-green-500 to-blue-600 p-3 rounded-xl hover:shadow-lg transition-all duration-300 group"
                  aria-label="Phone"
                >
                  <Phone className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-6 text-white flex items-center">
                <ArrowRight className="h-4 w-4 mr-2 text-purple-400" />
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-3">
                {footerLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block group"
                    >
                      <span className="border-b border-transparent group-hover:border-purple-400 transition-all duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
            
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-6 text-white flex items-center">
                <Mail className="h-4 w-4 mr-2 text-green-400" />
                Stay Connected
              </h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Get updates on new classes, events, and child development tips delivered to your inbox.
              </p>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <NewsletterSignup />
              </div>
            </motion.div>
          </div>
          
          {/* Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Visit Us</p>
                  <p className="text-gray-300 text-sm">12334 SilverSpring Place, Portland, OR</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-gray-300 text-sm">(503) 555-1234</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-gray-300 text-sm">info@learnbysensory.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-400 text-sm flex items-center"
              >
                <Heart className="h-4 w-4 mr-2 text-red-400" />
                &copy; {currentYear} Learn by Sensory. Made with love for every child.
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex space-x-6 text-gray-400 text-sm"
              >
                {legalLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={link.path} 
                      className="hover:text-white transition-colors duration-300 border-b border-transparent hover:border-purple-400"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;