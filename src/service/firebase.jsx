// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFpOyCtPAgk56w3NF-3C_UcpOJyW85bjk",
  authDomain: "gentravel-d71c4.firebaseapp.com",
  projectId: "gentravel-d71c4",
  storageBucket: "gentravel-d71c4.appspot.com",
  messagingSenderId: "31944656997",
  appId: "1:31944656997:web:eb2bc90f4403db19025e8c",
  measurementId: "G-CCT35MFN7H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db =getFirestore(app)