import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential, signInWithPopup } from "firebase/auth";
import { getDatabase, ref as databaseRef, Database, set, push, update, serverTimestamp, DataSnapshot, get } from "firebase/database"; 
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

const provider = new SAMLAuthProvider(String("saml." + import.meta.env.VITE_PROVIDER_ID));

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Get authentication, database, and storage instances
export const auth = getAuth(app);
export const database: Database = getDatabase(app); 
export const storage = getStorage(app);



const FirebaseService = {
  login: async function (email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        return ;
      })
      .catch((error) => {
        return error;
      });
  },

  SSOLogin: async function () {
    return await signInWithPopup(auth, provider)
      .then(async (result: any) => {
        const user = result.user;
        const userClaims = await UserUtils.getClaims(user);
        userClaims.customerId && (await this.updateLastLogin(userClaims.customerId, user.uid));
        if (result?.providerId === String("saml." + import.meta.env.VITE_PROVIDER_ID) && userClaims.customerId) await this.addPlatformToUser(user.uid, userClaims.customerId, "op_singapore");

        return Promise.resolve();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast("Something went wrong: " + error, "bottom-center");
        return Promise.reject();
      });
  },

  logout: async function () {
    signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error.message);
        return false;
      });
  },

  getUserInfo: async function (userClaims: any, userId: any) {
    const userRef = databaseRef(database,`/customers/${userClaims.customerId}/users/${userId}`);
    const userSnapshot = await get(userRef);
    if (!userSnapshot.exists()) return;
    return userSnapshot.val(); 
  },
  
  addPlatformToUser: async function (userId: any, customerId: any, platform: any) {
  },

  getLoggedInCompanyInfo: async function (customerId: any, clientId: any) {
  },

  getCustomerInfo: async function (customerId: string) {
    const customerRef = databaseRef(database,`/customers/${customerId}`);
    const customerSnapshot = await get(customerRef);
    if (!customerSnapshot.exists()) return;
    return { customerId: customerId, ...customerSnapshot.val() };  },

  updateLastLogin: async function (customerId: string, uid: string) {
    const userRef = databaseRef(database, `/customers/${customerId}/users/${uid}`);
    await update(userRef, { op_singapore_last_login: serverTimestamp() });  },

  sendPasswordReset: async function (customerId: string, uid: string) {
    const userRef = databaseRef(database,`/customers/${customerId}/users/${uid}`);
    await update(userRef, { passwordReset: serverTimestamp() });  },
};

export default FirebaseService;
