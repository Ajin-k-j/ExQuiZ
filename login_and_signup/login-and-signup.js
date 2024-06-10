document.getElementById("registerLink").addEventListener("click", function() {
    if (window.innerWidth <= 600) {
        document.getElementById("flip-card-inner").style.transform = 'rotateY(180deg)';
    }
});

document.getElementById("loginlink").addEventListener("click", function() {
    if (window.innerWidth <= 600) {
        document.getElementById("flip-card-inner").style.transform = 'rotateY(0deg)';
    }
});


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_dw_10O8R9ECzkM30wnqE1YPxhfTyS14",
    authDomain: "exquiz-f88c8.firebaseapp.com",
    projectId: "exquiz-f88c8",
    storageBucket: "exquiz-f88c8.appspot.com",
    messagingSenderId: "429866461086",
    appId: "1:429866461086:web:5f5a658cf19b4670c8188f",
    measurementId: "G-S3X80N0DK6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// Handle Sign-Up
$('#submit').click(function(e) {
    e.preventDefault(); // Prevent form submission

    const email = $('#email').val().trim();
    const password = $('#password').val();

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // You can redirect or perform additional actions after successful sign-up
            window.location.href = 'create_profile.html';
        })
        .catch((error) => {
            const errorMessage = getErrorMessage(error); // Get a user-friendly error message
            alert(errorMessage); // Show the error message to the user
        });
});

// Handle Sign-In
$('#login_submit').click(function(e) {
    e.preventDefault(); // Prevent form submission

    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Redirect to the home page upon successful sign-in
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorMessage = getErrorMessage(error); // Get a user-friendly error message
            alert(errorMessage); // Show the error message to the user
        });
});

// Function to return a user-friendly error message for Firebase errors
function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/invalid-email':
            return "The email address is invalid. Please check and try again.";
        case 'auth/weak-password':
            return "Password should be at least 6 characters.";
        case 'auth/email-already-in-use':
            return "The email address is already in use, please sign in.";
        case 'auth/user-disabled':
            return "This account has been disabled. Please contact support.";
        case 'auth/user-not-found':
            return "No account found with this email address.";
        case 'auth/internal-error':
            if (error.message.includes("INVALID_LOGIN_CREDENTIALS")) {
                return "Incorrect email or password. Please check your credentials and try again.";
            }
            return "An internal error occurred. Please try again later.";
        case 'auth/wrong-password':
            return "Incorrect password. Please try again.";
        case 'auth/too-many-requests':
            return "Too many unsuccessful attempts. Please wait a while and try again.";
        default:
            return "Sign-in failed. Please try again.";
    }
}
