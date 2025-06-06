import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, User, AlertCircle, CreditCard, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserBooking {
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
    description: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    age_group: string;
    image_url: string;
    location: {
      name: string;
      address: string;
      city: string;
      state: string;
    };
  } | null;
}

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const checkAuthAndFetchBookings = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        setUser(session.user);

        const { data, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            class:classes (
              id,
              title,
              description,
              date,
              time,
              duration,
              price,
              age_group,
              image_url,
              location:locations (
                name,
                address,
                city,
                state
              )
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

    checkAuthAndFetchBookings();
  }, [navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBookingDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (classDate: string) => {
    return new Date(classDate) > new Date();
  };

  const getHoursUntilClass = (classDate: string, classTime: string) => {
    const classDateTime = new Date(`${classDate} ${classTime}`);
    const now = new Date();
    const diffMs = classDateTime.getTime() - now.getTime();
    return diffMs / (1000 * 60 * 60); // Convert to hours
  };

  const getCancellationPolicy = (classDate: string, classTime: string) => {
    const hoursUntil = getHoursUntilClass(classDate, classTime);
    
    if (hoursUntil >= 48) {
      return { type: 'full', message: 'Full refund available', color: 'text-success-600' };
    } else if (hoursUntil >= 24) {
      return { type: 'partial', message: '50% credit available', color: 'text-warning-600' };
    } else {
      return { type: 'none', message: 'No refund available', color: 'text-error-600' };
    }
  };

  const canCancelBooking = (classDate: string, classTime: string) => {
    const hoursUntil = getHoursUntilClass(classDate, classTime);
    return hoursUntil > 0; // Can cancel if class hasn't started yet
  };

  const handleCancelClick = (booking: UserBooking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    setCancellingBookingId(selectedBooking.id);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', selectedBooking.id);

      if (deleteError) throw deleteError;

      // Update enrollment count
      if (selectedBooking.class) {
        const { error: updateError } = await supabase.rpc('decrement_enrollment', {
          p_class_id: selectedBooking.class.id
        });

        if (updateError) {
          console.error('Error updating enrollment:', updateError);
        }
      }

      // Remove booking from local state
      setBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
      
      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setCancellingBookingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container-custom">
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-8 text-center">
            <AlertCircle className="h-16 w-16 text-warning-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-warning-800 mb-2">Please Sign In</h2>
            <p className="text-warning-600 mb-6">
              You need to be signed in to view your bookings.
            </p>
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              My <span className="text-secondary-600">Bookings</span>
            </h1>
            <p className="text-xl text-gray-600">
              View and manage your class bookings and booking history.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          {error && (
            <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't booked any classes yet. Browse our available classes to get started!
              </p>
              <Link to="/classes" className="btn-primary">
                Browse Classes
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Bookings ({bookings.length})
                </h2>
                <Link to="/classes" className="btn-secondary">
                  Book Another Class
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {booking.class ? (
                      <>
                        <div className="relative">
                          <img 
                            src={booking.class.image_url} 
                            alt={booking.class.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 right-3 flex space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              booking.payment_status === 'completed'
                                ? 'bg-success-100 text-success-800'
                                : 'bg-warning-100 text-warning-800'
                            }`}>
                              {booking.payment_status}
                            </span>
                            {booking.class.date && isUpcoming(booking.class.date) && (
                              <span className="bg-primary-100 text-primary-800 px-2 py-1 text-xs font-medium rounded-full">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2 text-gray-800">
                            {booking.class.title}
                          </h3>
                          
                          <div className="space-y-2 mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-secondary-500" />
                              <span>{formatDate(booking.class.date)}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-secondary-500" />
                              <span>{booking.class.time} ({booking.class.duration} min)</span>
                            </div>
                            
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-secondary-500" />
                              <span>
                                {booking.class.location.name}, {booking.class.location.city}, {booking.class.location.state}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-secondary-500" />
                              <span>{booking.child_name} (Age {booking.child_age})</span>
                            </div>

                            <div className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-2 text-secondary-500" />
                              <span className="font-medium">${booking.class.price}</span>
                            </div>
                          </div>

                          {booking.special_needs && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">Special needs:</span> {booking.special_needs}
                              </p>
                            </div>
                          )}

                          {/* Cancellation Policy and Button */}
                          {isUpcoming(booking.class.date) && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Cancellation Policy:</p>
                                  <p className={`text-sm ${getCancellationPolicy(booking.class.date, booking.class.time).color}`}>
                                    {getCancellationPolicy(booking.class.date, booking.class.time).message}
                                  </p>
                                </div>
                                {canCancelBooking(booking.class.date, booking.class.time) && (
                                  <button
                                    onClick={() => handleCancelClick(booking)}
                                    disabled={cancellingBookingId === booking.id}
                                    className="btn-outline text-error-600 border-error-600 hover:bg-error-50 text-sm px-3 py-1"
                                  >
                                    {cancellingBookingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">
                              Booked on {formatBookingDate(booking.created_at)}
                            </span>
                            <Link 
                              to={`/classes/${booking.class.id}`}
                              className="text-secondary-600 hover:text-secondary-700 font-medium text-sm"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Class details not available</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Booked on {formatBookingDate(booking.created_at)}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Cancel Booking</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to cancel your booking for:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{selectedBooking.class?.title}</p>
                <p className="text-sm text-gray-600">
                  {selectedBooking.class && formatDate(selectedBooking.class.date)} at {selectedBooking.class?.time}
                </p>
                <p className="text-sm text-gray-600">
                  Child: {selectedBooking.child_name}
                </p>
              </div>

              {selectedBooking.class && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    Refund Policy:
                  </p>
                  <p className={`text-sm ${getCancellationPolicy(selectedBooking.class.date, selectedBooking.class.time).color}`}>
                    {getCancellationPolicy(selectedBooking.class.date, selectedBooking.class.time).message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 btn-outline"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancellingBookingId === selectedBooking.id}
                className="flex-1 bg-error-600 text-white hover:bg-error-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {cancellingBookingId === selectedBooking.id ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MyBookingsPage;