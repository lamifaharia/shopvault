import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyCVDjlLUK_vwnPHzgApyghNF_mhk0LhQMQ",
  authDomain: "shopvault-9b1f3.firebaseapp.com",
  projectId: "shopvault-9b1f3",
  storageBucket: "shopvault-9b1f3.firebasestorage.app",
  messagingSenderId: "859105125891",
  appId: "1:859105125891:web:9877681cd2b94701f89036",
  measurementId: "G-WWR40KC4CP"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
export default app
