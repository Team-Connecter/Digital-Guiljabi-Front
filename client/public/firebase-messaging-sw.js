importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjpOJ6I7_cA5iI4t-Lpeh6mjB8YTEPjZs",
  authDomain: "team-cmd-6be05.firebaseapp.com",
  projectId: "team-cmd-6be05",
  storageBucket: "team-cmd-6be05.appspot.com",
  messagingSenderId: "752831840835",
  appId: "1:752831840835:web:1ae421a37184fb105a0af6",
  measurementId: "G-EE7LDHL7NX"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data?.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});