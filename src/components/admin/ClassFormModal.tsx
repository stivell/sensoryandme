import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Class, Location } from '../../types';
import { X, Save } from 'lucide-react';

interface ClassFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  classData?: Class | null;
}

const ClassFormModal: React.FC<ClassFormModalProps> = ({ isOpen, onClose, onSave, classData }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    capacity: 8,
    enrolled: 0,
    price: 35,
    location_id: '',
    age_group: '',
    skills: '',
    image_url: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchLocations();
      if (classData) {
        setFormData({
          title: classData.title,
          description: classData.description,
          date: classData.date,
          time: classData.time,
          duration: classData.duration,
          capacity: classData.capacity,
          enrolled: classData.enrolled,
          price: Number(classData.price),
          location_id: classData.location_id,
          age_group: classData.age_group,
          skills: classData.skills.join(', '),
          image_url: classData.image_url
        });
      } else {
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          duration: 60,
          capacity: 8,
          enrolled: 0,
          price: 35,
          location_id: '',
          age_group: '',
          skills: '',
          image_url: ''
        });
      }
    }
  }, [isOpen, classData]);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name');

      if (error) throw error;
      setLocations(data || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const dataToSave = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        capacity: formData.capacity,
        enrolled: formData.enrolled,
        price: formData.price,
        location_id: formData.location_id,
        age_group: formData.age_group,
        skills: skillsArray,
        image_url: formData.image_url
      };

      if (classData) {
        const { error } = await supabase
          .from('classes')
          .update(dataToSave)
          .eq('id', classData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('classes')
          .insert([dataToSave]);

        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (err) {
      console.error('Error saving class:', err);
      alert('Failed to save class: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {classData ? 'Edit Class' : 'Add New Class'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder="e.g., Sensory Exploration"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder="Describe the class..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder="e.g., 10:00 AM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                required
                min="15"
                max="180"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Group *
              </label>
              <input
                type="text"
                required
                value={formData.age_group}
                onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder="e.g., 3-5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                required
                min="1"
                max="50"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currently Enrolled
              </label>
              <input
                type="number"
                min="0"
                value={formData.enrolled}
                onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                required
                value={formData.location_id}
                onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (comma-separated) *
              </label>
              <input
                type="text"
                required
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder="e.g., Sensory Processing, Fine Motor, Social Interaction"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                placeholder="https://images.pexels.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  {classData ? 'Update Class' : 'Create Class'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassFormModal;
