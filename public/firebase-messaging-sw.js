importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBz0z6s3y8AG92E_Nj7gBoSqhZoTwkjvaU",
  authDomain: "cloud-computing-task-4e32f.firebaseapp.com",
  databaseURL: "https://cloud-computing-task-4e32f-default-rtdb.firebaseio.com",
  projectId: "cloud-computing-task-4e32f",
  storageBucket: "cloud-computing-task-4e32f.firebasestorage.app",
  messagingSenderId: "621439371688",
  appId: "1:621439371688:web:a2685bc39ff62aa7bbb59d",
  measurementId: "G-MZ5K6TNFXS",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received: ", payload);
  // Customize your notification options
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});