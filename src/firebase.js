import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDSSh5taAVqTKgcRdp7vrKyL0t9QtD6F8Q",
    authDomain: "todo-7f0fa.firebaseapp.com",
    projectId: "todo-7f0fa",
    storageBucket: "todo-7f0fa.appspot.com",
    messagingSenderId: "728134016070",
    appId: "1:728134016070:web:148f9b794dc2d8ff8fbe47",
    measurementId: "G-3T175GS27B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);