import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BookingForm from '../components/BookingForm';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const ClassDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { classes, locations } = useAppContext();
  const [classItem, setClassItem] = useState(null);
  const [location, setLocation] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchClassAndUser = async () => {
      try {
        // Get user session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);

        // Find class from context first
        let foundClass = classes.find(c => c.id === id);
        
        if (!foundClass && id) {
          // If not found in context, fetch from database
          const { data: classData, error } = await supabase
            .from('classes')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) {
            console.error('Error fetching class:', error);
            navigate('/classes');
            return;
          }
          
          foundClass = classData;
        }

        if (!foundClass) {
          navigate('/classes');
          return;
        }

        setClassItem(foundClass);

        // Find location
        const foundLocation = locations.find(l => l.id === foundClass.location_id);
        setLocation(foundLocation);
      } catch (error) {
        console.error('Error:', error);
        navigate('/classes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassAndUser();
  }, [id, classes, locations, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  if (!classItem) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Class Not Found</h1>
          <p className="text-gray-600 mb-6">The class you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/classes')} className="btn-primary">
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate spots left
  const spotsLeft = classItem.capacity - classItem.enrolled;
  const isFullyBooked = spotsLeft <= 0;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/classes')}
          className="flex items-center text-secondary-600 hover:text-secondary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Classes
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            >
              <div className="relative">
                <img 
                  src={classItem.image_url} 
                  alt={classItem.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 text-secondary-700 font-bold px-4 py-2 rounded-full text-lg">
                  ${classItem.price}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Ages {classItem.age_group}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {classItem.title}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-secondary-500" />
                    <span>{formatDate(classItem.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3 text-secondary-500" />
                    <span>{classItem.time} ({classItem.duration} min)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-secondary-500" />
                    <span>{location ? location.name : 'Location TBD'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-secondary-500" />
                    <span className={`${spotsLeft <= 2 && spotsLeft > 0 ? 'text-warning-600 font-medium' : isFullyBooked ? 'text-error-600 font-medium' : 'text-gray-600'}`}>
                      {isFullyBooked ? 'Fully Booked' : `${spotsLeft} spots left`}
                    </span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-3">About This Class</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {classItem.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Skills Developed</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {classItem.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {location && (
                    <>
                      <h3 className="text-xl font-semibold mb-3">Location Details</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-gray-800 mb-2">{location.name}</h4>
                        <p className="text-gray-600">
                          {location.address}<br />
                          {location.city}, {location.state} {location.zip}
                        </p>
                      </div>
                    </>
                  )}
                  
                  <h3 className="text-xl font-semibold mb-3">What to Expect</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Small group setting with personalized attention</li>
                    <li>Structured activities designed for skill development</li>
                    <li>Trained facilitators experienced with diverse needs</li>
                    <li>Safe, inclusive environment for all children</li>
                    <li>Take-home resources for continued learning</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              {user ? (
                !isFullyBooked ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <BookingForm
                      classId={classItem.id}
                      className={classItem.title}
                      classDate={classItem.date}
                      classTime={classItem.time}
                      price={classItem.price}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-md p-6"
                  >
                    <div className="text-center">
                      <div className="bg-error-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-error-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Class Full</h3>
                      <p className="text-gray-600 mb-4">
                        This class is currently at capacity. Check out our other available classes or contact us to be added to the waitlist.
                      </p>
                      <button
                        onClick={() => navigate('/classes')}
                        className="btn-secondary w-full"
                      >
                        View Other Classes
                      </button>
                    </div>
                  </motion.div>
                )
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Ready to Book?</h3>
                    <p className="text-gray-600 mb-6">
                      Sign in to your account or create one to book this class.
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/login')}
                        className="btn-primary w-full"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => navigate('/signup')}
                        className="btn-outline w-full"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-green-50 rounded-xl p-6 mt-6"
              >
                <h3 className="font-semibold text-green-800 mb-3">Need Help?</h3>
                <p className="text-green-700 text-sm mb-4">
                  Have questions about this class or need special accommodations? We're here to help!
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="btn-accent w-full text-sm"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;