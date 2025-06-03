import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingState {
  className: string;
  classDate: string;
  classTime: string;
  price: number;
  email: string;
}

const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as BookingState;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!bookingData) {
      navigate('/classes');
    }
  }, [bookingData, navigate]);
  
  if (!bookingData) {
    return null; // Will redirect in useEffect
  }
  
  // Format date
  const formattedDate = new Date(bookingData.classDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Generate random confirmation code
  const confirmationCode = `SM${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-success-500 text-white p-6 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-white/90 text-lg">
              Thank you for booking a session with Sensory & ME.
            </p>
          </div>
          
          <div className="p-8">
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="bg-secondary-100 rounded-full p-2 mr-3 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Class</h3>
                    <p className="text-gray-700">{bookingData.className}</p>
                    <p className="text-gray-600">{formattedDate}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-secondary-100 rounded-full p-2 mr-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Time</h3>
                    <p className="text-gray-700">{bookingData.classTime}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-secondary-100 rounded-full p-2 mr-3 flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Payment</h3>
                    <p className="text-gray-700">${bookingData.price}.00</p>
                    <p className="text-gray-600">Payment complete</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-1">Confirmation Code</h3>
                <p className="text-secondary-700 font-bold text-lg">{confirmationCode}</p>
              </div>
              
              <p className="text-gray-600 mb-4">
                We've sent a confirmation email to <span className="font-medium">{bookingData.email}</span> with 
                all the details of your booking.
              </p>
              
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <h3 className="font-medium text-primary-800 mb-1">What's Next?</h3>
                <p className="text-primary-700">
                  Please arrive 10-15 minutes before the session starts. Our team will greet you and 
                  help get your child settled in for a fantastic play experience!
                </p>
              </div>
            </div>
            
            <div className="flex justify-between space-x-4">
              <Link to="/classes" className="btn-outline flex-1">
                Book Another Class
              </Link>
              <Link to="/" className="btn-primary flex-1 inline-flex items-center justify-center">
                Return to Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;