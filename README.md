# iOS Wellness App with Firebase

A modern wellness scheduling app built with React, TypeScript, and Firebase, featuring an iOS-inspired design.

## Features

- **Firebase Authentication**: Email/password and Google sign-in
- **Real-time Database**: Firestore for storing user data, activities, goals, and sessions
- **Google Calendar Integration**: Sync with Google Calendar for intelligent scheduling
- **Wellness Tracking**: Track activities, set goals, and monitor progress
- **iOS-style UI**: Beautiful, responsive design inspired by iOS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Firebase project
- Google Calendar API credentials (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ios-wellness-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password and Google providers)
   - Create a Firestore database
   - Copy your Firebase config

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values
   - Optionally add Google Calendar API credentials

5. Configure Firestore security rules:
   - Copy the rules from `firestore.rules` to your Firebase project
   - Deploy the rules through the Firebase Console

6. Start the development server:
```bash
npm run dev
```

## Firebase Setup Guide

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Enable "Google" (optional)

### 3. Create Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location for your database

### 4. Configure Security Rules

Copy the rules from `firestore.rules` and paste them in the Firebase Console under "Firestore Database" > "Rules".

### 5. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select Web
4. Copy the configuration object
5. Add these values to your `.env` file

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here

# Google Calendar API (Optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## Database Structure

### Collections

- **users**: User profiles and preferences
- **activities**: Wellness activities and tasks
- **goals**: User-defined wellness goals
- **sessions**: Activity completion sessions

### Data Models

#### User Profile
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  preferences: {
    selectedCalendars: string[];
    challenges: string[];
    activities: string[];
    reminderDays: string[];
    notificationsEnabled: boolean;
  };
  stats: {
    activitiesCompleted: number;
    currentStreak: number;
    totalMeTime: number;
    mindfulnessScore: number;
  };
}
```

#### Wellness Activity
```typescript
{
  id: string;
  userId: string;
  title: string;
  category: 'mindfulness' | 'exercise' | 'creative' | 'social' | 'rest' | 'learning';
  duration: number;
  isCompleted: boolean;
  scheduledTime?: Date;
  completedAt?: Date;
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Firebase** - Backend services
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.