import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Users, Calendar, AlertCircle, ShieldAlert, Clock, DollarSign } from 'lucide-react';

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
  } | null;
  user: {
    email: string;
    phone: string | null;
  } | null;
}

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return false;
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (userError || userData?.role !== 'admin') {
          return false;
        }

        return true;
      } catch (err) {
        return false;
      }
    };

    const fetchBookings = async () => {
      try {
        const isAdminUser = await checkAdminAccess();
        setIsAdmin(isAdminUser);

        if (!isAdminUser) {
          setError('Unauthorized: Admin access required');
          setIsLoading(false);
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
              price
            ),
            user:users (
              email,
              phone
            )
          `)
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container-custom">
          <div className="bg-error-50 border border-error-200 rounded-lg p-8 text-center">
            <ShieldAlert className="h-16 w-16 text-error-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-error-800 mb-2">Access Denied</h2>
            <p className="text-error-600 mb-6">
              You don't have permission to access the admin dashboard.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.payment_status === 'pending').length;
  const completedBookings = bookings.filter(b => b.payment_status === 'completed').length;
  const totalRevenue = bookings
    .filter(b => b.payment_status === 'completed' && b.class)
    .reduce((sum, b) => sum + Number(b.class?.price || 0), 0);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-secondary-600" />
            Bookings Dashboard
          </h1>
          <div className="flex space-x-4">
            <div className="bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-medium">
              {totalBookings} Total Bookings
            </div>
            <div className="bg-warning-100 text-warning-800 px-4 py-2 rounded-full text-sm font-medium">
              {pendingBookings} Pending
            </div>
            <div className="bg-success-100 text-success-800 px-4 py-2 rounded-full text-sm font-medium">
              {completedBookings} Completed
            </div>
            <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              ${totalRevenue} Revenue
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{booking.parent_name}</div>
                      {booking.user && (
                        <>
                          <div className="text-sm text-gray-500">{booking.user.email}</div>
                          {booking.user.phone && (
                            <div className="text-sm text-gray-500">{booking.user.phone}</div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.child_name} (Age {booking.child_age})
                      </div>
                      {booking.special_needs && (
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Special needs:</span> {booking.special_needs}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {booking.class ? (
                        <>
                          <div className="text-sm font-medium text-gray-900">{booking.class.title}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(booking.class.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-sm text-gray-500">{booking.class.time}</div>
                          <div className="text-sm font-medium text-primary-600">${booking.class.price}</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-500">Class details not available</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        booking.payment_status === 'completed'
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}>
                        {booking.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;