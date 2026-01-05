import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ShieldAlert, BookOpen, Users } from 'lucide-react';
import ClassManagementTable from '../components/admin/ClassManagementTable';
import ClassFormModal from '../components/admin/ClassFormModal';
import BookingsManagement from '../components/admin/BookingsManagement';
import { Class } from '../types';

type TabType = 'classes' | 'bookings';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('classes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
          .maybeSingle();

        if (userError || userData?.role !== 'admin') {
          return false;
        }

        return true;
      } catch (err) {
        return false;
      }
    };

    const init = async () => {
      try {
        const isAdminUser = await checkAdminAccess();
        setIsAdmin(isAdminUser);
      } catch (err) {
        console.error('Error checking admin access:', err);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [navigate]);

  const handleEdit = (classData: Class) => {
    setEditingClass(classData);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleSave = () => {
    setRefreshTrigger(prev => prev + 1);
  };

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

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
            <ShieldAlert className="h-8 w-8 mr-3 text-secondary-600" />
            Admin Dashboard
          </h1>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('classes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                  activeTab === 'classes'
                    ? 'border-secondary-600 text-secondary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Classes Management
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-secondary-600 text-secondary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Bookings Management
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-8">
          {activeTab === 'classes' && (
            <ClassManagementTable
              onEdit={handleEdit}
              onAdd={handleAdd}
              refreshTrigger={refreshTrigger}
            />
          )}
          {activeTab === 'bookings' && (
            <BookingsManagement refreshTrigger={refreshTrigger} />
          )}
        </div>

        <ClassFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
          classData={editingClass}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;