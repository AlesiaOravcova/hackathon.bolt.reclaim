import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar as CalendarIcon, Plus } from 'lucide-react-native';

export default function Calendar() {
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
              <Text style={styles.headerTitle}>Calendar</Text>
              <View style={styles.placeholder} />
            </View>
          </View>

          {/* Connect Calendar Card */}
          <View style={styles.content}>
            <View style={styles.connectCard}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={['#3B82F6', '#8B5CF6']}
                  style={styles.iconGradient}
                >
                  <CalendarIcon size={32} color="#FFFFFF" />
                </LinearGradient>
              </View>

              <Text style={styles.connectTitle}>Connect Your Calendar</Text>
              <Text style={styles.connectSubtitle}>
                Sync your Google Calendar to automatically schedule your wellness activities around your existing commitments.
              </Text>

              <Pressable style={styles.connectButton}>
                <LinearGradient
                  colors={['#10B981', '#14B8A6']}
                  style={styles.connectButtonGradient}
                >
                  <Text style={styles.connectButtonText}>Connect Google Calendar</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.benefitsCard}>
                <Text style={styles.benefitsTitle}>What we'll do:</Text>
                <View style={styles.benefitsList}>
                  <Text style={styles.benefitItem}>• View your existing events</Text>
                  <Text style={styles.benefitItem}>• Find free time for wellness activities</Text>
                  <Text style={styles.benefitItem}>• Add new wellness events to your calendar</Text>
                  <Text style={styles.benefitItem}>• Send gentle reminders for your me-time</Text>
                </View>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  connectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  connectSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  connectButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  connectButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  connectButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  benefitsCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
});