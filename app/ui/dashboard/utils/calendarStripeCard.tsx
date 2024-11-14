export const getSurroundingDays = (): { dayNumber: number; dayName: string }[] => {
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const result = [];
    const today = new Date();
  
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
      const dayNumber = date.getDate(); // Only the day number
  
      result.push({ dayNumber, dayName });
    }
  
    return result;
  };