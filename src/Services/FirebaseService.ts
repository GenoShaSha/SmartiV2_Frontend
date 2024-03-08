import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, push, update, get, serverTimestamp, DataSnapshot } from "firebase/database";
import { getStorage } from "firebase/storage";
import { SAMLAuthProvider } from "firebase/auth";
import { showErrorToast } from "../Utils/Toast";
import { UserUtils } from "../Utils/UserUtils";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  
  // Initialize Firebase app
  export const app = initializeApp(firebaseConfig);
  
  // Get authentication and database instances
  export const auth = getAuth(app);
  export const database = getDatabase(app);
  export const storage = getStorage(app);
  
  // SAML Authentication provider
  const provider = new SAMLAuthProvider(String("saml." + import.meta.env.VITE_PROVIDER_ID));
  
  // Export FirebaseService
  const FirebaseService = {
    // You can add more methods here if needed
  };
  
  export default FirebaseService;