


// THIS IS TO PUSH THE NAME AND SCORE OF USER FROM UI TO FIRESTORE




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const firestore = getFirestore(app);

let submitBtn = document.querySelector(".btn");
let user_name = document.querySelector(".name");
let user_score = document.querySelector(".score");

const db = collection(firestore, "leaderboard");

submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  
  let username = user_name.value;
  let userscore = user_score.value;
  
  try {
    await addDoc(db, {
      name: username,
      score: userscore
    });
    console.log("Data sent");
    alert("Data sent");
  } catch (error) {
    console.error("Error adding document: ", error);
  }

  setTimeout(function(){
    document.querySelector(".leaderboard-form").reset();
  }, 3000);
});
