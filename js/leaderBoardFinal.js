// Ensure all files are loaded before displaying the main content
window.onload = function () {
    displayLeaderboard();
};

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

// Function to fetch and display the leaderboard
function displayLeaderboard() {
    const leaderboardRef = firestore.collection('HuntGame').orderBy('score', 'desc');

    leaderboardRef.get()
        .then(querySnapshot => {
            document.getElementById("topPlayer1").textContent = querySnapshot.docs[0].data().name;
            document.getElementById("topPlayer1Score").textContent = querySnapshot.docs[0].data().score;
            document.getElementById("topPlayer2").textContent = querySnapshot.docs[1].data().name;
            document.getElementById("topPlayer2Score").textContent = querySnapshot.docs[1].data().score;
            document.getElementById("topPlayer3").textContent = querySnapshot.docs[2].data().name;
            document.getElementById("topPlayer3Score").textContent = querySnapshot.docs[2].data().score;
            const leaderboardContainer = document.getElementsByTagName("tbody")[0];
            leaderboardContainer.innerHTML = ''; // Clear previous content

            for(let i=3;i<querySnapshot.docs.length;i++) {
                const scoreData = querySnapshot.docs[i].data();
                const name = scoreData.name;
                const score = scoreData.score;

                const row = leaderboardContainer.insertRow();
                const rankCell = row.insertCell(0);
                const playerCell = row.insertCell(1);
                const scoreCell = row.insertCell(2);

                rankCell.textContent = i+1;
                playerCell.textContent = name;
                scoreCell.textContent = score;

            };
        })
        .catch(error => {
            console.error("Error fetching leaderboard:", error);
        });
}

// Check authentication state
auth.onAuthStateChanged(user => {
    if (user) {
        // getAndDisplayUserScore(user);
        document.getElementById('nav-signin').style.display = 'none';
        document.getElementById('nav-signup').style.display = 'none';
        document.getElementById('nav-profile').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'block';
        document.getElementById('nav-signed-in-as').style.display = 'block';
        document.getElementById('nav-signed-in-as').textContent = `Signed in as: ${user.email}`;
    } else {
        // window.location.href = 'signin.html'; // Redirect to sign-in page if not signed in
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
