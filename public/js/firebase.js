// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLEDoIu5WNFR9ilBLjEa2PoXqY34fgYgI",
  authDomain: "rickandmortyapp-43914.firebaseapp.com",
  projectId: "rickandmortyapp-43914",
  storageBucket: "rickandmortyapp-43914.appspot.com",
  messagingSenderId: "1090094282978",
  appId: "1:1090094282978:web:c9149cc1dd5a65f06446bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};