import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Welcome } from "./screens/Welcome";
import { SignUp } from "./screens/SignUp";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { Profile } from "./screens/Profile";
import { Schedule } from "./screens/Schedule";
import { CalendarIntegration } from "./screens/CalendarIntegration";
import { OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4 } from "./screens/Onboarding";

export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
          <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
          <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
          <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schedule" 
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <CalendarIntegration />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};