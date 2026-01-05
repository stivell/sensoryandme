import React, { useState } from 'react';
import { Calendar, ShieldAlert, BookOpen } from 'lucide-react';
import ClassManagementTable from '../components/admin/ClassManagementTable';
import ClassFormModal from '../components/admin/ClassFormModal';
import BookingsManagement from '../components/admin/BookingsManagement';
import { Class } from '../types';

type TabType = 'classes' | 'bookings';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('classes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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