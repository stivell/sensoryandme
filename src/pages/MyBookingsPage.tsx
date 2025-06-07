import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          booking.payment_status === 'completed'
                            ? 'bg-success-100 text-success-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {booking.payment_status === 'completed' ? 'Confirmed' : 'Pending'}
                        </span>
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
      </div>
    </div>
  );
};

export default MyBookingsPage;