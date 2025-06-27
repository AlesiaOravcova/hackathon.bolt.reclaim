import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from '../../components/StatusBar';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface OnboardingStep1Props {
  navigation: any;
}

export const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ navigation }) => {
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
      navigation.navigate('OnboardingStep2');
    }
  };

  return (
    <LinearGradient colors={['#F1F6FE', '#F3FDF5']} style={styles.container}>
      <StatusBar />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
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
              <TouchableOpacity
                key={index}
                onPress={() => toggleCalendar(calendar)}
                style={[
                  styles.optionButton,
                  selectedCalendars.includes(calendar) && styles.selectedOption,
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.checkbox,
                      selectedCalendars.includes(calendar) && styles.checkedBox,
                    ]}
                  >
                    {selectedCalendars.includes(calendar) && (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.optionText}>{calendar}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomSection}>
        <Button
          onPress={handleNext}
          disabled={selectedCalendars.length === 0}
          style={[
            styles.continueButton,
            selectedCalendars.length === 0 && styles.disabledButton,
          ]}
        >
          Continue
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: '500',
    fontSize: 16,
  },
  stepText: {
    fontSize: 17,
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
    backgroundColor: '#F3FDF5',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  question: {
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 40,
    lineHeight: 28,
    letterSpacing: -0.45,
  },
  optionsList: {
    gap: 24,
  },
  optionButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  bottomSection: {
    padding: 24,
    paddingBottom: 32,
  },
  continueButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  disabledButton: {
    opacity: 0.3,
  },
});