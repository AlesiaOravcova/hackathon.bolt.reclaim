import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface WellnessActivity {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: 'mindfulness' | 'exercise' | 'creative' | 'social' | 'rest' | 'learning';
  duration: number; // in minutes
  scheduledTime?: Date;
  completedAt?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WellnessGoal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetValue: number;
  currentValue: number;
  unit: string; // 'minutes', 'sessions', 'days', etc.
  category: WellnessActivity['category'];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivitySession {
  id: string;
  userId: string;
  activityId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  notes?: string;
  mood?: 'excellent' | 'good' | 'neutral' | 'poor' | 'terrible';
  createdAt: Date;
}

class FirebaseDatabaseService {
  // Activities CRUD operations
  async createActivity(userId: string, activity: Omit<WellnessActivity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'activities'), {
        ...activity,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  async getActivities(userId: string): Promise<WellnessActivity[]> {
    try {
      const q = query(
        collection(db, 'activities'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        scheduledTime: doc.data().scheduledTime?.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as WellnessActivity[];
    } catch (error) {
      console.error('Error getting activities:', error);
      throw error;
    }
  }

  async updateActivity(activityId: string, updates: Partial<WellnessActivity>): Promise<void> {
    try {
      await updateDoc(doc(db, 'activities', activityId), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating activity:', error);
      throw error;
    }
  }

  async deleteActivity(activityId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'activities', activityId));
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  }

  async completeActivity(activityId: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'activities', activityId), {
        isCompleted: true,
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error completing activity:', error);
      throw error;
    }
  }

  // Goals CRUD operations
  async createGoal(userId: string, goal: Omit<WellnessGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'goals'), {
        ...goal,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  }

  async getGoals(userId: string): Promise<WellnessGoal[]> {
    try {
      const q = query(
        collection(db, 'goals'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate(),
        endDate: doc.data().endDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as WellnessGoal[];
    } catch (error) {
      console.error('Error getting goals:', error);
      throw error;
    }
  }

  async updateGoal(goalId: string, updates: Partial<WellnessGoal>): Promise<void> {
    try {
      await updateDoc(doc(db, 'goals', goalId), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  async deleteGoal(goalId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'goals', goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }

  // Activity Sessions
  async createSession(userId: string, session: Omit<ActivitySession, 'id' | 'userId' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'sessions'), {
        ...session,
        userId,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  async getSessions(userId: string, limit?: number): Promise<ActivitySession[]> {
    try {
      let q = query(
        collection(db, 'sessions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      if (limit) {
        q = query(q, limit(limit));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startTime: doc.data().startTime?.toDate(),
        endTime: doc.data().endTime?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as ActivitySession[];
    } catch (error) {
      console.error('Error getting sessions:', error);
      throw error;
    }
  }

  async updateSession(sessionId: string, updates: Partial<ActivitySession>): Promise<void> {
    try {
      await updateDoc(doc(db, 'sessions', sessionId), updates);
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  }

  // Real-time listeners
  onActivitiesChange(userId: string, callback: (activities: WellnessActivity[]) => void): () => void {
    const q = query(
      collection(db, 'activities'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        scheduledTime: doc.data().scheduledTime?.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as WellnessActivity[];
      
      callback(activities);
    });
  }

  onGoalsChange(userId: string, callback: (goals: WellnessGoal[]) => void): () => void {
    const q = query(
      collection(db, 'goals'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const goals = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate(),
        endDate: doc.data().endDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as WellnessGoal[];
      
      callback(goals);
    });
  }

  // Analytics and stats
  async getUserStats(userId: string, days: number = 30): Promise<{
    totalActivities: number;
    completedActivities: number;
    totalMinutes: number;
    averageSessionLength: number;
    streakDays: number;
  }> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const activitiesQuery = query(
        collection(db, 'activities'),
        where('userId', '==', userId),
        where('createdAt', '>=', Timestamp.fromDate(startDate))
      );

      const sessionsQuery = query(
        collection(db, 'sessions'),
        where('userId', '==', userId),
        where('createdAt', '>=', Timestamp.fromDate(startDate))
      );

      const [activitiesSnapshot, sessionsSnapshot] = await Promise.all([
        getDocs(activitiesQuery),
        getDocs(sessionsQuery)
      ]);

      const activities = activitiesSnapshot.docs.map(doc => doc.data());
      const sessions = sessionsSnapshot.docs.map(doc => doc.data());

      const completedActivities = activities.filter(a => a.isCompleted).length;
      const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
      const averageSessionLength = sessions.length > 0 ? totalMinutes / sessions.length : 0;

      // Calculate streak (simplified - you might want a more sophisticated algorithm)
      const streakDays = await this.calculateStreak(userId);

      return {
        totalActivities: activities.length,
        completedActivities,
        totalMinutes,
        averageSessionLength,
        streakDays,
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }

  private async calculateStreak(userId: string): Promise<number> {
    // This is a simplified streak calculation
    // You might want to implement a more sophisticated algorithm
    try {
      const today = new Date();
      let streak = 0;
      let currentDate = new Date(today);

      for (let i = 0; i < 365; i++) { // Check up to a year
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);

        const q = query(
          collection(db, 'activities'),
          where('userId', '==', userId),
          where('isCompleted', '==', true),
          where('completedAt', '>=', Timestamp.fromDate(startOfDay)),
          where('completedAt', '<=', Timestamp.fromDate(endOfDay))
        );

        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          break; // Streak broken
        }

        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }

      return streak;
    } catch (error) {
      console.error('Error calculating streak:', error);
      return 0;
    }
  }
}

export const firebaseDatabaseService = new FirebaseDatabaseService();