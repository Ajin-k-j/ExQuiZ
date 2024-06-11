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
const firestore = firebase.firestore();

// Function to get and display user's score
function getAndDisplayUserScore(user) {
    const scoresRef = firestore.collection('HuntGame').doc(user.uid);

    scoresRef.get()
        .then(doc => {
            if (doc.exists) {
                const scoreData = doc.data();
                // Get user profile picture from profiles collection
                getUserProfile(user.uid, scoreData);
            } else {
                console.log("No score found for this user.");
            }
        })
        .catch(error => {
            console.error("Error fetching score:", error);
        });
}

// Function to get user profile information
function getUserProfile(userId, scoreData) {
    const profilesRef = firestore.collection('profiles').doc(userId);

    profilesRef.get()
        .then(doc => {
            if (doc.exists) {
                const profileData = doc.data();
                document.getElementById('player-name').textContent = profileData.name;
                document.getElementById('player-image').src = profileData.photoURL || "https://via.placeholder.com/150"; // Default image if none
                document.getElementById('player-score').textContent = scoreData.score;
                calculateRank(scoreData.score);
            } else {
                console.log("No profile found for this user.");
            }
        })
        .catch(error => {
            console.error("Error fetching profile:", error);
        });
}

// Function to calculate and display rank (example logic)
function calculateRank(userScore) {
    firestore.collection('HuntGame').orderBy('score', 'desc').get()
        .then(querySnapshot => {
            let rank = 1;
            querySnapshot.forEach(doc => {
                if (doc.data().score > userScore) {
                    rank++;
                }
            });
            document.getElementById('player-rank').textContent = rank;
        })
        .catch(error => {
            console.error("Error calculating rank:", error);
        });
}

// Check authentication state and get user's score
auth.onAuthStateChanged(user => {
    if (user) {
        getAndDisplayUserScore(user);
        document.getElementById('nav-signin').style.display = 'none';
        document.getElementById('nav-signup').style.display = 'none';
        document.getElementById('nav-profile').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'block';
        document.getElementById('nav-signed-in-as').style.display = 'block';
        document.getElementById('nav-signed-in-as').textContent = `Signed in as: ${user.email}`;
    } else {
        window.location.href = 'signin.html'; // Redirect to sign-in page if not signed in
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'signin.html'; // Redirect to sign-in page after logout
    }).catch(error => {
        console.error("Error signing out:", error);
    });
});
