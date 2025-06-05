import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Users, Calendar, AlertCircle } from 'lucide-react';

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

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (userError || userData?.role !== 'admin') {
        navigate('/');
        return;
      }
    };

    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select(`
            *,
            bookings (
              id,
              child_name,
              child_age,
              payment_status,
              created_at,
              class:classes (
                title,
                date,
                time
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
    fetchUsers();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3 text-secondary-600" />
            Admin Dashboard
          </h1>
          <div className="bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-medium">
            {users.length} Total Users
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
                      Booked Classes
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