import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Check if all environment variables are set
const validateFirebaseConfig = (config: Record<string, string | undefined>) => {
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      console.warn(`Missing environment variable for Firebase config: ${key}`);
    }
  });
};

validateFirebaseConfig(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
