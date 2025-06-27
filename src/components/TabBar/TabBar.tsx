import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  navigation: any;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, navigation }) => {
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      screen: 'Dashboard',
      icon: 'home' as const,
    },
    {
      id: 'schedule',
      label: 'Schedule',
      screen: 'Schedule',
      icon: 'calendar' as const,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      screen: 'CalendarIntegration',
      icon: 'calendar-outline' as const,
    },
    {
      id: 'profile',
      label: 'Profile',
      screen: 'Profile',
      icon: 'person' as const,
    },
  ];

  const handleTabPress = (tab: any) => {
    onTabChange(tab.id);
    navigation.navigate(tab.screen);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleTabPress(tab)}
              style={styles.tab}
            >
              <Ionicons
                name={tab.icon}
                size={24}
                color={isActive ? '#2563EB' : '#9CA3AF'}
              />
              <Text style={[
                styles.tabLabel,
                { color: isActive ? '#2563EB' : '#9CA3AF' }
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});