import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle, CheckCircle } from 'lucide-react';

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

interface BookingsManagementProps {
  refreshTrigger?: number;
}

const BookingsManagement: React.FC<BookingsManagementProps> = ({ refreshTrigger }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);

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

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const updatePaymentStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ payment_status: newStatus })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      setBookings(bookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, payment_status: newStatus }
          : booking
      ));
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert('Failed to update payment status: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        {error}
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
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bookings Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-secondary-100 text-secondary-800 px-4 py-3 rounded-lg">
            <div className="text-sm font-medium">Total Bookings</div>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </div>
          <div className="bg-warning-100 text-warning-800 px-4 py-3 rounded-lg">
            <div className="text-sm font-medium">Pending</div>
            <div className="text-2xl font-bold">{pendingBookings}</div>
          </div>
          <div className="bg-success-100 text-success-800 px-4 py-3 rounded-lg">
            <div className="text-sm font-medium">Completed</div>
            <div className="text-2xl font-bold">{completedBookings}</div>
          </div>
          <div className="bg-primary-100 text-primary-800 px-4 py-3 rounded-lg">
            <div className="text-sm font-medium">Total Revenue</div>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      </div>

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
                    <select
                      value={booking.payment_status}
                      onChange={(e) => updatePaymentStatus(booking.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                        booking.payment_status === 'completed'
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
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

      {bookings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No bookings found.
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
