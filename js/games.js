

document.addEventListener('DOMContentLoaded', () => {
    const addGameForm = document.getElementById('addGameForm');
    const gameCards = document.getElementById('gameCards');
    const loading = document.getElementById('loading');

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
const firestore = firebase.firestore();

    // Firebase authentication
    const auth = firebase.auth();
    
    // Show loading indicator
    function showLoading() {
        loading.style.display = 'block';
    }

    // Hide loading indicator
    function hideLoading() {
        loading.style.display = 'none';
    }

    // Load game cards from Firestore
    function loadGameCards() {
        showLoading();
        firestore.collection('GameZone').get().then((querySnapshot) => {
            gameCards.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const game = doc.data();
                const cardHtml = `
                    <div class="col-md-4 mb-4">
                        <div class="card" onclick="location.href='${game.gameHostLink}'">
                            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="${game.gameTitle}">
                            <div class="card-body">
                                <h5 class="card-title">${game.gameTitle}</h5>
                                <p class="card-text">${game.gameDescription}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Contributors: ${game.contributorsName}</small>
                            </div>
                        </div>
                    </div>
                `;
                gameCards.insertAdjacentHTML('beforeend', cardHtml);
            });
            hideLoading();
        }).catch((error) => {
            console.error("Error loading game cards: ", error);
            hideLoading();
        });
    }

    addGameForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
            // Redirect to sign-in page
            window.location.href = 'signin.html';
            return;
        }
    
        const name = document.getElementById('name').value;
        const gameTitle = document.getElementById('gameTitle').value;
        const gameHostLink = document.getElementById('gameHostLink').value;
        const gameDescription = document.getElementById('gameDescription').value;
        const contributorsName = document.getElementById('contributorsName').value;
    
        showLoading();
    
        firestore.collection('GameZone').add({
            uid: user.uid, // Save user UID
            name: name,
            gameTitle: gameTitle,
            gameHostLink: gameHostLink,
            gameDescription: gameDescription,
            contributorsName: contributorsName
        }).then(() => {
            $('#addGameModal').modal('hide');
            addGameForm.reset();
            loadGameCards();
        }).catch((error) => {
            console.error("Error adding game: ", error);
            hideLoading();
        });
    });
    

    // Initial load of game cards
    loadGameCards();
});
