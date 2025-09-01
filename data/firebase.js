import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXkbFxsYqJOoTqACkVp-JhrV8pDITO5GE",
  authDomain: "apiprogint.firebaseapp.com",
  projectId: "apiprogint",
  storageBucket: "apiprogint.appspot.com",
  messagingSenderId: "665902347049",
  appId: "1:665902347049:web:b9c51fb81a5fbdd3903d38"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;