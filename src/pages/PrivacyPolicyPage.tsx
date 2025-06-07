import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Your privacy and your child's privacy are important to us
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: December 2024
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="prose max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Data Protection</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Transparency</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Security</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Your Rights</h3>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  When you register for our services, we collect:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>Parent/guardian contact information (name, email, phone number)</li>
                  <li>Child's information (name, age, special needs or accommodations)</li>
                  <li>Billing and payment information</li>
                  <li>Emergency contact details</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                <p className="text-gray-700 mb-6">
                  We automatically collect certain information when you use our website and services, including:
                  IP address, browser type, pages visited, and interaction with our services.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>Provide and improve our structured play programs</li>
                  <li>Communicate with you about classes, schedules, and updates</li>
                  <li>Process payments and manage bookings</li>
                  <li>Ensure the safety and well-being of all children in our programs</li>
                  <li>Comply with legal obligations and safety requirements</li>
                  <li>Send you newsletters and promotional materials (with your consent)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>In case of emergency to protect the safety of your child</li>
                  <li>With service providers who assist us in operating our business (under strict confidentiality agreements)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                
                <p className="text-gray-700 mb-6">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  encryption of sensitive data, secure servers, regular security audits, and staff training 
                  on data protection.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Children's Privacy</h2>
                
                <p className="text-gray-700 mb-6">
                  We are committed to protecting children's privacy. We do not knowingly collect personal 
                  information directly from children under 13. All information about children is provided 
                  by parents or guardians and is used solely for the purpose of providing our services 
                  and ensuring child safety.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>Access the personal information we hold about you and your child</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Request a copy of your data in a portable format</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                
                <p className="text-gray-700 mb-6">
                  Our website uses cookies to improve your browsing experience and analyze website traffic. 
                  You can control cookie settings through your browser preferences. Some features of our 
                  website may not function properly if cookies are disabled.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                
                <p className="text-gray-700 mb-6">
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. Typically, we retain information for 7 years after 
                  your last interaction with our services, unless a longer retention period is required by law.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                
                <p className="text-gray-700 mb-6">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by email or through our website. Your continued use of our services after such 
                  changes constitutes acceptance of the updated policy.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                
                <p className="text-gray-700 mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Learn by Sensory</strong><br />
                    Email: privacy@learnbysensory.com<br />
                    Phone: (503) 555-1234<br />
                    Address: 12334 SilverSpring Place, Portland, OR 97201
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;