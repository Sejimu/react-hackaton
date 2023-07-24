import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg4fC1Xs-V4GoG1ycSm8F1yiSZ9PgyJVs",
  authDomain: "hackaton-24-07-2023.firebaseapp.com",
  projectId: "hackaton-24-07-2023",
  storageBucket: "hackaton-24-07-2023.appspot.com",
  messagingSenderId: "843633608612",
  appId: "1:843633608612:web:e4f984d0e553db444fe331",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
