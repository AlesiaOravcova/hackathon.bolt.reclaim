import { useState, useEffect } from 'react';
import { firebaseDatabaseService, WellnessActivity, WellnessGoal, ActivitySession } from '../services/firebaseDatabase';
import { useAuth } from './useAuth';

export interface UseWellnessDataReturn {
  activities: WellnessActivity[];
  goals: WellnessGoal[];
  sessions: ActivitySession[];
  stats: {
    totalActivities: number;
    completedActivities: number;
    totalMinutes: number;
    averageSessionLength: number;
    streakDays: number;
  } | null;
  loading: boolean;
  error: string | null;
  createActivity: (activity: Omit<WellnessActivity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateActivity: (activityId: string, updates: Partial<WellnessActivity>) => Promise<void>;
  deleteActivity: (activityId: string) => Promise<void>;
  completeActivity: (activityId: string) => Promise<void>;
  createGoal: (goal: Omit<WellnessGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateGoal: (goalId: string, updates: Partial<WellnessGoal>) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  createSession: (session: Omit<ActivitySession, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
  refreshStats: () => Promise<void>;
}

export const useWellnessData = (): UseWellnessDataReturn => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<WellnessActivity[]>([]);
  const [goals, setGoals] = useState<WellnessGoal[]>([]);
  const [sessions, setSessions] = useState<ActivitySession[]>([]);
  const [stats, setStats] = useState<UseWellnessDataReturn['stats']>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data and set up real-time listeners
  useEffect(() => {
    if (!user) {
      setActivities([]);
      setGoals([]);
      setSessions([]);
      setStats(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Set up real-time listeners
    const unsubscribeActivities = firebaseDatabaseService.onActivitiesChange(user.uid, (newActivities) => {
      setActivities(newActivities);
    });

    const unsubscribeGoals = firebaseDatabaseService.onGoalsChange(user.uid, (newGoals) => {
      setGoals(newGoals);
    });

    // Load sessions and stats
    const loadInitialData = async () => {
      try {
        const [sessionsData, statsData] = await Promise.all([
          firebaseDatabaseService.getSessions(user.uid, 50), // Last 50 sessions
          firebaseDatabaseService.getUserStats(user.uid, 30), // Last 30 days
        ]);

        setSessions(sessionsData);
        setStats(statsData);
      } catch (error: any) {
        console.error('Error loading initial data:', error);
        setError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();

    // Cleanup listeners
    return () => {
      unsubscribeActivities();
      unsubscribeGoals();
    };
  }, [user]);

  const createActivity = async (activity: Omit<WellnessActivity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setError(null);
    
    try {
      const activityId = await firebaseDatabaseService.createActivity(user.uid, activity);
      return activityId;
    } catch (error: any) {
      setError(error.message || 'Failed to create activity');
      throw error;
    }
  };

  const updateActivity = async (activityId: string, updates: Partial<WellnessActivity>): Promise<void> => {
    setError(null);
    
    try {
      await firebaseDatabaseService.updateActivity(activityId, updates);
    } catch (error: any) {
      setError(error.message || 'Failed to update activity');
      throw error;
    }
  };

  const deleteActivity = async (activityId: string): Promise<void> => {
    setError(null);
    
    try {
      await firebaseDatabaseService.deleteActivity(activityId);
    } catch (error: any) {
      setError(error.message || 'Failed to delete activity');
      throw error;
    }
  };

  const completeActivity = async (activityId: string): Promise<void> => {
    setError(null);
    
    try {
      await firebaseDatabaseService.completeActivity(activityId);
      
      // Refresh stats after completing an activity
      if (user) {
        const newStats = await firebaseDatabaseService.getUserStats(user.uid, 30);
        setStats(newStats);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to complete activity');
      throw error;
    }
  };

  const createGoal = async (goal: Omit<WellnessGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setError(null);
    
    try {
      const goalId = await firebaseDatabaseService.createGoal(user.uid, goal);
      return goalId;
    } catch (error: any) {
      setError(error.message || 'Failed to create goal');
      throw error;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<WellnessGoal>): Promise<void> => {
    setError(null);
    
    try {
      await firebaseDatabaseService.updateGoal(goalId, updates);
    } catch (error: any) {
      setError(error.message || 'Failed to update goal');
      throw error;
    }
  };

  const deleteGoal = async (goalId: string): Promise<void> => {
    setError(null);
    
    try {
      await firebaseDatabaseService.deleteGoal(goalId);
    } catch (error: any) {
      setError(error.message || 'Failed to delete goal');
      throw error;
    }
  };

  const createSession = async (session: Omit<ActivitySession, 'id' | 'userId' | 'createdAt'>): Promise<string> => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setError(null);
    
    try {
      const sessionId = await firebaseDatabaseService.createSession(user.uid, session);
      
      // Refresh sessions and stats
      const [newSessions, newStats] = await Promise.all([
        firebaseDatabaseService.getSessions(user.uid, 50),
        firebaseDatabaseService.getUserStats(user.uid, 30),
      ]);
      
      setSessions(newSessions);
      setStats(newStats);
      
      return sessionId;
    } catch (error: any) {
      setError(error.message || 'Failed to create session');
      throw error;
    }
  };

  const refreshStats = async (): Promise<void> => {
    if (!user) return;

    setError(null);
    
    try {
      const newStats = await firebaseDatabaseService.getUserStats(user.uid, 30);
      setStats(newStats);
    } catch (error: any) {
      setError(error.message || 'Failed to refresh stats');
      throw error;
    }
  };

  return {
    activities,
    goals,
    sessions,
    stats,
    loading,
    error,
    createActivity,
    updateActivity,
    deleteActivity,
    completeActivity,
    createGoal,
    updateGoal,
    deleteGoal,
    createSession,
    refreshStats,
  };
};