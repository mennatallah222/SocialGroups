// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBz0z6s3y8AG92E_Nj7gBoSqhZoTwkjvaU",
  authDomain: "cloud-computing-task-4e32f.firebaseapp.com",
  databaseURL: "https://cloud-computing-task-4e32f-default-rtdb.firebaseio.com",
  projectId: "cloud-computing-task-4e32f",
  storageBucket: "cloud-computing-task-4e32f.firebasestorage.app",
  messagingSenderId: "621439371688",
  appId: "1:621439371688:web:a2685bc39ff62aa7bbb59d",
  measurementId: "G-MZ5K6TNFXS"
};

//initializing Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database, ref, push, set, onValue};