import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");

      
      const token = await getToken(messaging, {
        vapidKey: "BLCNrHzcrrQupwcGjVL4DpyHg8T9qlMssmcYgWKYg10i3tKsEOwqYiwuYzJcS9cuBIhW3Aq7v3KTuRZNJndHBJE", 
      });

      if (token) {
        console.log("FCM Token:", token);
        
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting permission for notifications:", error);
  }
};


requestPermission();
export { database, ref, push, set, onValue, messaging, onMessage, getToken };
