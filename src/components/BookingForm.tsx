import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

interface BookingFormProps {
  classId: string;
  className: string;
  classDate: string;
  classTime: string;
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  classId, 
  className, 
  classDate, 
  classTime, 
  price 
}) => {
  const navigate = useNavigate();
  const { setUserEmail } = useAppContext();
  
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    specialNeeds: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.parentName || !formData.email || !formData.phone) {
        setError('Please fill out all required fields');
        return;
      }
    }
    setCurrentStep(2);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(1);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.childName || !formData.childAge) {
      setError('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get user session
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError || !session) {
        throw new Error('Please sign in to book a class');
      }

      // Get location details
      const { data: classData } = await supabase
        .from('classes')
        .select('*, location:locations(name)')
        .eq('id', classId)
        .single();

      if (!classData) {
        throw new Error('Class not found');
      }
      
      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          class_id: classId,
          user_id: session.user.id,
          parent_name: formData.parentName,
          child_name: formData.childName,
          child_age: parseInt(formData.childAge),
          special_needs: formData.specialNeeds || null,
          payment_status: 'pending'
        });
      
      if (bookingError) {
        throw bookingError;
      }
      
      // Update class enrollment
      const { error: updateError } = await supabase.rpc('increment_enrollment', {
        p_class_id: classId
      });
      
      if (updateError) {
        throw updateError;
      }

      // Email sending disabled - configure SendGrid to enable
      console.log('Booking created successfully - email notifications disabled');
      
      // Store email for context
      setUserEmail(formData.email);
      
      // Navigate to confirmation
      navigate('/booking-confirmation', { 
        state: { 
          className,
          classDate,
          classTime,
          price,
          email: formData.email
        } 
      });
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format date
  const formattedDate = new Date(classDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-secondary-50 p-4 border-b border-secondary-100">
        <h3 className="font-bold text-lg text-gray-800">Book Your Session</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-secondary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`ml-2 text-sm ${
                currentStep >= 1 ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                Contact Info
              </div>
            </div>
            
            <div className="flex-1 mx-4 h-1 bg-gray-200">
              <div 
                className="h-full bg-secondary-500 transition-all duration-300"
                style={{ width: currentStep >= 2 ? '100%' : '0%' }}
              ></div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-secondary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className={`ml-2 text-sm ${
                currentStep >= 2 ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                Child Info
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{className}</h4>
              <p className="text-gray-600 text-sm">{formattedDate} | {classTime}</p>
            </div>
            <div className="text-xl font-bold text-secondary-700">${price}</div>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 text-error-800 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Name *
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Age *
                </label>
                <input
                  type="number"
                  id="childAge"
                  name="childAge"
                  min="2"
                  max="12"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Needs or Accommodations
                </label>
                <textarea
                  id="specialNeeds"
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleChange}
                  rows={3}
                  className="input"
                  placeholder="Please let us know about any special needs, accommodations, or information that would help us better support your child."
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-outline"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;