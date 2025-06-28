import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInDown, SlideOutUp } from 'react-native-reanimated';

export default function OnboardingStep4() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const options = [
    "Everyday (Mon-Sun)",
    "Every weekday (Mon-Fri)",
    "I'd like to choose",
    "I don't want gentle reminders for now"
  ];

  const days = [
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
    { short: 'Sat', full: 'Saturday' },
    { short: 'Sun', full: 'Sunday' },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option !== "I'd like to choose") {
      setSelectedDays([]);
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleComplete = () => {
    if (selectedOption && (selectedOption !== "I'd like to choose" || selectedDays.length > 0)) {
      router.push('/(tabs)');
    }
  };

  const isNextEnabled = () => {
    if (!selectedOption) return false;
    if (selectedOption === "I'd like to choose") {
      return selectedDays.length > 0;
    }
    return true;
  };

  return (
    <LinearGradient colors={['#F1F6FE', '#F3FDF5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View entering={FadeIn} style={styles.header}>
            <View style={styles.headerContent}>
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Text style={styles.backText}>← Back</Text>
              </Pressable>
              <Text style={styles.stepText}>Final step</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, styles.activeProgress]} />
              <View style={[styles.progressBar, styles.activeProgress]} />
              <View style={[styles.progressBar, styles.activeProgress]} />
              <View style={[styles.progressBar, styles.activeProgress]} />
            </View>
          </Animated.View>

          {/* Question */}
          <Animated.View entering={FadeIn.delay(100)} style={styles.content}>
            <Text style={styles.question}>
              When would you like gentle reminders when we find time for you?
            </Text>

            <View style={styles.optionsList}>
              {options.map((option, index) => (
                <View key={index}>
                  <Animated.View entering={FadeIn.delay(100 * index)}>
                    <Pressable
                      onPress={() => handleOptionSelect(option)}
                      style={({ pressed }) => [
                        styles.optionButton,
                        selectedOption === option && styles.selectedOption,
                        pressed && styles.optionPressed
                      ]}
                    >
                      <View style={styles.optionContent}>
                        <View style={[
                          styles.radioButton,
                          selectedOption === option && styles.selectedRadio
                        ]}>
                          {selectedOption === option && (
                            <View style={styles.radioDot} />
                          )}
                        </View>
                        <Text style={styles.optionText}>{option}</Text>
                      </View>
                    </Pressable>
                  </Animated.View>

                  {/* Day Selector */}
                  {selectedOption === option && option === "I'd like to choose" && (
                    <Animated.View
                      entering={SlideInDown}
                      exiting={SlideOutUp}
                      style={styles.daySelector}
                    >
                      <Text style={styles.daySelectorTitle}>Select days:</Text>
                      <View style={styles.daysGrid}>
                        {days.map((day) => (
                          <Pressable
                            key={day.short}
                            onPress={() => toggleDay(day.short)}
                            style={[
                              styles.dayButton,
                              selectedDays.includes(day.short) && styles.selectedDay
                            ]}
                          >
                            <Text style={[
                              styles.dayText,
                              selectedDays.includes(day.short) && styles.selectedDayText
                            ]}>
                              {day.short}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </Animated.View>
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Bottom button */}
        <View style={styles.bottomSection}>
          <Pressable
            onPress={handleComplete}
            disabled={!isNextEnabled()}
            style={({ pressed }) => [
              styles.continueButton,
              !isNextEnabled() && styles.disabledButton,
              pressed && isNextEnabled() && styles.buttonPressed
            ]}
          >
            <Text style={styles.continueButtonText}>All done!</Text>
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
    minHeight: 64,
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
    paddingVertical: 16,
    gap: 16,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#2563EB',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  optionText: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
    lineHeight: 24,
  },
  daySelector: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
  daySelectorTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  selectedDayText: {
    color: '#FFFFFF',
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