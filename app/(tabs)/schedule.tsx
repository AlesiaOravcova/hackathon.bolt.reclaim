import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Plus, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });

  const scheduleData = [
    { time: "8:00 AM", title: "Morning Meditation", duration: "15 min", completed: true, type: "mindfulness" },
    { time: "9:30 AM", title: "Gratitude Journal", duration: "10 min", completed: true, type: "mindfulness" },
    { time: "12:30 PM", title: "Mindful Lunch Break", duration: "20 min", completed: false, type: "mindfulness" },
    { time: "3:00 PM", title: "Breathing Exercise", duration: "10 min", completed: false, type: "mindfulness" },
    { time: "5:30 PM", title: "Evening Walk", duration: "25 min", completed: false, type: "exercise" },
    { time: "8:00 PM", title: "Yoga Session", duration: "30 min", completed: false, type: "exercise" },
  ];

  const completedCount = scheduleData.filter(item => item.completed).length;

  return (
    <LinearGradient colors={['#F1F6FE', '#F3FDF5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Pressable
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <ArrowLeft size={24} color="#1F2937" />
              </Pressable>
              <Text style={styles.headerTitle}>Schedule</Text>
              <Pressable style={styles.addButton}>
                <Plus size={24} color="#2563EB" />
              </Pressable>
            </View>

            {/* Week Calendar */}
            <View style={styles.weekSection}>
              <Text style={styles.weekTitle}>This Week</Text>
              <View style={styles.weekCalendar}>
                {currentWeek.map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <Pressable
                      key={index}
                      onPress={() => setSelectedDate(date)}
                      style={[
                        styles.dayButton,
                        isSelected && styles.selectedDay,
                        isToday && !isSelected && styles.todayDay
                      ]}
                    >
                      <Text style={[
                        styles.dayLabel,
                        isSelected && styles.selectedDayLabel,
                        isToday && !isSelected && styles.todayDayLabel
                      ]}>
                        {weekDays[index]}
                      </Text>
                      <Text style={[
                        styles.dayNumber,
                        isSelected && styles.selectedDayNumber,
                        isToday && !isSelected && styles.todayDayNumber
                      ]}>
                        {date.getDate()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Schedule List */}
          <View style={styles.scheduleSection}>
            <View style={styles.scheduleSectionHeader}>
              <Text style={styles.scheduleTitle}>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <Text style={styles.progressText}>
                {completedCount} of {scheduleData.length} completed
              </Text>
            </View>

            <View style={styles.scheduleList}>
              {scheduleData.map((item, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <View style={styles.scheduleItemContent}>
                    <View style={styles.scheduleItemLeft}>
                      <View style={[
                        styles.activityIcon,
                        {
                          backgroundColor: item.type === 'mindfulness' ? '#EDE9FE' : '#DCFCE7',
                        },
                      ]}>
                        <Text style={styles.activityEmoji}>
                          {item.type === 'mindfulness' ? '🧘' : '🏃'}
                        </Text>
                      </View>
                      <View style={styles.scheduleItemDetails}>
                        <Text style={styles.scheduleItemTitle}>{item.title}</Text>
                        <Text style={styles.scheduleItemTime}>
                          {item.time} • {item.duration}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.scheduleItemRight}>
                      {item.completed ? (
                        <View style={styles.completedContainer}>
                          <CheckCircle size={24} color="#10B981" />
                          <Text style={styles.completedLabel}>Done</Text>
                        </View>
                      ) : (
                        <Pressable style={styles.startButton}>
                          <Text style={styles.startButtonText}>Start</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Add Activity Button */}
            <View style={styles.addActivitySection}>
              <Pressable style={styles.addActivityButton}>
                <LinearGradient
                  colors={['#3B82F6', '#8B5CF6']}
                  style={styles.addActivityGradient}
                >
                  <Plus size={24} color="#FFFFFF" />
                  <Text style={styles.addActivityText}>Schedule New Activity</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekSection: {
    marginBottom: 8,
  },
  weekTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  weekCalendar: {
    flexDirection: 'row',
    gap: 8,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#2563EB',
  },
  todayDay: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  selectedDayLabel: {
    color: '#BFDBFE',
  },
  todayDayLabel: {
    color: '#2563EB',
  },
  dayNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  selectedDayNumber: {
    color: '#FFFFFF',
  },
  todayDayNumber: {
    color: '#2563EB',
  },
  scheduleSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 100,
  },
  scheduleSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  scheduleList: {
    gap: 16,
  },
  scheduleItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scheduleItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityEmoji: {
    fontSize: 20,
  },
  scheduleItemDetails: {
    flex: 1,
  },
  scheduleItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  scheduleItemTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  scheduleItemRight: {
    alignItems: 'center',
  },
  completedContainer: {
    alignItems: 'center',
    gap: 4,
  },
  completedLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  startButton: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  addActivitySection: {
    marginTop: 24,
  },
  addActivityButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addActivityGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  addActivityText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});