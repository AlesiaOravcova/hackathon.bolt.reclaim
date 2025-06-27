import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import screens
import { Welcome } from './src/screens/Welcome';
import { OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4 } from './src/screens/Onboarding';
import { Dashboard } from './src/screens/Dashboard';
import { Profile } from './src/screens/Profile';
import { Schedule } from './src/screens/Schedule';
import { CalendarIntegration } from './src/screens/CalendarIntegration';
import { AuthCallback } from './src/screens/AuthCallback';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#F1F6FE" />
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="OnboardingStep1" component={OnboardingStep1} />
          <Stack.Screen name="OnboardingStep2" component={OnboardingStep2} />
          <Stack.Screen name="OnboardingStep3" component={OnboardingStep3} />
          <Stack.Screen name="OnboardingStep4" component={OnboardingStep4} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="CalendarIntegration" component={CalendarIntegration} />
          <Stack.Screen name="AuthCallback" component={AuthCallback} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}