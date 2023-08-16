// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import axios from "axios";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



const messaging = getMessaging(app);
const getTokenMessage = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
        console.log('token', token);
        const api = process.env.REACT_APP_API_URL;
        axios.post(`${api}/api/v1/notification/token`, {
            token: token
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
        
    } catch (error) {
        console.log('error', error);
    }
}

getTokenMessage();