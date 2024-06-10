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

// Check authentication state
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        $('#nav-signup').hide();
        $('#nav-signin').hide();
        $('#nav-profile').show();
        $('#nav-logout').show();
        $('#nav-signed-in-as').show().text("Signed in as " + user.email);
    } else {
        // No user is signed in
        $('#nav-signup').show();
        $('#nav-signin').show();
        $('#nav-profile').hide();
        $('#nav-logout').hide();
        $('#nav-signed-in-as').hide();
    }
});

// Handle Logout
$('#nav-logout').click(function() {
    auth.signOut().then(() => {
        window.location.href = "index.html"; // Redirect to home page after logout
    }).catch((error) => {
        console.error("Error during logout:", error);
    });
});

// Handle Sign-Up
$('#sign-up-form').submit(function(e) {
    e.preventDefault(); // Prevent form submission

    const email = $('#sign-up-email').val();
    const password = $('#sign-up-password').val();
    const reenterPassword = $('#re-enter-password').val();

    if (password !== reenterPassword) {
        alert("Passwords do not match. Please re-enter.");
        return; // Don't proceed if passwords don't match
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = 'create_profile.html';
            // Redirect or perform additional actions after successful sign-up
        })
        .catch((error) => {
            const errorMessage = getErrorMessage(error); // Get a user-friendly error message
            alert(errorMessage); // Show the error message to the user
        });
});

// Handle Sign-In
$('#sign-in-form').submit(function(e) {
    e.preventDefault(); // Prevent form submission

    const email = $('#sign-in-email').val().trim();
    const password = $('#sign-in-password').val().trim();

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

// Handle "Forgot Password"
$('#forgot-password').click(function() {
    const email = $('#sign-in-email').val();

    if (!email) {
        alert("Please enter your email address to reset your password.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent. Check your inbox.");
        })
        .catch((error) => {
            console.error("Error during password reset:", error);
            alert("Could not send password reset email. Please try again.");
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
            return "The email address is already in use, please signin.";
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
