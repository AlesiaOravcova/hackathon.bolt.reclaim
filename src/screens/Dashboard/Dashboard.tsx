import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from '../../components/StatusBar';
import { TabBar } from '../../components/TabBar';
import { Button } from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface DashboardProps {
  navigation: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const todayActivities = [
    { time: '9:00 AM', title: 'Morning Meditation', duration: '15 min', type: 'mindfulness' },
    { time: '12:30 PM', title: 'Lunch Break Walk', duration: '20 min', type: 'exercise' },
    { time: '3:00 PM', title: 'Breathing Exercise', duration: '10 min', type: 'mindfulness' },
    { time: '6:00 PM', title: 'Evening Yoga', duration: '30 min', type: 'exercise' },
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

  return (
    <LinearGradient colors={['#F1F6FE', '#F3FDF5']} style={styles.container}>
      <StatusBar />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.subGreeting}>Ready for your me time?</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.profileButton}
            >
              <Text style={styles.profileInitial}>J</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Card */}
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            style={styles.progressCard}
          >
            <View style={styles.progressContent}>
              <View>
                <Text style={styles.progressTitle}>Today's Progress</Text>
                <Text style={styles.progressSubtitle}>2 of 4 activities completed</Text>
              </View>
              <View style={styles.progressStats}>
                <Text style={styles.progressPercentage}>50%</Text>
                <Text style={styles.progressLabel}>Complete</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '50%' }]} />
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
                <Button
                  onPress={() => navigation.navigate('CalendarIntegration')}
                  style={styles.connectButton}
                  textStyle={styles.connectButtonText}
                >
                  Connect Now
                </Button>
              </View>
              <View style={styles.calendarIcon}>
                <Ionicons name="calendar" size={32} color="#FFFFFF" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <Button
              onPress={() => navigation.navigate('Schedule')}
              variant="ghost"
              textStyle={styles.viewAllButton}
            >
              View All
            </Button>
          </View>

          <View style={styles.activitiesList}>
            {todayActivities.map((activity, index) => (
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
                    <Ionicons
                      name={activity.type === 'mindfulness' ? 'leaf' : 'fitness'}
                      size={24}
                      color={activity.type === 'mindfulness' ? '#8B5CF6' : '#10B981'}
                    />
                  </View>
                  <View style={styles.activityDetails}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityTime}>
                      {activity.time} • {activity.duration}
                    </Text>
                  </View>
                </View>
                <Button size="sm" style={styles.startButton}>
                  Start
                </Button>
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
                        { height: `${(stat.completed / stat.total) * 100}%` },
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

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} navigation={navigation} />
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
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  progressCard: {
    borderRadius: 24,
    padding: 24,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
  },
  progressStats: {
    alignItems: 'flex-end',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 12,
    color: '#BFDBFE',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#60A5FA',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  lastSection: {
    paddingBottom: 80,
  },
  calendarCard: {
    borderRadius: 24,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  calendarSubtitle: {
    fontSize: 14,
    color: '#A7F3D0',
    marginBottom: 16,
  },
  connectButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  connectButtonText: {
    color: '#10B981',
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllButton: {
    color: '#2563EB',
    fontWeight: '600',
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activityTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  startButton: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  weeklyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    fontWeight: '500',
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
  },
  statNumbers: {
    fontSize: 12,
    color: '#6B7280',
  },
});