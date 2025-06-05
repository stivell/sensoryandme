import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertCircle, Clock } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <Scale className="h-8 w-8 text-secondary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing or using Sensory & ME's services, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of the terms, you may not access our services.
                </p>
                <p>
                  These terms apply to all users of our services, including without limitation:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parents and guardians booking classes</li>
                  <li>Children participating in our programs</li>
                  <li>Visitors to our website</li>
                  <li>Newsletter subscribers</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <FileCheck className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Booking and Payment Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold">Class Bookings</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All bookings are subject to availability</li>
                  <li>Payment is required at the time of booking</li>
                  <li>Age restrictions for specific classes must be strictly observed</li>
                  <li>Special needs must be disclosed during booking for appropriate accommodation</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">Cancellation Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full refund available for cancellations made 48+ hours before class</li>
                  <li>50% credit for cancellations made 24-48 hours before class</li>
                  <li>No refund for cancellations made less than 24 hours before class</li>
                  <li>Rescheduling is subject to availability</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <AlertCircle className="h-8 w-8 text-accent-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Health and Safety</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your child's safety is our top priority. By using our services, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate health and development information</li>
                  <li>Keep children home when sick</li>
                  <li>Follow all safety guidelines and instructions</li>
                  <li>Sign required waivers and consent forms</li>
                  <li>Maintain emergency contact information</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to refuse service if we believe participation poses a health or safety risk.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-success-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Additional Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold">Intellectual Property</h3>
                <p>
                  All content, materials, and methodologies used in our programs are proprietary and protected 
                  by intellectual property laws.
                </p>

                <h3 className="text-lg font-semibold mt-6">Limitation of Liability</h3>
                <p>
                  While we take every precaution to ensure safety, we cannot guarantee against all risks. 
                  By participating in our programs, you acknowledge and accept inherent risks.
                </p>

                <h3 className="text-lg font-semibold mt-6">Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting to our website.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mt-8">
                  <p className="font-medium">Contact Information</p>
                  <p>For questions about these terms, please contact us:</p>
                  <p>Email: legal@sensorymeplay.org</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Address: 12334 SilverSpring Place, Portland, OR 97201</p>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  Last updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfServicePage;