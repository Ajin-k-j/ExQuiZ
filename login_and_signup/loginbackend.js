import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6Fx_vQpmWLWGC1BsP1O9uCXVT3uMK7NQ",
    authDomain: "exquizdemo.firebaseapp.com",
    projectId: "exquizdemo",
    storageBucket: "exquizdemo.appspot.com",
    messagingSenderId: "424037310418",
    appId: "1:424037310418:web:b6519a3d39710db8a1f20b"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

$('#sign-in-form').submit(function(e) {
    e.preventDefault(); // Prevent form submission
 
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();
 
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Login Success")
            // Redirect to the home page upon successful sign-in
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorMessage = getErrorMessage(error); // Get a user-friendly error message
            alert(errorMessage); // Show the error message to the user
        });
});

