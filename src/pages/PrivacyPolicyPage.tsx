import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-secondary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact information</li>
                  <li>Child's name, age, and any special needs information</li>
                  <li>Payment information</li>
                  <li>Communication preferences</li>
                  <li>Feedback and correspondence</li>
                </ul>
                <p>
                  We also automatically collect certain information when you use our website, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device and browser information</li>
                  <li>Usage data and preferences</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Process your bookings and payments</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you important updates and announcements</li>
                  <li>Personalize your experience</li>
                  <li>Ensure the safety and security of our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-accent-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We do not sell or rent your personal information to third parties. We may share your
                  information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who assist in operating our website and services</li>
                  <li>Legal authorities when required by law</li>
                  <li>Professional advisors such as lawyers and accountants</li>
                </ul>
                <p>
                  All third parties are contractually obligated to protect your information and may only
                  use it for specified purposes.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-success-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
                <p className="mt-6">
                  To exercise any of these rights or if you have questions about our privacy practices,
                  please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="font-medium">Learn by Sensory</p>
                  <p>Email: info@learnbysensory.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Address: 12334 SilverSpring Place, Portland, OR 97201</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;