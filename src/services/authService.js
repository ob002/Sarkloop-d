import { 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, githubProvider, db } from '../config/firebase';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google',
        createdAt: serverTimestamp(),
        isVerified: false,
        isOnboarded: false
      });
    }
    
    return result;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'github',
        createdAt: serverTimestamp(),
        isVerified: false,
        isOnboarded: false
      });
    }
    
    return result;
  } catch (error) {
    console.error('GitHub sign-in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...profileData,
      isOnboarded: true,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};