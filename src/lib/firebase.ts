import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { env } from '@/config/env';

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
};

const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (v) => typeof v === 'string' && v.length > 0
);

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
  } catch (err) {
    console.error('Firebase initialization failed:', err);
  }
} else {
  console.warn(
    '⚠️ Firebase is not configured. Add your Firebase credentials to .env.local'
  );
}

export { firebaseApp, auth, isFirebaseConfigured };