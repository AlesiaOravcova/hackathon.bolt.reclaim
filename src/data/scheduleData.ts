export interface ScheduleActivity {
  id: string;
  time: string;
  title: string;
  duration: string;
  type: 'work' | 'family' | 'personal' | 'wellness' | 'school';
  completed: boolean;
  date: string;
  description?: string;
  location?: string;
  priority: 'high' | 'medium' | 'low';
}

// Gabie's schedule from June 29th to July 5th, 2024
export const gabieSchedule: ScheduleActivity[] = [
  // SATURDAY, JUNE 29TH
  {
    id: 'sat-1',
    date: '2024-06-29',
    time: '7:00 AM',
    title: 'Morning Meditation',
    duration: '15 min',
    type: 'wellness',
    completed: true,
    description: 'Quiet mindfulness practice before the family wakes up',
    priority: 'high'
  },
  {
    id: 'sat-2',
    date: '2024-06-29',
    time: '8:00 AM',
    title: 'Family Breakfast',
    duration: '45 min',
    type: 'family',
    completed: true,
    description: 'Weekend pancakes with the kids',
    priority: 'high'
  },
  {
    id: 'sat-3',
    date: '2024-06-29',
    time: '9:30 AM',
    title: 'Kids Soccer Practice',
    duration: '2 hours',
    type: 'family',
    completed: true,
    location: 'Community Sports Center',
    description: 'Drive kids to practice, watch and support',
    priority: 'high'
  },
  {
    id: 'sat-4',
    date: '2024-06-29',
    time: '12:00 PM',
    title: 'Grocery Shopping',
    duration: '1 hour',
    type: 'family',
    completed: true,
    description: 'Weekly grocery run with meal planning',
    priority: 'medium'
  },
  {
    id: 'sat-5',
    date: '2024-06-29',
    time: '2:00 PM',
    title: 'Reading Time',
    duration: '30 min',
    type: 'wellness',
    completed: false,
    description: 'Personal reading while kids have quiet time',
    priority: 'medium'
  },
  {
    id: 'sat-6',
    date: '2024-06-29',
    time: '4:00 PM',
    title: 'Family Movie Time',
    duration: '2 hours',
    type: 'family',
    completed: false,
    description: 'Weekend family bonding activity',
    priority: 'medium'
  },
  {
    id: 'sat-7',
    date: '2024-06-29',
    time: '7:30 PM',
    title: 'Evening Yoga',
    duration: '20 min',
    type: 'wellness',
    completed: false,
    description: 'Gentle stretching and relaxation',
    priority: 'medium'
  },

  // SUNDAY, JUNE 30TH
  {
    id: 'sun-1',
    date: '2024-06-30',
    time: '7:30 AM',
    title: 'Morning Walk',
    duration: '25 min',
    type: 'wellness',
    completed: false,
    description: 'Solo walk around the neighborhood',
    priority: 'high'
  },
  {
    id: 'sun-2',
    date: '2024-06-30',
    time: '9:00 AM',
    title: 'Family Brunch Prep',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Cooking together as a family',
    priority: 'medium'
  },
  {
    id: 'sun-3',
    date: '2024-06-30',
    time: '11:00 AM',
    title: 'Meal Prep Sunday',
    duration: '2 hours',
    type: 'personal',
    completed: false,
    description: 'Prepare meals for the upcoming week',
    priority: 'high'
  },
  {
    id: 'sun-4',
    date: '2024-06-30',
    time: '2:00 PM',
    title: 'Kids Study Time',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Help kids with summer reading assignments',
    priority: 'medium'
  },
  {
    id: 'sun-5',
    date: '2024-06-30',
    time: '3:30 PM',
    title: 'Journaling',
    duration: '20 min',
    type: 'wellness',
    completed: false,
    description: 'Reflect on the week and set intentions',
    priority: 'medium'
  },
  {
    id: 'sun-6',
    date: '2024-06-30',
    time: '5:00 PM',
    title: 'Family Dinner Prep',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Sunday family dinner preparation',
    priority: 'medium'
  },

  // MONDAY, JULY 1ST
  {
    id: 'mon-1',
    date: '2024-07-01',
    time: '6:30 AM',
    title: 'Morning Meditation',
    duration: '10 min',
    type: 'wellness',
    completed: false,
    description: 'Start the work week with mindfulness',
    priority: 'high'
  },
  {
    id: 'mon-2',
    date: '2024-07-01',
    time: '7:00 AM',
    title: 'Family Breakfast',
    duration: '30 min',
    type: 'family',
    completed: false,
    description: 'Quick breakfast before school prep',
    priority: 'high'
  },
  {
    id: 'mon-3',
    date: '2024-07-01',
    time: '8:00 AM',
    title: 'Drop Kids at Summer Camp',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    description: 'Morning drop-off routine',
    priority: 'high'
  },
  {
    id: 'mon-4',
    date: '2024-07-01',
    time: '9:00 AM',
    title: 'Team Meeting',
    duration: '1 hour',
    type: 'work',
    completed: false,
    location: 'Office Conference Room',
    description: 'Weekly team sync and project updates',
    priority: 'high'
  },
  {
    id: 'mon-5',
    date: '2024-07-01',
    time: '12:30 PM',
    title: 'Mindful Lunch Break',
    duration: '30 min',
    type: 'wellness',
    completed: false,
    description: 'Eat lunch away from desk, practice gratitude',
    priority: 'medium'
  },
  {
    id: 'mon-6',
    date: '2024-07-01',
    time: '3:00 PM',
    title: 'Breathing Exercise',
    duration: '5 min',
    type: 'wellness',
    completed: false,
    description: 'Quick stress relief between meetings',
    priority: 'medium'
  },
  {
    id: 'mon-7',
    date: '2024-07-01',
    time: '5:00 PM',
    title: 'Pick Up Kids',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    description: 'Evening pickup from summer camp',
    priority: 'high'
  },
  {
    id: 'mon-8',
    date: '2024-07-01',
    time: '7:00 PM',
    title: 'Family Dinner',
    duration: '45 min',
    type: 'family',
    completed: false,
    description: 'Share daily highlights over dinner',
    priority: 'high'
  },
  {
    id: 'mon-9',
    date: '2024-07-01',
    time: '8:30 PM',
    title: 'Evening Bath',
    duration: '20 min',
    type: 'wellness',
    completed: false,
    description: 'Relaxing bath with essential oils',
    priority: 'medium'
  },

  // TUESDAY, JULY 2ND
  {
    id: 'tue-1',
    date: '2024-07-02',
    time: '6:45 AM',
    title: 'Morning Stretches',
    duration: '15 min',
    type: 'wellness',
    completed: false,
    description: 'Gentle yoga stretches to start the day',
    priority: 'medium'
  },
  {
    id: 'tue-2',
    date: '2024-07-02',
    time: '8:00 AM',
    title: 'Drop Kids at Summer Camp',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    priority: 'high'
  },
  {
    id: 'tue-3',
    date: '2024-07-02',
    time: '10:00 AM',
    title: 'Client Presentation',
    duration: '2 hours',
    type: 'work',
    completed: false,
    location: 'Office',
    description: 'Important quarterly review presentation',
    priority: 'high'
  },
  {
    id: 'tue-4',
    date: '2024-07-02',
    time: '12:00 PM',
    title: 'Walking Meeting',
    duration: '30 min',
    type: 'work',
    completed: false,
    description: 'One-on-one with colleague while walking',
    priority: 'medium'
  },
  {
    id: 'tue-5',
    date: '2024-07-02',
    time: '2:30 PM',
    title: 'Gratitude Practice',
    duration: '10 min',
    type: 'wellness',
    completed: false,
    description: 'Write down three things I\'m grateful for',
    priority: 'medium'
  },
  {
    id: 'tue-6',
    date: '2024-07-02',
    time: '5:00 PM',
    title: 'Pick Up Kids',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    priority: 'high'
  },
  {
    id: 'tue-7',
    date: '2024-07-02',
    time: '6:30 PM',
    title: 'Kids Activities',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Help with homework and play time',
    priority: 'high'
  },
  {
    id: 'tue-8',
    date: '2024-07-02',
    time: '8:00 PM',
    title: 'Tea & Reading',
    duration: '25 min',
    type: 'wellness',
    completed: false,
    description: 'Herbal tea and personal reading time',
    priority: 'medium'
  },

  // WEDNESDAY, JULY 3RD
  {
    id: 'wed-1',
    date: '2024-07-03',
    time: '6:30 AM',
    title: 'Morning Meditation',
    duration: '15 min',
    type: 'wellness',
    completed: false,
    description: 'Midweek mindfulness reset',
    priority: 'high'
  },
  {
    id: 'wed-2',
    date: '2024-07-03',
    time: '8:00 AM',
    title: 'Drop Kids at Summer Camp',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    priority: 'high'
  },
  {
    id: 'wed-3',
    date: '2024-07-03',
    time: '9:30 AM',
    title: 'Project Work',
    duration: '3 hours',
    type: 'work',
    completed: false,
    description: 'Deep focus time on quarterly project',
    priority: 'high'
  },
  {
    id: 'wed-4',
    date: '2024-07-03',
    time: '12:30 PM',
    title: 'Lunch with Colleague',
    duration: '1 hour',
    type: 'work',
    completed: false,
    location: 'Local Café',
    description: 'Networking lunch meeting',
    priority: 'medium'
  },
  {
    id: 'wed-5',
    date: '2024-07-03',
    time: '3:00 PM',
    title: 'Desk Yoga',
    duration: '10 min',
    type: 'wellness',
    completed: false,
    description: 'Quick stretches at desk to relieve tension',
    priority: 'medium'
  },
  {
    id: 'wed-6',
    date: '2024-07-03',
    time: '5:00 PM',
    title: 'Pick Up Kids',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    priority: 'high'
  },
  {
    id: 'wed-7',
    date: '2024-07-03',
    time: '6:00 PM',
    title: 'Family Bike Ride',
    duration: '45 min',
    type: 'family',
    completed: false,
    description: 'Evening family exercise activity',
    priority: 'medium'
  },
  {
    id: 'wed-8',
    date: '2024-07-03',
    time: '8:30 PM',
    title: 'Skincare Routine',
    duration: '15 min',
    type: 'wellness',
    completed: false,
    description: 'Self-care evening routine',
    priority: 'low'
  },

  // THURSDAY, JULY 4TH (Independence Day)
  {
    id: 'thu-1',
    date: '2024-07-04',
    time: '8:00 AM',
    title: 'Holiday Morning Yoga',
    duration: '20 min',
    type: 'wellness',
    completed: false,
    description: 'Extended morning practice for the holiday',
    priority: 'medium'
  },
  {
    id: 'thu-2',
    date: '2024-07-04',
    time: '9:00 AM',
    title: 'Special Holiday Breakfast',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Red, white, and blue pancakes with the family',
    priority: 'medium'
  },
  {
    id: 'thu-3',
    date: '2024-07-04',
    time: '11:00 AM',
    title: 'Community Parade',
    duration: '2 hours',
    type: 'family',
    completed: false,
    location: 'Downtown Main Street',
    description: 'Watch the 4th of July parade with kids',
    priority: 'high'
  },
  {
    id: 'thu-4',
    date: '2024-07-04',
    time: '2:00 PM',
    title: 'BBQ Prep',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Prepare for backyard BBQ with friends',
    priority: 'medium'
  },
  {
    id: 'thu-5',
    date: '2024-07-04',
    time: '4:00 PM',
    title: 'Mindful Moment',
    duration: '10 min',
    type: 'wellness',
    completed: false,
    description: 'Quiet reflection during busy holiday',
    priority: 'medium'
  },
  {
    id: 'thu-6',
    date: '2024-07-04',
    time: '5:00 PM',
    title: 'Family BBQ',
    duration: '3 hours',
    type: 'family',
    completed: false,
    description: 'Host friends and family for holiday celebration',
    priority: 'high'
  },
  {
    id: 'thu-7',
    date: '2024-07-04',
    time: '9:00 PM',
    title: 'Fireworks Viewing',
    duration: '1 hour',
    type: 'family',
    completed: false,
    location: 'Local Park',
    description: 'Watch fireworks with the family',
    priority: 'high'
  },

  // FRIDAY, JULY 5TH
  {
    id: 'fri-1',
    date: '2024-07-05',
    time: '6:45 AM',
    title: 'Morning Walk',
    duration: '20 min',
    type: 'wellness',
    completed: false,
    description: 'Fresh air walk to end the week',
    priority: 'medium'
  },
  {
    id: 'fri-2',
    date: '2024-07-05',
    time: '8:00 AM',
    title: 'Drop Kids at Summer Camp',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    priority: 'high'
  },
  {
    id: 'fri-3',
    date: '2024-07-05',
    time: '9:00 AM',
    title: 'Week Wrap-up Meeting',
    duration: '1 hour',
    type: 'work',
    completed: false,
    description: 'Review week\'s accomplishments with team',
    priority: 'high'
  },
  {
    id: 'fri-4',
    date: '2024-07-05',
    time: '11:00 AM',
    title: 'Project Planning',
    duration: '2 hours',
    type: 'work',
    completed: false,
    description: 'Plan next week\'s priorities',
    priority: 'medium'
  },
  {
    id: 'fri-5',
    date: '2024-07-05',
    time: '1:00 PM',
    title: 'Lunch & Podcast',
    duration: '30 min',
    type: 'wellness',
    completed: false,
    description: 'Listen to wellness podcast during lunch',
    priority: 'medium'
  },
  {
    id: 'fri-6',
    date: '2024-07-05',
    time: '3:30 PM',
    title: 'Weekly Reflection',
    duration: '15 min',
    type: 'wellness',
    completed: false,
    description: 'Journal about the week\'s wins and challenges',
    priority: 'medium'
  },
  {
    id: 'fri-7',
    date: '2024-07-05',
    time: '5:00 PM',
    title: 'Pick Up Kids',
    duration: '30 min',
    type: 'family',
    completed: false,
    location: 'Community Center',
    priority: 'high'
  },
  {
    id: 'fri-8',
    date: '2024-07-05',
    time: '6:30 PM',
    title: 'Family Pizza Night',
    duration: '1 hour',
    type: 'family',
    completed: false,
    description: 'Friday night tradition - homemade pizza',
    priority: 'medium'
  },
  {
    id: 'fri-9',
    date: '2024-07-05',
    time: '8:00 PM',
    title: 'Evening Bath & Book',
    duration: '30 min',
    type: 'wellness',
    completed: false,
    description: 'End the week with relaxation',
    priority: 'medium'
  }
];

// Helper function to get activities for a specific date
export const getActivitiesForDate = (date: string): ScheduleActivity[] => {
  return gabieSchedule.filter(activity => activity.date === date);
};

// Helper function to get wellness activities
export const getWellnessActivities = (): ScheduleActivity[] => {
  return gabieSchedule.filter(activity => activity.type === 'wellness');
};

// Helper function to get completed activities count
export const getCompletedActivitiesCount = (date?: string): number => {
  const activities = date ? getActivitiesForDate(date) : gabieSchedule;
  return activities.filter(activity => activity.completed).length;
};

// Helper function to get total activities count
export const getTotalActivitiesCount = (date?: string): number => {
  const activities = date ? getActivitiesForDate(date) : gabieSchedule;
  return activities.length;
};