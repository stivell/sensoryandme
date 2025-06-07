import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, AlertTriangle } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using our services
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
                      <FileText className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Agreement</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Safety</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Responsibilities</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Limitations</h3>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                
                <p className="text-gray-700 mb-6">
                  By accessing and using Learn by Sensory's services, you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                
                <p className="text-gray-700 mb-4">
                  Learn by Sensory provides structured play programs designed to support child development. 
                  Our services include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>AI-powered structured play sessions</li>
                  <li>Small group activities for children ages 2-8</li>
                  <li>Specialized programs for children with diverse needs</li>
                  <li>Parent resources and support</li>
                  <li>Online booking and account management</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Registration and Account Security</h2>
                
                <p className="text-gray-700 mb-4">
                  To use our services, you must:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Child Safety and Supervision</h2>
                
                <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-warning-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-warning-800 mb-2">Important Safety Information</h3>
                      <p className="text-warning-700 text-sm">
                        Child safety is our top priority. Please read this section carefully.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  By enrolling your child in our programs, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>You are responsible for your child's behavior and safety during sessions</li>
                  <li>You must disclose any medical conditions, allergies, or special needs</li>
                  <li>You authorize our staff to take necessary action in case of emergency</li>
                  <li>You understand that physical activity carries inherent risks</li>
                  <li>You must arrive on time for pickup and drop-off</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Cancellation Policy</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Terms</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Payment is required at the time of booking</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Cancellation Policy</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>Cancellations must be made at least 24 hours in advance for a full refund</li>
                  <li>No-shows will be charged the full session fee</li>
                  <li>We may cancel sessions due to low enrollment or unforeseen circumstances</li>
                  <li>In case of our cancellation, you will receive a full refund or credit</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Code of Conduct</h2>
                
                <p className="text-gray-700 mb-4">
                  All participants and families are expected to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  <li>Treat all staff, children, and families with respect</li>
                  <li>Follow all facility rules and safety guidelines</li>
                  <li>Communicate concerns or issues promptly with staff</li>
                  <li>Support an inclusive environment for all children</li>
                  <li>Refrain from disruptive or inappropriate behavior</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                
                <p className="text-gray-700 mb-6">
                  All content, materials, and methodologies used in our programs are the intellectual 
                  property of Learn by Sensory. You may not reproduce, distribute, or use our materials 
                  without written permission.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                
                <p className="text-gray-700 mb-6">
                  Learn by Sensory's liability is limited to the amount paid for services. We are not 
                  liable for any indirect, incidental, or consequential damages. Participation in our 
                  programs is at your own risk.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
                
                <p className="text-gray-700 mb-6">
                  Your privacy is important to us. Please review our Privacy Policy to understand how 
                  we collect, use, and protect your information. By using our services, you consent 
                  to our data practices as described in our Privacy Policy.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
                
                <p className="text-gray-700 mb-6">
                  We reserve the right to modify these terms at any time. Changes will be posted on 
                  our website and will take effect immediately. Your continued use of our services 
                  constitutes acceptance of any changes.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
                
                <p className="text-gray-700 mb-6">
                  We reserve the right to terminate or suspend your account and access to our services 
                  at our sole discretion, without notice, for conduct that we believe violates these 
                  terms or is harmful to other users or our business.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                
                <p className="text-gray-700 mb-6">
                  These terms are governed by the laws of the State of Oregon. Any disputes will be 
                  resolved in the courts of Multnomah County, Oregon.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Learn by Sensory</strong><br />
                    Email: legal@learnbysensory.com<br />
                    Phone: (503) 555-1234<br />
                    Address: 12334 SilverSpring Place, Portland, OR 97201
                  </p>
                </div>

                <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>Note:</strong> By using our services, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms of Service.
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

export default TermsOfServicePage;