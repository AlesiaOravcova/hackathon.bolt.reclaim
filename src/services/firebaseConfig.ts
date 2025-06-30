import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = 
{
  apiKey: "AIzaSyASWHppOn7BM5B-GChocjrmZzdeiD7PglE",
  authDomain: "reclaim-15423.firebaseapp.com",
  projectId: "reclaim-15423",
  storageBucket: "reclaim-15423.firebasestorage.app",
  messagingSenderId: "391991548537",
  appId: "1:391991548537:web:267cc257475a762999d2a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure Google Auth Provider with Calendar scope
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar');
googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');

export default app;