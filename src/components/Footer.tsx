import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-bold text-secondary-700 mb-4">Learn by Sensory</h3>
            <p className="mb-6 text-gray-600 max-w-md">
              Supporting child development through intentional play. Our AI-Powered Structured 
              Play Groups offer a unique approach to building essential skills in a supportive, 
              fun, and social environment.
            </p>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.instagram.com/jyssekasensoryme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-secondary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="mailto:info@learnbysensory.com" 
                className="text-gray-600 hover:text-secondary-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-secondary-600 transition-colors">Home</Link>
              <Link to="/classes" className="text-gray-600 hover:text-secondary-600 transition-colors">Classes</Link>
              <Link to="/locations" className="text-gray-600 hover:text-secondary-600 transition-colors">Locations</Link>
              <Link to="/about" className="text-gray-600 hover:text-secondary-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-secondary-600 transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-4">Stay updated with our latest classes and events</p>
            <NewsletterSignup />
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Learn by Sensory. All rights reserved.
            </div>
            <div className="flex space-x-4 text-gray-500 text-sm">
              <Link to="/privacy" className="hover:text-secondary-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-secondary-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;