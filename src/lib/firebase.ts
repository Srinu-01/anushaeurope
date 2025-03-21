import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyANxrzD7U5sO1eGxqYVAB-03x8LcJlkhyQ",
  authDomain: "anusha-europe.firebaseapp.com",
  projectId: "anusha-europe",
  storageBucket: "anusha-europe.firebasestorage.app",
  messagingSenderId: "1064718652154",
  appId: "1:1064718652154:web:dc6c0423dd04bea8642f43",
  measurementId: "G-YZJNFFPP4F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics only on client side
if (typeof window !== 'undefined') {
  getAnalytics(app);
}
