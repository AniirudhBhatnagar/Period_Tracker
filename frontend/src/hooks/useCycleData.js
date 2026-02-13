import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useCycleData = () => {
  const [cycleData, setCycleData] = useState(() => {
    const savedData = localStorage.getItem('cycleData');
    return savedData ? JSON.parse(savedData) : {
      startDate: dayjs().format('YYYY-MM-DD'),
      cycleLength: 28,
      periodLength: 5
    };
  });

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [cycleDay, setCycleDay] = useState(1);
  const [phase, setPhase] = useState('Menstrual');

  // Calculate cycle day
  const calculateCycleDay = () => {
    const startDate = dayjs(cycleData.startDate);
    const daysSinceStart = dayjs().diff(startDate, 'day');
    return (daysSinceStart % cycleData.cycleLength) + 1;
  };

  // Calculate phase based on cycle day
  const calculatePhase = (day) => {
    if (day <= cycleData.periodLength) return 'Menstrual';
    if (day <= 13) return 'Follicular';
    if (day === 14) return 'Ovulation';
    return 'Luteal';
  };

  // Calculate predicted period dates
  const calculatePredictedPeriodDates = () => {
    const dates = [];
    const startDate = dayjs(cycleData.startDate);
    
    // Calculate next 3 cycles
    for (let i = 0; i < 3; i++) {
      const cycleStart = startDate.add(i * cycleData.cycleLength, 'day');
      for (let j = 0; j < cycleData.periodLength; j++) {
        dates.push(cycleStart.add(j, 'day').format('YYYY-MM-DD'));
      }
    }
    
    return dates;
  };

  // Calculate ovulation date
  const calculateOvulationDate = () => {
    const startDate = dayjs(cycleData.startDate);
    const daysSinceStart = dayjs().diff(startDate, 'day');
    const currentCycleStart = startDate.add(
      Math.floor(daysSinceStart / cycleData.cycleLength) * cycleData.cycleLength,
      'day'
    );
    return currentCycleStart.add(13, 'day').format('YYYY-MM-DD');
  };

  // Update cycle data
  const updateCycleData = (newData) => {
    setCycleData(newData);
    localStorage.setItem('cycleData', JSON.stringify(newData));
  };

  // Effect to update cycle day and phase
  useEffect(() => {
    const day = calculateCycleDay();
    setCycleDay(day);
    setPhase(calculatePhase(day));
  }, [cycleData]);

  return {
    cycleData,
    currentDate,
    cycleDay,
    phase,
    predictedPeriodDates: calculatePredictedPeriodDates(),
    ovulationDate: calculateOvulationDate(),
    updateCycleData,
    setCurrentDate
  };
};

export default useCycleData; 