import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuthService, UserProfile } from '../services/firebaseAuth';

export interface UseAuthReturn {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => Promise<void>;
  updateStats: (stats: Partial<UserProfile['stats']>) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(true);
      setError(null);

      if (user) {
        try {
          const profile = await firebaseAuthService.getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
          setError('Failed to load user profile');
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.signUpWithEmail(email, password, displayName);
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.signInWithEmail(email, password);
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.signInWithGoogle();
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseAuthService.signOut();
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setError(null);
    
    try {
      await firebaseAuthService.resetPassword(email);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setError(null);
    
    try {
      await firebaseAuthService.updateUserProfile(user.uid, updates);
      
      // Update local state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const updatePreferences = async (preferences: Partial<UserProfile['preferences']>): Promise<void> => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setError(null);
    
    try {
      await firebaseAuthService.updateUserPreferences(user.uid, preferences);
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          preferences: { ...userProfile.preferences, ...preferences }
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update preferences');
      throw error;
    }
  };

  const updateStats = async (stats: Partial<UserProfile['stats']>): Promise<void> => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setError(null);
    
    try {
      await firebaseAuthService.updateUserStats(user.uid, stats);
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          stats: { ...userProfile.stats, ...stats }
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update stats');
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    updatePreferences,
    updateStats,
  };
};