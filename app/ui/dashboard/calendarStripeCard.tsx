"use client"
import { useState } from 'react';
import { getSurroundingDays } from './utils/calendarStripeCard';

export const CalendarStripe = () => {
  const daysToMap = getSurroundingDays();
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); // Default to today's date

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  return (
    <div className=" relative flex justify-end overflow-x-auto">
      {daysToMap.map(({ dayNumber, dayName }) => (
        <div
          key={dayNumber}
          onClick={() => handleDayClick(dayNumber)}
          className={`flex border ml-2 bg-neutral-50 px-4 py-1 cursor-pointer justify-center rounded-md transition-all duration-300
            ${selectedDay === dayNumber ? 'bg-primary-100 border-primary-500' : 'border-neutral-100 hover:bg-primary-100 hover:border-primary-100'}`}
        >
          <div className="flex items-center">
            <div className="text-center">
              <p className={`font-bold text-sm ${selectedDay === dayNumber ? 'text-primary-600' : 'text-neutral-800'}`}>
                {dayNumber}
              </p>
              <p className={`text-xs ${selectedDay === dayNumber ? 'text-neutral-800' : 'text-neutral-700'}`}>
                {dayName}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
