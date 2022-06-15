// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC29H_zrmm4ZOjbtCQnnuzhdGeNfTK--xs",
  authDomain: "my-accounts-c48c2.firebaseapp.com",
  projectId: "my-accounts-c48c2",
  storageBucket: "my-accounts-c48c2.appspot.com",
  messagingSenderId: "307080411265",
  appId: "1:307080411265:web:c256f3414dea06142a7580"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app)

export default auth;