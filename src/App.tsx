import React from "react";
import { Routes, Route } from "react-router-dom";
import { Welcome } from "./screens/Welcome";
import { Dashboard } from "./screens/Dashboard";
import { Profile } from "./screens/Profile";
import { Schedule } from "./screens/Schedule";
import { CalendarIntegration } from "./screens/CalendarIntegration";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/calendar" element={<CalendarIntegration />} />
      </Routes>
    </div>
  );
};