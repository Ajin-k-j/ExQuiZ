// Ensure all files are loaded before displaying the main content
window.onload = function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').classList.remove('d-none');
};

// Typing effect function
function typeEffect(element, text, delay = 100) {
    let index = 0;
    const chatbox = document.getElementsByClassName('character-message')
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            chatbox[0].style.transform = `translateY(-${chatbox[0].clientHeight}px)`;
            setTimeout(type, delay);
        }
    }
    type();
}

// Dynamic content loading for character message
document.addEventListener('DOMContentLoaded', function () {
    const wordOfTheDay = 'Innovate';
    const thoughtOfTheDay = 'Think big, start small, scale fast.';
    const fullMessage = `Welcome to ExQuiZ, the word of the day is ${wordOfTheDay} and the thought of the day is ${thoughtOfTheDay}.`;

    const characterTextElement = document.getElementById('character-text');
    typeEffect(characterTextElement, fullMessage, 50);  // Adjust the delay for typing speed
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

// Function to fetch and display the leaderboard
function displayLeaderboard() {
    const leaderboardRef = firestore.collection('HuntGame').orderBy('score', 'desc');

    leaderboardRef.get()
        .then(querySnapshot => {
            const leaderboardContainer = document.getElementById('leaderboard');
            leaderboardContainer.innerHTML = ''; // Clear previous content

            querySnapshot.forEach(doc => {
                const scoreData = doc.data();
                const userId = doc.id;

                // Fetch user profile data
                firestore.collection('profiles').doc(userId).get()
                    .then(profileDoc => {
                        if (profileDoc.exists) {
                            const profileData = profileDoc.data();
                            const listItem = document.createElement('li');
                            listItem.classList.add('list-group-item');
                            listItem.textContent = `${profileData.name}: ${scoreData.score}`;
                            leaderboardContainer.appendChild(listItem);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching user profile for leaderboard:", error);
                    });
            });
        })
        .catch(error => {
            console.error("Error fetching leaderboard:", error);
        });
}

// Check authentication state and get user's score
auth.onAuthStateChanged(user => {
    if (user) {
        getAndDisplayUserScore(user);
        displayLeaderboard();
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
