import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, User, AlertCircle, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
  id: string;
  parent_name: string;
  child_name: string;
  child_age: number;
  special_needs: string | null;
  payment_status: string;
  created_at: string;
  class: {
    id: string;
    title: string;
    date: string;
    time: string;
    price: number;
    location_id: string;
  } | null;
}

interface CancelModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingId: string) => void;
  isLoading: boolean;
}

const CancelModal: React.FC<CancelModalProps> = ({ booking, isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen || !booking.class) return null;

  const classDate = new Date(booking.class.date);
  const now = new Date();
  const hoursUntilClass = (classDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const canGetRefund = hoursUntilClass >= 24;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Cancel Booking</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-800 mb-2">{booking.class.title}</h4>
              <p className="text-sm text-gray-600">
                {new Date(booking.class.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at {booking.class.time}
              </p>
              <p className="text-sm text-gray-600">Child: {booking.child_name}</p>
            </div>

            <div className={`p-4 rounded-lg ${canGetRefund ? 'bg-success-50 border border-success-200' : 'bg-warning-50 border border-warning-200'}`}>
              <div className="flex items-start">
                {canGetRefund ? (
                  <CheckCircle className="h-5 w-5 text-success-600 mt-0.5 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5 mr-2 flex-shrink-0" />
                )}
                <div>
                  <h4 className={`font-medium ${canGetRefund ? 'text-success-800' : 'text-warning-800'} mb-1`}>
                    {canGetRefund ? 'Full Refund Available' : 'No Refund Available'}
                  </h4>
                  <p className={`text-sm ${canGetRefund ? 'text-success-700' : 'text-warning-700'}`}>
                    {canGetRefund 
                      ? `You're canceling more than 24 hours in advance. You'll receive a full refund of $${booking.class.price}.`
                      : `You're canceling less than 24 hours before the class. No refund will be issued according to our cancellation policy.`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 btn-outline"
            >
              Keep Booking
            </button>
            <button
              onClick={() => onConfirm(booking.id)}
              disabled={isLoading}
              className="flex-1 bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 btn"
            >
              {isLoading ? 'Canceling...' : 'Cancel Booking'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; booking: Booking | null }>({
    isOpen: false,
    booking: null
  });
  const [isCanceling, setIsCanceling] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBookings = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        const { data, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            class:classes (
              id,
              title,
              date,
              time,
              price,
              location_id
            )
          `)
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (bookingsError) throw bookingsError;

        setBookings(data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleCancelBooking = async (bookingId: string) => {
    setIsCanceling(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please sign in to cancel bookings');
      }

      // Get the booking details
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking || !booking.class) {
        throw new Error('Booking not found');
      }

      // Calculate if refund is eligible (24+ hours before class)
      const classDate = new Date(booking.class.date);
      const now = new Date();
      const hoursUntilClass = (classDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      const isRefundEligible = hoursUntilClass >= 24;

      // Delete the booking
      const { error: deleteError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId)
        .eq('user_id', session.user.id);

      if (deleteError) {
        throw deleteError;
      }

      // Decrement class enrollment
      const { error: enrollmentError } = await supabase.rpc('decrement_enrollment', {
        p_class_id: booking.class.id
      });

      if (enrollmentError) {
        console.error('Error updating enrollment:', enrollmentError);
        // Don't throw here as the booking was already deleted
      }

      // Update local state
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      
      // Show success message
      const refundMessage = isRefundEligible 
        ? ` A refund of $${booking.class.price} will be processed within 3-5 business days.`
        : ' No refund will be issued due to our 24-hour cancellation policy.';
      
      setSuccessMessage(`Booking canceled successfully.${refundMessage}`);
      
      // Close modal
      setCancelModal({ isOpen: false, booking: null });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

    } catch (err) {
      console.error('Error canceling booking:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setIsCanceling(false);
    }
  };

  const openCancelModal = (booking: Booking) => {
    setCancelModal({ isOpen: true, booking });
  };

  const closeCancelModal = () => {
    setCancelModal({ isOpen: false, booking: null });
  };

  const canCancelBooking = (booking: Booking) => {
    if (!booking.class) return false;
    
    const classDate = new Date(booking.class.date);
    const now = new Date();
    
    // Can cancel if class hasn't started yet
    return classDate > now;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-600">
            View and manage your class bookings
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg flex items-center"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {successMessage}
          </motion.div>
        )}

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't booked any classes yet. Explore our available classes and book your first session!
            </p>
            <button
              onClick={() => navigate('/classes')}
              className="btn-primary"
            >
              Browse Classes
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {booking.class ? booking.class.title : 'Class Details Unavailable'}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>Booked on {new Date(booking.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            booking.payment_status === 'completed'
                              ? 'bg-success-100 text-success-800'
                              : 'bg-warning-100 text-warning-800'
                          }`}>
                            {booking.payment_status === 'completed' ? 'Confirmed' : 'Pending'}
                          </span>
                          {booking.class && new Date(booking.class.date) < new Date() && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>

                      {booking.class && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-secondary-500" />
                            <span className="text-sm">
                              {new Date(booking.class.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-secondary-500" />
                            <span className="text-sm">{booking.class.time}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-secondary-500" />
                            <span className="text-sm">Location {booking.class.location_id.slice(0, 8)}</span>
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <User className="h-4 w-4 mr-2 text-secondary-500" />
                              <span className="font-medium text-gray-800">Child Information</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              <strong>Name:</strong> {booking.child_name}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Age:</strong> {booking.child_age} years old
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-2">
                              <User className="h-4 w-4 mr-2 text-secondary-500" />
                              <span className="font-medium text-gray-800">Parent/Guardian</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              <strong>Name:</strong> {booking.parent_name}
                            </p>
                            {booking.class && (
                              <p className="text-sm text-gray-600">
                                <strong>Price:</strong> ${booking.class.price}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {booking.special_needs && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="font-medium text-gray-800 mb-1">Special Needs/Accommodations:</p>
                            <p className="text-sm text-gray-600">{booking.special_needs}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                      {booking.class && (
                        <button
                          onClick={() => navigate(`/classes/${booking.class!.id}`)}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          View Class
                        </button>
                      )}
                      
                      {booking.class && canCancelBooking(booking) && (
                        <button
                          onClick={() => openCancelModal(booking)}
                          className="bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 btn text-sm px-4 py-2"
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigate('/contact')}
                        className="btn-outline text-sm px-4 py-2"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cancel Modal */}
        {cancelModal.booking && (
          <CancelModal
            booking={cancelModal.booking}
            isOpen={cancelModal.isOpen}
            onClose={closeCancelModal}
            onConfirm={handleCancelBooking}
            isLoading={isCanceling}
          />
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;