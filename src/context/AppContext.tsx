import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Class, Location } from '../types';
import { supabase, isDemoMode } from '../lib/supabase';
import { mockClasses, mockLocations } from '../data/mockData';

interface AppContextProps {
  classes: Class[];
  locations: Location[];
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  isNewsletterSubscribed: boolean;
  setIsNewsletterSubscribed: (value: boolean) => void;
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  filteredClasses: Class[];
  setFilteredClasses: (classes: Class[]) => void;
  filterClasses: (locationId?: string, ageGroup?: string, dateRange?: [Date, Date]) => void;
  selectedClass: Class | null;
  setSelectedClass: (classItem: Class | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isDemoMode) {
          // Use mock data in demo mode
          console.log('Running in demo mode with mock data');
          setLocations(mockLocations);
          setClasses(mockClasses);
          setFilteredClasses(mockClasses);
          return;
        }

        // Fetch locations
        const { data: locationsData, error: locationsError } = await supabase
          .from('locations')
          .select('*');

        if (locationsError) {
          console.error('Error fetching locations:', locationsError);
          // Fallback to mock data
          setLocations(mockLocations);
        } else {
          setLocations(locationsData || []);
        }

        // Fetch classes
        const { data: classesData, error: classesError } = await supabase
          .from('classes')
          .select('*');

        if (classesError) {
          console.error('Error fetching classes:', classesError);
          // Fallback to mock data
          setClasses(mockClasses);
          setFilteredClasses(mockClasses);
        } else {
          setClasses(classesData || []);
          setFilteredClasses(classesData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data
        setLocations(mockLocations);
        setClasses(mockClasses);
        setFilteredClasses(mockClasses);
      }
    };

    fetchData();
  }, []);

  const filterClasses = (locationId?: string, ageGroup?: string, dateRange?: [Date, Date]) => {
    let result = [...classes];
    
    if (locationId) {
      result = result.filter(c => c.location_id === locationId);
    }
    
    if (ageGroup) {
      result = result.filter(c => c.age_group === ageGroup);
    }
    
    if (dateRange && dateRange.length === 2) {
      result = result.filter(c => {
        const classDate = new Date(c.date);
        return classDate >= dateRange[0] && classDate <= dateRange[1];
      });
    }
    
    setFilteredClasses(result);
  };

  return (
    <AppContext.Provider value={{
      classes,
      locations,
      userEmail,
      setUserEmail,
      isNewsletterSubscribed,
      setIsNewsletterSubscribed,
      newsletterEmail,
      setNewsletterEmail,
      filteredClasses,
      setFilteredClasses,
      filterClasses,
      selectedClass,
      setSelectedClass,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};