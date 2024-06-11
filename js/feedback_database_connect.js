import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_dw_10O8R9ECzkM30wnqE1YPxhfTyS14",
  authDomain: "exquiz-f88c8.firebaseapp.com",
  projectId: "exquiz-f88c8",
  storageBucket: "exquiz-f88c8.appspot.com",
  messagingSenderId: "429866461086",
  appId: "1:429866461086:web:5f5a658cf19b4670c8188f",
  measurementId: "G-S3X80N0DK6",
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
 
let submitBtn = document.querySelector(".btn");
let feedback_by_user = document.querySelector(".feedback_class");
 
const db = collection(firestore, "FeedBack");
 
// Define uid variable
let uid = null;
 
// Get current user ID
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    uid = user.uid;
    console.log("User ID: ", uid);
  } else {
    // No user is signed in
    console.log("No user is signed in");
  }
});
 
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
 
  let feedbacks = feedback_by_user.value;
 
  if (uid) {
    try {
      await addDoc(db, {
        feedback: feedbacks,
        uid: uid,
      });
      console.log("Data sent");
      alert("Data sent");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
 
    setTimeout(function () {
      document.querySelector(".form_class").reset();
    }, 3000);
  } else {
    console.log("User is not signed in, cannot send feedback.");
    alert("User is not signed in, cannot send feedback.");
  }
});
 