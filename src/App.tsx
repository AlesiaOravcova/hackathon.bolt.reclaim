import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/auth";
import { Welcome } from "./screens/Welcome";
import { Dashboard } from "./screens/Dashboard";
import { Profile } from "./screens/Profile";
import { Schedule } from "./screens/Schedule";
import { CalendarIntegration } from "./screens/CalendarIntegration";
import { AuthCallback } from "./screens/AuthCallback";
import { OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4 } from "./screens/Onboarding";

export const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
        <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
        <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
        <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/schedule" element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <CalendarIntegration />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};