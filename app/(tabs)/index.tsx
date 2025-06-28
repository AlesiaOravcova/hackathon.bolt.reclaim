import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Bell, Plus, TrendingUp, Calendar as CalendarIcon } from 'lucide-react-native';

export default function Dashboard() {
  const todayActivities = [
    { time: '9:00 AM', title: 'Morning Meditation', duration: '15 min', type: 'mindfulness', completed: true },
    { time: '12:30 PM', title: 'Lunch Break Walk', duration: '20 min', type: 'exercise', completed: true },
    { time: '3:00 PM', title: 'Breathing Exercise', duration: '10 min', type: 'mindfulness', completed: false },
    { time: '6:00 PM', title: 'Evening Yoga', duration: '30 min', type: 'exercise', completed: false },
  ];

  const weeklyStats = [
    { day: 'Mon', completed: 3, total: 4 },
    { day: 'Tue', completed: 4, total: 4 },
    { day: 'Wed', completed: 2, total: 3 },
    { day: 'Thu', completed: 4, total: 4 },
    { day: 'Fri', completed: 1, total: 4 },
    { day: 'Sat', completed: 0, total: 2 },
    { day: 'Sun', completed: 0, total: 2 },
  ];

  const completedToday = todayActivities.filter(activity => activity.completed).length;
  const totalToday = todayActivities.length;
  const progressPercentage = Math.round((completedToday / totalToday) * 100);

  return (
    <LinearGradient colors={['#F1F6FE', '#F3FDF5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greeting}>Good morning!</Text>
                <Text style={styles.subGreeting}>Ready for your me time?</Text>
              </View>
              <Pressable
                onPress={() => router.push('/profile')}
                style={styles.profileButton}
              >
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.profileImage}
                />
              </Pressable>
            </View>

            {/* Progress Card */}
            <LinearGradient
              colors={['#3B82F6', '#8B5CF6']}
              style={styles.progressCard}
            >
              <View style={styles.progressContent}>
                <View>
                  <Text style={styles.progressTitle}>Today's Progress</Text>
                  <Text style={styles.progressSubtitle}>
                    {completedToday} of {totalToday} activities completed
                  </Text>
                </View>
                <View style={styles.progressStats}>
                  <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
                  <Text style={styles.progressLabel}>Complete</Text>
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
              </View>
            </LinearGradient>
          </View>

          {/* Calendar Integration Card */}
          <View style={styles.section}>
            <LinearGradient
              colors={['#10B981', '#14B8A6']}
              style={styles.calendarCard}
            >
              <View style={styles.calendarContent}>
                <View style={styles.calendarTextContent}>
                  <Text style={styles.calendarTitle}>Connect Your Calendar</Text>
                  <Text style={styles.calendarSubtitle}>
                    Sync with Google Calendar to automatically find time for your wellness activities
                  </Text>
                  <Pressable
                    onPress={() => router.push('/calendar')}
                    style={styles.connectButton}
                  >
                    <Text style={styles.connectButtonText}>Connect Now</Text>
                  </Pressable>
                </View>
                <View style={styles.calendarIcon}>
                  <CalendarIcon size={32} color="#FFFFFF" />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Today's Schedule */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
              <Pressable
                onPress={() => router.push('/schedule')}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllText}>View All</Text>
              </Pressable>
            </View>

            <View style={styles.activitiesList}>
              {todayActivities.slice(0, 3).map((activity, index) => (
                <View key={index} style={styles.activityCard}>
                  <View style={styles.activityContent}>
                    <View
                      style={[
                        styles.activityIcon,
                        {
                          backgroundColor: activity.type === 'mindfulness' ? '#EDE9FE' : '#DCFCE7',
                        },
                      ]}
                    >
                      <Text style={styles.activityEmoji}>
                        {activity.type === 'mindfulness' ? '🧘' : '🏃'}
                      </Text>
                    </View>
                    <View style={styles.activityDetails}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activityTime}>
                        {activity.time} • {activity.duration}
                      </Text>
                    </View>
                  </View>
                  {activity.completed ? (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  ) : (
                    <Pressable style={styles.startButton}>
                      <Text style={styles.startButtonText}>Start</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Weekly Overview */}
          <View style={[styles.section, styles.lastSection]}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <View style={styles.weeklyCard}>
              <View style={styles.weeklyStats}>
                {weeklyStats.map((stat, index) => (
                  <View key={stat.day} style={styles.statItem}>
                    <Text style={styles.statDay}>{stat.day}</Text>
                    <View style={styles.statBar}>
                      <View
                        style={[
                          styles.statProgress,
                          { height: `${Math.max((stat.completed / stat.total) * 100, 10)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.statNumbers}>
                      {stat.completed}/{stat.total}
                    </Text>
                  </View>
                ))}
              </View>
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
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  progressCard: {
    borderRadius: 20,
    padding: 24,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  progressSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
    marginTop: 4,
  },
  progressStats: {
    alignItems: 'flex-end',
  },
  progressPercentage: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  lastSection: {
    paddingBottom: 100,
  },
  calendarCard: {
    borderRadius: 20,
    padding: 24,
  },
  calendarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarTextContent: {
    flex: 1,
  },
  calendarTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  calendarSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#A7F3D0',
    marginBottom: 16,
    lineHeight: 20,
  },
  connectButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  connectButtonText: {
    color: '#10B981',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  calendarIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  viewAllButton: {
    paddingVertical: 4,
  },
  viewAllText: {
    color: '#2563EB',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityContent: {
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
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  activityTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
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
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  statDay: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statBar: {
    width: 32,
    height: 64,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  statProgress: {
    width: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    minHeight: 8,
  },
  statNumbers: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});