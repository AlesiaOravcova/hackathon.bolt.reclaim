import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutUp } from 'react-native-reanimated';

export default function OnboardingStep2() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");

  const options = [
    "I'm always busy with work",
    "My family needs me all the time",
    "Feeling constantly overwhelmed",
    "Chronic fatigue and exhaustion",
    "I feel a bit lonely",
    "Something else (please specify)"
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption && (selectedOption !== "Something else (please specify)" || customText.trim())) {
      router.push('/onboarding/step3');
    }
  };

  const isNextEnabled = () => {
    if (!selectedOption) return false;
    if (selectedOption === "Something else (please specify)") {
      return customText.trim().length > 0;
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
              <Text style={styles.stepText}>Step 2 of 4</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, styles.activeProgress]} />
              <View style={[styles.progressBar, styles.activeProgress]} />
              <View style={[styles.progressBar, styles.inactiveProgress]} />
              <View style={[styles.progressBar, styles.inactiveProgress]} />
            </View>
          </Animated.View>

          {/* Question */}
          <Animated.View entering={FadeIn.delay(100)} style={styles.content}>
            <Text style={styles.question}>
              What makes it hardest for you to take time for yourself lately?
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

                  {/* Conditional Input Field */}
                  {selectedOption === option && option === "Something else (please specify)" && (
                    <Animated.View
                      entering={SlideInDown}
                      exiting={SlideOutUp}
                      style={styles.inputContainer}
                    >
                      <TextInput
                        placeholder="Please specify..."
                        value={customText}
                        onChangeText={setCustomText}
                        style={styles.textInput}
                        autoFocus
                        multiline
                        numberOfLines={3}
                      />
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
            onPress={handleNext}
            disabled={!isNextEnabled()}
            style={({ pressed }) => [
              styles.continueButton,
              !isNextEnabled() && styles.disabledButton,
              pressed && isNextEnabled() && styles.buttonPressed
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
  inputContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    textAlignVertical: 'top',
    minHeight: 80,
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