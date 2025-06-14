import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCglKOR8rpS-2Qs1zTeGBpbvLog8T8ijgw",
  authDomain: "productapp-7f14e.firebaseapp.com",
  projectId: "productapp-7f14e",
  storageBucket: "productapp-7f14e.appspot.com",
  messagingSenderId: "625099840712",
  appId: "1:625099840712:web:4026166c5c73b7315859fd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth  };