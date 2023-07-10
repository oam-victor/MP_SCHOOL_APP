// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdk3wzefSJpLB2ZfZkJk5XvRFT3Dv7dMQ",
    authDomain: "auth-school-2acb1.firebaseapp.com",
    projectId: "auth-school-2acb1",
    storageBucket: "auth-school-2acb1.appspot.com",
    messagingSenderId: "702728476588",
    appId: "1:702728476588:web:576e4d9e12b7c8f2af8c09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)