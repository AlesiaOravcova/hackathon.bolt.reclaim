import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';

export default function OnboardingStep1() {
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  const calendars = ['Work', 'School run', 'Family', 'Events'];

  const toggleCalendar = (calendar: string) => {
    setSelectedCalendars(prev =>
      prev.includes(calendar)
        ? prev.filter(item => item !== calendar)
        : [...prev, calendar]
    );
  };

  const handleNext = () => {
    if (selectedCalendars.length > 0) {
      router.push('/onboarding/step2');
    }
  };

  return (
    <LinearGradient colors={['#F1F6FE', '#F3FDF5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Text style={styles.backText}>← Back</Text>
              </Pressable>
              <Text style={styles.stepText}>Step 1 of 4</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, styles.activeProgress]} />
              <View style={[styles.progressBar, styles.inactiveProgress]} />
              <View style={[styles.progressBar, styles.inactiveProgress]} />
              <View style={[styles.progressBar, styles.inactiveProgress]} />
            </View>
          </View>

          {/* Question */}
          <View style={styles.content}>
            <Text style={styles.question}>
              Which calendars would you like to sync?
            </Text>

            <View style={styles.optionsList}>
              {calendars.map((calendar, index) => (
                <Pressable
                  key={index}
                  onPress={() => toggleCalendar(calendar)}
                  style={({ pressed }) => [
                    styles.optionButton,
                    selectedCalendars.includes(calendar) && styles.selectedOption,
                    pressed && styles.optionPressed
                  ]}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.checkbox,
                        selectedCalendars.includes(calendar) && styles.checkedBox,
                      ]}
                    >
                      {selectedCalendars.includes(calendar) && (
                        <Check size={14} color="#FFFFFF" strokeWidth={3} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{calendar}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom button */}
        <View style={styles.bottomSection}>
          <Pressable
            onPress={handleNext}
            disabled={selectedCalendars.length === 0}
            style={({ pressed }) => [
              styles.continueButton,
              selectedCalendars.length === 0 && styles.disabledButton,
              pressed && !selectedCalendars.length === 0 && styles.buttonPressed
            ]}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: '#2563EB',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  stepText: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    letterSpacing: -0.43,
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 10,
    borderRadius: 5,
  },
  activeProgress: {
    backgroundColor: '#00C7BE',
  },
  inactiveProgress: {
    backgroundColor: '#E5E7EB',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  question: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 40,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  optionsList: {
    gap: 16,
  },
  optionButton: {
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedOption: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionPressed: {
    transform: [{ scale: 0.98 }],
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  bottomSection: {
    padding: 24,
    paddingBottom: 32,
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
});