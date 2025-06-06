import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Mail, Settings } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<any>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const testEmailSetup = async () => {
    setIsTestingEmail(true);
    setEmailTestResult(null);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/test-email`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
        }
      );

      const result = await response.json();
      setEmailTestResult(result);
    } catch (err) {
      setEmailTestResult({
        error: 'Failed to test email setup',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsTestingEmail(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      let errorMessage = 'Failed to send message';
      
      if (err instanceof Error) {
        if (err.message.includes('Email service is not configured')) {
          errorMessage = 'Email service is not configured properly. Please contact support.';
        } else if (err.message.includes('Missing required fields')) {
          errorMessage = 'Please fill out all required fields.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      {/* Email Test Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Email System Test
          </h3>
          <button
            onClick={testEmailSetup}
            disabled={isTestingEmail}
            className="btn-outline text-sm px-3 py-1"
          >
            {isTestingEmail ? 'Testing...' : 'Test Email Setup'}
          </button>
        </div>
        
        {emailTestResult && (
          <div className="mt-3 p-3 bg-white rounded border text-sm">
            {emailTestResult.error ? (
              <div className="text-error-600">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="font-medium">Test Failed</span>
                </div>
                <p>{emailTestResult.error}</p>
                {emailTestResult.details && (
                  <p className="text-xs mt-1 text-gray-500">{emailTestResult.details}</p>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-4 w-4 mr-2 text-success-600" />
                  <span className="font-medium">Email System Status</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Environment Variables:</span>
                    <span className={emailTestResult.tests?.environmentVariables === 'PASS' ? 'text-success-600' : 'text-error-600'}>
                      {emailTestResult.tests?.environmentVariables || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SendGrid Connection:</span>
                    <span className={emailTestResult.tests?.sendGridConnection === 'PASS' ? 'text-success-600' : 'text-error-600'}>
                      {emailTestResult.tests?.sendGridConnection || 'Unknown'}
                    </span>
                  </div>
                </div>
                {emailTestResult.timestamp && (
                  <p className="text-xs text-gray-500 mt-2">
                    Tested at: {new Date(emailTestResult.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-success-50 border border-success-200 text-success-800 rounded-lg p-4"
        >
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-800 p-3 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Error sending message</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select a subject</option>
              <option value="Class Information">Class Information</option>
              <option value="Booking Question">Booking Question</option>
              <option value="Special Accommodations">Special Accommodations</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="input"
              placeholder="Please describe your question or concern in detail..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;