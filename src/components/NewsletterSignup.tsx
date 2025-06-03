import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const NewsletterSignup: React.FC = () => {
  const { newsletterEmail, setNewsletterEmail, isNewsletterSubscribed, setIsNewsletterSubscribed } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Subscribed email: ${newsletterEmail}`);
      // This would normally send a notification to admins
      console.log('Admin notification: New newsletter signup');
      
      setIsNewsletterSubscribed(true);
      setIsSubmitting(false);
    }, 1000);
  };
  
  if (isNewsletterSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-success-50 text-success-700 p-4 rounded-lg"
      >
        <p className="font-medium">Thank you for subscribing!</p>
        <p className="text-sm">We've sent a confirmation to your email.</p>
      </motion.div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <input 
          type="email" 
          placeholder="Your email address" 
          value={newsletterEmail} 
          onChange={(e) => setNewsletterEmail(e.target.value)}
          className="input pr-24"
          required
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="absolute right-1 top-1 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
        >
          {isSubmitting ? 'Joining...' : 'Join'}
        </button>
      </div>
    </form>
  );
};

export default NewsletterSignup;