const mockData = {
  symptoms: {
    '2025-06-19': ['Headache', 'Cramps', 'Nausea'],
    '2025-06-20': ['Fatigue'],
  },
  reminders: {
    '2025-06-19': ['09:00 – Time to take pill', "19:00 – Doctor's appointment"],
    '2025-06-20': ['09:00 – Time to take pill'],
  },
  notes: {
    '2025-06-19': 'Felt tired, but went for a walk.',
    '2025-06-20': 'No symptoms today.',
  },
  stats: {
    avgCycleLength: 28,
    avgPeriodLength: 5,
  },
};

export default mockData;
