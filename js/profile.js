window.onload = function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').classList.remove('d-none');
};

// Firebase configuration
const firebaseConfig = {
    // Your Firebase config here
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
const firestore = firebase.firestore();

// Function to fetch and display user profile
function fetchUserProfile() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const profileRef = firestore.collection('profiles').doc(user.uid);
            profileRef.get()
                .then(doc => {
                    if (doc.exists) {
                        const profileData = doc.data();
                        displayProfile(profileData);
                    } else {
                        console.error("No such document!");
                    }
                })
                .catch(error => {
                    console.error("Error getting document:", error);
                });
        } else {
            console.error("User not signed in.");
            // Redirect to sign-in page or handle accordingly
        }
    });
}


// Function to display user profile
function displayProfile(profileData) {
    const profileInfoDiv = document.getElementById('profile-info');
    profileInfoDiv.innerHTML = `
        <img src="${profileData.photoURL}" alt="Profile Photo" class="img-fluid">
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Username:</strong> ${profileData.username}</p>
        <p><strong>Phone:</strong> ${profileData.phone ? profileData.phone : 'Not provided'}</p>
        
    `;
}

// Call function to fetch and display user profile on page load
fetchUserProfile();
