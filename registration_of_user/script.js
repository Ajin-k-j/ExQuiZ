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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Add event listener after DOM is fully loaded

  const submit = document.getElementById('submit');
  submit.addEventListener("click", function(event) {
      event.preventDefault();
      
      // Get the input values inside the event listener
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      console.log('Submit button clicked');
      console.log('Email:', email);
      console.log('Password:', password);

      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed up
              const user = userCredential.user;
              console.log('Account created successfully!', user);
              alert("Account created successfully!");
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('Error:', errorCode, errorMessage);
              alert(errorMessage);
          });
  });

