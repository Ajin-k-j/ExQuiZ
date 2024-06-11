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

// Function to display leaderboard
function displayLeaderboard() {
    const leaderboardRef = firestore.collection('HuntGame').orderBy('score', 'desc');

    leaderboardRef.get()
        .then(querySnapshot => {
            const leaderboard = document.querySelector('tbody');
            leaderboard.innerHTML = ''; // Clear previous content
            let rank = 1;

            querySnapshot.forEach(doc => {
                const scoreData = doc.data();
                const userId = doc.id;

                // Fetch user profile data
                firestore.collection('profiles').doc(userId).get()
                    .then(profileDoc => {
                        if (profileDoc.exists) {
                            const profileData = profileDoc.data();
                            const listItem = document.createElement('tr');
                            listItem.innerHTML = `
                                <td>${rank}</td>
                                <td class="player-info">
                                    <img src="${profileData.photourl}" alt="${profileData.name}">
                                    ${profileData.name}
                                </td>
                                <td>${scoreData.score}</td>
                            `;
                            leaderboardContainer.appendChild(listItem);
                            rank++;
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

// Check authentication state and load leaderboard
auth.onAuthStateChanged(user => {
    if (user) {
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
