// THIS IS TO FETCH NAME AND SCORE FROM FIRESTORE TO DISPLAY ON THE LEADERBOARD

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB0NHFMU24gGMPci-I6WkTlcfn3vy9CQY",
  authDomain: "fir-may-e7ff3.firebaseapp.com",
  projectId: "fir-may-e7ff3",
  storageBucket: "fir-may-e7ff3.appspot.com",
  messagingSenderId: "816370027290",
  appId: "1:816370027290:web:bd4fcb6741e6d0e2407aa3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getData(id) {
    const docRef = doc(db, "leaderboard", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", data);
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  }
  
  // Example usage
  const id = "DiEaRyb9n3dQiMV4dEa8"; // Replace this with the actual ID you want to use
  getData(id).then(data => {
    if (data) {
      // Handle the data as needed
      console.log(`Name: ${data.name}`);
      console.log(`Score: ${data.score}`);
    } else {
      console.log("No data found for the provided ID");
    }
  });
  