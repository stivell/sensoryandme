import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar } from 'lucide-react';

const ClassFilter: React.FC = () => {
  const { locations, filterClasses, classes, setFilteredClasses } = useAppContext();
  const [location, setLocation] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  
  const handleFilter = () => {
    filterClasses(location || undefined, ageGroup || undefined);
  };
  
  const handleReset = () => {
    setLocation('');
    setAgeGroup('');
    setFilteredClasses(classes); // Reset to all classes directly
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-secondary-500" />
        Filter Classes
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Age Group
          </label>
          <select
            id="ageGroup"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="input"
          >
            <option value="">All Ages</option>
            <option value="2-3">Ages 2-3</option>
            <option value="3-5">Ages 3-5</option>
            <option value="4-6">Ages 4-6</option>
            <option value="6-8">Ages 6-8</option>
          </select>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <button 
            onClick={handleFilter}
            className="btn-secondary flex-1"
          >
            Apply Filters
          </button>
          <button 
            onClick={handleReset}
            className="btn-outline flex-1"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassFilter;