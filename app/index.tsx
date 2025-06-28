import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding');
    }, 1000);
  };

  const handleSignIn = () => {
    router.push('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#F1F6FE', '#F3FDF5']}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header section */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Reclaim your{'\n'}
              <Text style={styles.titleAccent}>me time</Text>
            </Text>
            <Text style={styles.subtitle}>
              AI assistant that intelligently schedules time for your personal wellbeing and self-care.
            </Text>
          </View>

          {/* Illustration section */}
          <View style={styles.illustrationContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.illustration}
              resizeMode="cover"
            />
            <View style={styles.floatingCard1}>
              <Text style={styles.cardText}>🧘 Meditation</Text>
            </View>
            <View style={styles.floatingCard2}>
              <Text style={styles.cardText}>🚶 Walk</Text>
            </View>
          </View>

          {/* Authentication section */}
          <View style={styles.authSection}>
            <Pressable
              onPress={handleGetStarted}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Getting started...' : 'Get Started'}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSignIn}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                Already have an account? Sign in
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    lineHeight: 44,
    marginBottom: 16,
  },
  titleAccent: {
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 26,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    position: 'relative',
  },
  illustration: {
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  floatingCard1: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingCard2: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  authSection: {
    gap: 16,
    paddingBottom: 20,
  },
  primaryButton: {
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});