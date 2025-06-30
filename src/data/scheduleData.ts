import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export interface ScheduleActivity {
  id: string;
  time: string;
  title: string;
  duration: string;
  type: 'mindfulness' | 'exercise' | 'nutrition' | 'sleep' | 'social' | 'creative';
  completed: boolean;
  date: string; // YYYY-MM-DD format
  description?: string;
  category: 'morning' | 'afternoon' | 'evening';
}

// Activity templates for generating realistic schedules
const activityTemplates = {
  mindfulness: [
    { title: 'Morning Meditation', duration: '15 min', description: 'Start your day with mindful breathing' },
    { title: 'Breathing Exercise', duration: '10 min', description: 'Deep breathing to reduce stress' },
    { title: 'Gratitude Journal', duration: '10 min', description: 'Write down 3 things you\'re grateful for' },
    { title: 'Mindful Walking', duration: '20 min', description: 'Walk slowly and focus on your surroundings' },
    { title: 'Body Scan Meditation', duration: '25 min', description: 'Progressive relaxation technique' },
    { title: 'Evening Reflection', duration: '15 min', description: 'Reflect on your day mindfully' },
  ],
  exercise: [
    { title: 'Morning Yoga', duration: '30 min', description: 'Gentle yoga flow to energize your body' },
    { title: 'Evening Walk', duration: '25 min', description: 'Peaceful walk around the neighborhood' },
    { title: 'Stretching Session', duration: '15 min', description: 'Full body stretching routine' },
    { title: 'Dance Break', duration: '20 min', description: 'Put on music and dance freely' },
    { title: 'Strength Training', duration: '35 min', description: 'Light bodyweight exercises' },
    { title: 'Pilates Session', duration: '30 min', description: 'Core strengthening and flexibility' },
  ],
  nutrition: [
    { title: 'Mindful Lunch Break', duration: '30 min', description: 'Eat slowly and savor your meal' },
    { title: 'Healthy Smoothie', duration: '10 min', description: 'Prepare a nutritious smoothie' },
    { title: 'Meal Prep Time', duration: '45 min', description: 'Prepare healthy meals for tomorrow' },
    { title: 'Hydration Check', duration: '5 min', description: 'Drink a full glass of water mindfully' },
    { title: 'Tea Ceremony', duration: '15 min', description: 'Enjoy herbal tea with intention' },
  ],
  sleep: [
    { title: 'Wind Down Routine', duration: '20 min', description: 'Prepare your mind and body for sleep' },
    { title: 'Reading Time', duration: '30 min', description: 'Read something calming before bed' },
    { title: 'Sleep Meditation', duration: '15 min', description: 'Guided meditation for better sleep' },
    { title: 'Digital Detox', duration: '60 min', description: 'No screens before bedtime' },
  ],
  social: [
    { title: 'Call a Friend', duration: '20 min', description: 'Connect with someone you care about' },
    { title: 'Family Time', duration: '45 min', description: 'Quality time with loved ones' },
    { title: 'Community Activity', duration: '60 min', description: 'Engage with your local community' },
    { title: 'Video Chat', duration: '30 min', description: 'Virtual coffee with a friend' },
  ],
  creative: [
    { title: 'Creative Writing', duration: '25 min', description: 'Express yourself through writing' },
    { title: 'Art Session', duration: '40 min', description: 'Draw, paint, or create something beautiful' },
    { title: 'Music Time', duration: '30 min', description: 'Play an instrument or listen mindfully' },
    { title: 'Photography Walk', duration: '35 min', description: 'Capture beautiful moments around you' },
    { title: 'Crafting Time', duration: '45 min', description: 'Work on a hands-on creative project' },
  ],
};

// Time slots for different categories
const timeSlots = {
  morning: ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM'],
  afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
  evening: ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'],
};

// Generate a random activity for a given day and category
const generateActivity = (date: Date, category: 'morning' | 'afternoon' | 'evening', id: string): ScheduleActivity => {
  const types = Object.keys(activityTemplates) as Array<keyof typeof activityTemplates>;
  const randomType = types[Math.floor(Math.random() * types.length)];
  const templates = activityTemplates[randomType];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  const times = timeSlots[category];
  const randomTime = times[Math.floor(Math.random() * times.length)];
  
  // Determine if activity is completed (higher chance for past dates)
  const today = new Date();
  const isPast = date < today;
  const isToday = date.toDateString() === today.toDateString();
  
  let completed = false;
  if (isPast) {
    completed = Math.random() > 0.2; // 80% chance completed for past activities
  } else if (isToday) {
    completed = Math.random() > 0.6; // 40% chance completed for today
  }
  // Future activities are never completed

  return {
    id,
    time: randomTime,
    title: randomTemplate.title,
    duration: randomTemplate.duration,
    type: randomType,
    completed,
    date: format(date, 'yyyy-MM-dd'),
    description: randomTemplate.description,
    category,
  };
};

// Generate schedule for the current month
export const generateMonthlySchedule = (): ScheduleActivity[] => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const schedule: ScheduleActivity[] = [];
  let activityId = 1;

  daysInMonth.forEach((date) => {
    // Generate 2-4 activities per day
    const activitiesPerDay = Math.floor(Math.random() * 3) + 2; // 2-4 activities
    const categories: Array<'morning' | 'afternoon' | 'evening'> = ['morning', 'afternoon', 'evening'];
    
    // Shuffle categories and pick random ones
    const shuffledCategories = categories.sort(() => Math.random() - 0.5);
    const selectedCategories = shuffledCategories.slice(0, activitiesPerDay);
    
    selectedCategories.forEach((category) => {
      const activity = generateActivity(date, category, `activity_${activityId}`);
      schedule.push(activity);
      activityId++;
    });
  });

  // Sort by date and time
  return schedule.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    
    // Convert time to 24-hour format for comparison
    const timeA = convertTo24Hour(a.time);
    const timeB = convertTo24Hour(b.time);
    return timeA.localeCompare(timeB);
  });
};

// Helper function to convert 12-hour time to 24-hour format for sorting
const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  return `${hours.padStart(2, '0')}:${minutes}`;
};

// Get activities for a specific date
export const getActivitiesForDate = (schedule: ScheduleActivity[], date: Date): ScheduleActivity[] => {
  const dateString = format(date, 'yyyy-MM-dd');
  return schedule.filter(activity => activity.date === dateString);
};

// Get activities for today
export const getTodaysActivities = (schedule: ScheduleActivity[]): ScheduleActivity[] => {
  return getActivitiesForDate(schedule, new Date());
};

// Get upcoming activities (next 7 days)
export const getUpcomingActivities = (schedule: ScheduleActivity[]): ScheduleActivity[] => {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  return schedule.filter(activity => {
    const activityDate = new Date(activity.date);
    return activityDate >= today && activityDate <= nextWeek;
  });
};

// Get completion stats for the current week
export const getWeeklyStats = (schedule: ScheduleActivity[]) => {
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date;
  });

  return weekDays.map((date) => {
    const dayActivities = getActivitiesForDate(schedule, date);
    const completed = dayActivities.filter(activity => activity.completed).length;
    const total = dayActivities.length;
    
    return {
      day: format(date, 'EEE'),
      completed,
      total,
      date: format(date, 'yyyy-MM-dd'),
    };
  });
};

// Generate the schedule data
export const monthlySchedule = generateMonthlySchedule();