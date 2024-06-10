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
const storage = firebase.storage();

// Handle Profile Form Submission
$('#profile-form').submit(function(e) {
    e.preventDefault(); // Prevent form submission

    const user = auth.currentUser;
    if (!user) {
        alert("You need to be signed in to create a profile.");
        return;
    }

    const name = $('#profile-name').val();
    const username = $('#profile-username').val();
    const phone = $('#profile-phone').val();
    const photoFile = $('#profile-photo').prop('files')[0];

    // Validate input
    if (!name || !username || !photoFile) {
        alert("Please fill out all required fields and upload a profile photo.");
        return;
    }

    // Upload profile photo
    const storageRef = storage.ref();
    const photoRef = storageRef.child(`profile_photos/${user.uid}/${photoFile.name}`);
    photoRef.put(photoFile)
    .then(snapshot => {
        return snapshot.ref.getDownloadURL();
    })
    .then(photoURL => {
        // Save profile data to Firestore
        return firestore.collection('profiles').doc(user.uid).set({
            name: name,
            username: username,
            phone: phone,
            photoURL: photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    })
    .then(() => {
        alert("Profile created successfully!");
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error("Error creating profile:", error);
        // Handle error
        alert("Error creating profile. Please try again.");
    });
});
