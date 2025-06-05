import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Users, Calendar, AlertCircle, ShieldAlert } from 'lucide-react';

interface UserWithBookings {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  created_at: string;
  bookings: {
    id: string;
    child_name: string;
    child_age: number;
    payment_status: string;
    created_at: string;
    class: {
      title: string;
      date: string;
      time: string;
    };
  }[];
}

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithBookings[]>([]);
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

    const fetchData = async () => {
      try {
        const isAdminUser = await checkAdminAccess();
        setIsAdmin(isAdminUser);

        if (!isAdminUser) {
          setError('Unauthorized: Admin access required');
          setIsLoading(false);
          return;
        }

        // Fetch all users from public.users with their details
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (usersError) throw usersError;

        // Fetch all bookings with class details
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            id,
            child_name,
            child_age,
            payment_status,
            created_at,
            user_id,
            class:classes (
              title,
              date,
              time
            )
          `)
          .order('created_at', { ascending: false });

        if (bookingsError) throw bookingsError;

        // Combine users with their bookings
        const usersWithBookings = usersData.map(user => ({
          ...user,
          bookings: bookingsData.filter(booking => booking.user_id === user.id) || []
        }));

        setUsers(usersWithBookings);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  const totalBookings = users.reduce((sum, user) => sum + user.bookings.length, 0);
  const totalParents = users.filter(user => user.role === 'parent').length;
  const totalAdmins = users.filter(user => user.role === 'admin').length;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3 text-secondary-600" />
            Admin Dashboard
          </h1>
          <div className="flex space-x-4">
            <div className="bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-medium">
              {totalParents} Parents
            </div>
            <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              {totalAdmins} Admins
            </div>
            <div className="bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-medium">
              {totalBookings} Bookings
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{user.name || 'No name provided'}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    {user.phone && <p className="text-gray-600">{user.phone}</p>}
                    <p className="text-gray-500 text-sm">
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'admin' 
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-secondary-100 text-secondary-800'
                  }`}>
                    {user.role}
                  </span>
                </div>

                {user.bookings && user.bookings.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-secondary-500" />
                      Booked Classes ({user.bookings.length})
                    </h3>
                    <div className="space-y-3">
                      {user.bookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{booking.class.title}</h4>
                              <p className="text-gray-600">
                                {new Date(booking.class.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })} at {booking.class.time}
                              </p>
                              <p className="text-gray-600">
                                Child: {booking.child_name} (Age {booking.child_age})
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.payment_status === 'completed'
                                ? 'bg-success-100 text-success-800'
                                : 'bg-warning-100 text-warning-800'
                            }`}>
                              {booking.payment_status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No classes booked yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;