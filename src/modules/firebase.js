import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7-yL5AxeqEjslHAUclEFGteOfBvfCO8E",
  authDomain: "thedawa-630f9.firebaseapp.com",
  projectId: "thedawa-630f9",
  storageBucket: "thedawa-630f9.appspot.com",
  messagingSenderId: "332277550488",
  appId: "1:332277550488:web:1e4935c54d2f2a8bd5efed",
  measurementId: "G-96VT7BZCFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

export { storage }