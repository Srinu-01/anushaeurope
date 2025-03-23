import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPSRFynLSgt-SjdSj50vVDLNMe1-bcsO8",
  authDomain: "anusha-europe-aa01e.firebaseapp.com",
  projectId: "anusha-europe-aa01e",
  storageBucket: "anusha-europe-aa01e.appspot.com",
  messagingSenderId: "50683012035",
  appId: "1:50683012035:web:82834305e9da82d4c11376",
  measurementId: "G-J2GP3NNBN8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics only on client side
if (typeof window !== 'undefined') {
  try {
    getAnalytics(app);
    
    // Enable offline persistence (helps with connection issues)
    enableIndexedDbPersistence(db).catch((err) => {
      console.warn('Firestore persistence could not be enabled:', err.code);
    });
  } catch (error) {
    console.error('Error initializing Firebase analytics or persistence:', error);
  }
}

// Check if we're in development environment
if (import.meta.env.DEV) {
  // Uncomment this if you need to use a local Firestore emulator
  // connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
