import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from '../../components/StatusBar';
import { Button } from '../../components/ui/Button';
import { GoogleIcon } from '../../components/icons';

interface WelcomeProps {
  navigation: any;
}

export const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('OnboardingStep1');
    }, 1500);
  };

  const handleSignIn = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <LinearGradient
      colors={['#F1F6FE', '#F3FDF5']}
      style={styles.container}
    >
      <StatusBar />
      
      <View style={styles.content}>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Reclaim your{'\n'}
            <Text style={styles.titleGradient}>me time</Text>
          </Text>
          <Text style={styles.subtitle}>
            AI assistant that intelligently schedules time for your personal wellbeing and self-care.
          </Text>
        </View>

        {/* Illustration section */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            {/* Floating elements would be implemented with Animated.View */}
            <Image 
              source={require('../../../assets/welcome_bg_img.png')} 
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Authentication section */}
        <View style={styles.authSection}>
          <Button
            onPress={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            style={styles.googleButton}
          >
            <View style={styles.googleButtonContent}>
              <GoogleIcon />
              <Text style={styles.googleButtonText}>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Text>
            </View>
          </Button>

          <Button
            onPress={handleSignIn}
            variant="ghost"
            style={styles.signInButton}
          >
            <Text style={styles.signInText}>
              Already have an account? Sign in
            </Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 40,
    marginBottom: 16,
  },
  titleGradient: {
    color: '#2563EB', // Simplified gradient color
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 320,
  },
  illustration: {
    width: 320,
    height: 320,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  authSection: {
    gap: 12,
    paddingBottom: 8,
  },
  googleButton: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  signInButton: {
    paddingVertical: 4,
  },
  signInText: {
    color: '#2563EB',
    fontWeight: '500',
    textAlign: 'center',
  },
});