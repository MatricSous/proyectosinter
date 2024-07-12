// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwNiIwhVf5XfazESuY_VH_sDiephyw4Vc",
  authDomain: "arquiudp-21ecb.firebaseapp.com",
  projectId: "arquiudp-21ecb",
  storageBucket: "arquiudp-21ecb.appspot.com",
  messagingSenderId: "419094520769",
  appId: "1:419094520769:web:8116de94db985d05884540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const ImageDB = getStorage(app)