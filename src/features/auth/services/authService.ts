import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import type { AuthUser } from '../types/auth.types';

const mapUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

const ensureAuth = () => {
  if (!auth || !isFirebaseConfigured) {
    throw new Error(
      'Firebase is not configured. Add your credentials to .env.local'
    );
  }
  return auth;
};

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const credential = await signInWithEmailAndPassword(ensureAuth(), email, password);
    return mapUser(credential.user);
  },

  async logout(): Promise<void> {
    await firebaseSignOut(ensureAuth());
  },

  onAuthChange(callback: (user: AuthUser | null) => void): () => void {
    if (!auth || !isFirebaseConfigured) {
      // No firebase configured - immediately mark as "not loading, not authenticated"
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, (user) => {
      callback(user ? mapUser(user) : null);
    });
  },

  getFirebaseErrorMessage(code: string): string {
    const map: Record<string, string> = {
      'auth/invalid-credential': 'Invalid email or password',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/invalid-email': 'Invalid email format',
      'auth/invalid-api-key': 'Firebase API key is invalid. Check your .env.local',
      'auth/too-many-requests': 'Too many failed attempts. Try again later.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    };
    return map[code] ?? 'Login failed. Please try again.';
  },
};