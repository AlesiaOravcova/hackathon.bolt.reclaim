export interface ScheduleActivity {
  id: string;
  title: string;
  time: string;
  duration: string;
  date: string;
  type: 'work' | 'family' | 'wellness' | 'personal';
  location?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  completed?: boolean;
}

export const gabieSchedule: ScheduleActivity[] = [
  // Saturday, June 29
  {
    id: 'sat-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-06-29',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'sat-2',
    title: 'Onsite',
    time: '9:30 AM',
    duration: '8 hours',
    date: '2024-06-29',
    type: 'work',
    location: 'Office',
    description: 'Full day at the office'
  },
  {
    id: 'sat-3',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-06-29',
    type: 'family',
    location: 'Home',
    description: 'Family dinner time'
  },

  // Sunday, June 30
  {
    id: 'sun-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-06-30',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'sun-2',
    title: 'Onsite',
    time: '9:30 AM',
    duration: '8 hours',
    date: '2024-06-30',
    type: 'work',
    location: 'Office',
    description: 'Full day at the office'
  },
  {
    id: 'sun-3',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-06-30',
    type: 'family',
    location: 'Home',
    description: 'Family dinner time'
  },

  // Monday, July 1
  {
    id: 'mon-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-07-01',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'mon-2',
    title: 'Work from Home',
    time: '9:30 AM',
    duration: '8 hours',
    date: '2024-07-01',
    type: 'work',
    location: 'Home Office',
    description: 'Working from home today'
  },
  {
    id: 'mon-3',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-07-01',
    type: 'family',
    location: 'Home',
    description: 'Family dinner time'
  },

  // Tuesday, July 2
  {
    id: 'tue-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-07-02',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'tue-2',
    title: 'Onsite',
    time: '9:30 AM',
    duration: '8 hours',
    date: '2024-07-02',
    type: 'work',
    location: 'Office',
    description: 'Full day at the office'
  },
  {
    id: 'tue-3',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-07-02',
    type: 'family',
    location: 'Home',
    description: 'Family dinner time'
  },

  // Wednesday, July 3
  {
    id: 'wed-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-07-03',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'wed-2',
    title: 'Work from Home',
    time: '10:00 AM',
    duration: '8 hours',
    date: '2024-07-03',
    type: 'work',
    location: 'Home Office',
    description: 'Working from home today'
  },
  {
    id: 'wed-3',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-07-03',
    type: 'family',
    location: 'Home',
    description: 'Family dinner time'
  },

  // Thursday, July 4 (Independence Day)
  {
    id: 'thu-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-07-04',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'thu-2',
    title: 'Onsite',
    time: '10:00 AM',
    duration: '7 hours',
    date: '2024-07-04',
    type: 'work',
    location: 'Office',
    description: 'Shorter work day for Independence Day'
  },
  {
    id: 'thu-3',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-07-04',
    type: 'family',
    location: 'Home',
    description: 'Independence Day family dinner'
  },

  // Friday, July 5
  {
    id: 'fri-1',
    title: 'Wake kids up/breakfast',
    time: '7:30 AM',
    duration: '60 min',
    date: '2024-07-05',
    type: 'family',
    location: 'Home',
    description: 'Morning routine with kids - breakfast and getting ready'
  },
  {
    id: 'fri-2',
    title: 'Family Dinner',
    time: '7:00 PM',
    duration: '60 min',
    date: '2024-07-05',
    type: 'family',
    location: 'Home',
    description: 'Family dinner time'
  }
];