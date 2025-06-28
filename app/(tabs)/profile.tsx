import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, LogOut, Settings, Bell, Shield } from 'lucide-react-native';

export default function Profile() {
  const profileStats = [
    { label: "Activities Completed", value: "127", icon: "✓", color: "#10B981" },
    { label: "Current Streak", value: "12 days", icon: "🔥", color: "#F59E0B" },
    { label: "Total Me Time", value: "24.5 hrs", icon: "⏰", color: "#3B82F6" },
    { label: "Mindfulness Score", value: "8.4/10", icon: "🧘", color: "#8B5CF6" },
  ];

  const preferences = [
    { label: "Preferred Activity Time", value: "Morning & Evening" },
    { label: "Activity Duration", value: "15-30 minutes" },
    { label: "Focus Areas", value: "Mindfulness, Exercise" },
    { label: "Notifications", value: "Enabled" },
  ];

  const settingsItems = [
    { label: "Edit Profile", icon: Settings, color: "#6B7280" },
    { label: "Notifications", icon: Bell, color: "#6B7280" },
    { label: "Privacy & Security", icon: Shield, color: "#6B7280" },
    { label: "Sign Out", icon: LogOut, color: "#EF4444" },
  ];

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
              <Text style={styles.headerTitle}>Profile</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <View style={styles.profileImageContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Jane Doe</Text>
                <Text style={styles.profileMember}>Member since March 2024</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>Premium Plan</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              {profileStats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Text style={styles.statEmoji}>{stat.icon}</Text>
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.preferencesCard}>
              {preferences.map((pref, index) => (
                <View
                  key={index}
                  style={[
                    styles.preferenceItem,
                    index !== preferences.length - 1 && styles.preferenceItemBorder
                  ]}
                >
                  <Text style={styles.preferenceLabel}>{pref.label}</Text>
                  <Text style={styles.preferenceValue}>{pref.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Settings */}
          <View style={[styles.section, styles.lastSection]}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsCard}>
              {settingsItems.map((item, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.settingItem,
                    index !== settingsItems.length - 1 && styles.settingItemBorder
                  ]}
                  onPress={() => {
                    if (item.label === "Sign Out") {
                      router.push('/');
                    }
                  }}
                >
                  <View style={styles.settingItemLeft}>
                    <item.icon size={20} color={item.color} />
                    <Text style={[
                      styles.settingLabel,
                      item.label === "Sign Out" && styles.signOutLabel
                    ]}>
                      {item.label}
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </Pressable>
              ))}
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
  placeholder: {
    width: 40,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  profileMember: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  premiumBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  premiumText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  lastSection: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statEmoji: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  preferenceItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  preferenceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  preferenceValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  signOutLabel: {
    color: '#EF4444',
  },
});