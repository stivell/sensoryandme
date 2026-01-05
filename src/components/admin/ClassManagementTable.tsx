import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Class, Location } from '../../types';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';

interface ClassManagementTableProps {
  onEdit: (classData: Class) => void;
  onAdd: () => void;
  refreshTrigger?: number;
}

const ClassManagementTable: React.FC<ClassManagementTableProps> = ({ onEdit, onAdd, refreshTrigger }) => {
  const [classes, setClasses] = useState<(Class & { location?: Location })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('classes')
        .select(`
          *,
          location:locations (*)
        `)
        .order('date', { ascending: true });

      if (fetchError) throw fetchError;

      setClasses(data || []);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch classes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [refreshTrigger]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('classes')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setClasses(classes.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting class:', err);
      alert('Failed to delete class: ' + (err instanceof Error ? err.message : 'Unknown error'));
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Class Management</h2>
        <button
          onClick={onAdd}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Class
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((classItem) => (
                <tr key={classItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{classItem.title}</div>
                    <div className="text-sm text-gray-500">{classItem.age_group} years</div>
                    <div className="text-sm text-gray-500">{classItem.duration} min</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(classItem.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-500">{classItem.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {classItem.location?.name || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {classItem.enrolled} / {classItem.capacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-secondary-600 h-2 rounded-full"
                        style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${Number(classItem.price).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(classItem)}
                        className="text-secondary-600 hover:text-secondary-800 transition-colors"
                        title="Edit class"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(classItem.id, classItem.title)}
                        className="text-error-600 hover:text-error-800 transition-colors"
                        title="Delete class"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {classes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No classes found. Click "Add New Class" to create one.
        </div>
      )}
    </div>
  );
};

export default ClassManagementTable;
