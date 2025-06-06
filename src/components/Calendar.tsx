import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Calendar: React.FC = () => {
  const { classes } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  const prevMonth = () => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    setCurrentMonth(date);
  };
  
  const nextMonth = () => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    setCurrentMonth(date);
  };
  
  const getClassesForDay = (day: Date) => {
    return classes.filter(c => isSameDay(new Date(c.date), day));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-purple-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 bg-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {Array(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay())
          .fill(null)
          .map((_, index) => (
            <div key={`empty-start-${index}`} className="bg-white p-2 h-24"></div>
          ))}
        
        {daysInMonth.map(day => {
          const dayClasses = getClassesForDay(day);
          const hasClasses = dayClasses.length > 0;
          
          return (
            <motion.div
              key={day.toString()}
              whileHover={{ scale: hasClasses ? 1.02 : 1 }}
              className={`bg-white p-2 h-24 overflow-hidden ${hasClasses ? 'cursor-pointer' : ''} ${
                isToday(day) ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-medium ${
                  isToday(day) ? 'bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700'
                }`}>
                  {format(day, 'd')}
                </span>
                {hasClasses && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">
                    {dayClasses.length}
                  </span>
                )}
              </div>
              
              <div className="mt-1 space-y-1">
                {dayClasses.slice(0, 2).map((cls, idx) => (
                  <div 
                    key={idx} 
                    className="text-xs truncate bg-purple-50 text-purple-700 p-1 rounded"
                  >
                    {cls.time} - {cls.title}
                  </div>
                ))}
                {dayClasses.length > 2 && (
                  <div className="text-xs text-gray-500 italic">
                    + {dayClasses.length - 2} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {Array(
          6 * 7 - (daysInMonth.length + new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay())
        )
          .fill(null)
          .map((_, index) => (
            <div key={`empty-end-${index}`} className="bg-white p-2 h-24"></div>
          ))
          .slice(0, 13)} {/* Limit to avoid too many empty cells */}
      </div>
    </div>
  );
};

export default Calendar;