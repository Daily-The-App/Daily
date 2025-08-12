import { getApps, initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

// Firebase config should be automatically loaded from google-services.json and GoogleService-Info.plist
// This function ensures Firebase is initialized before we try to use it
export const initializeFirebaseIfNeeded = () => {
  try {
    // Check if any Firebase apps are already initialized
    if (getApps().length === 0) {
      // Firebase should automatically initialize with the config files
      // If it doesn't, we can manually initialize with an empty config
      // since the native config files should provide the necessary info
      console.log('Initializing Firebase...');
      initializeApp();
    }
    
    // Return the auth instance
    return getAuth();
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
};

export { getAuth };
