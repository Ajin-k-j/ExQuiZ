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
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// Fetch current user's profile data
auth.onAuthStateChanged(user => {
    if (user) {
        // Fetch the user's profile data
        firestore.collection("profiles").doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    const profileData = doc.data();
                    // Populate the form fields with existing data
                    document.getElementById('profile-name').value = profileData.name;
                    document.getElementById('profile-username').value = profileData.username;
                    document.getElementById('profile-phone').value = profileData.phone ? profileData.phone : '';
                    // Display profile picture
                    if (profileData.photoURL) {
                        document.getElementById('profile-picture').setAttribute('src', profileData.photoURL);
                    }
                } else {
                    console.log("No such document!");
                }
            })
            .catch(error => {
                console.log("Error getting document:", error);
            });
    } else {
        console.log("No user is signed in.");
    }
});

// Handle Profile Form Submission for updating profile
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const user = auth.currentUser;
    if (!user) {
        alert("You need to be signed in to update your profile.");
        return;
    }

    const name = document.getElementById('profile-name').value;
    const username = document.getElementById('profile-username').value;
    const phone = document.getElementById('profile-phone').value;
    const photoFile = document.getElementById('profile-photo').files[0];

    // Show loading text
    document.getElementById('loading-text').style.display = 'block';

    // Update profile data in Firestore
    const profileData = {
        name: name,
        username: username,
        phone: phone
    };

    // Check if a new profile picture was selected
    if (photoFile) {
        // Reference to the user's profile picture in storage
        const storageRef = storage.ref();
        const profilePicRef = storageRef.child(`profile_photos/${user.uid}`);

        // Check if there is an existing profile picture
        profilePicRef.listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                // Delete the existing profile picture
                itemRef.delete().then(function() {
                    console.log("Existing profile picture deleted successfully");
                }).catch(function(error) {
                    console.error("Error deleting existing profile picture:", error);
                });
            });

            // Upload new profile picture
            const photoRef = storageRef.child(`profile_photos/${user.uid}/${photoFile.name}`);
            photoRef.put(photoFile)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();
                })
                .then(photoURL => {
                    profileData.photoURL = photoURL;
                    updateProfile(user.uid, profileData);
                })
                .catch(error => {
                    console.error("Error uploading profile picture:", error);
                    alert("Error uploading profile picture. Please try again.");
                });
        }).catch(function(error) {
            console.error("Error listing existing profile pictures:", error);
        });
    } else {
        // If no new profile picture was selected, only update profile data
        updateProfile(user.uid, profileData);
    }
});

// Function to update profile data in Firestore
function updateProfile(userId, data) {
    firestore.collection('profiles').doc(userId).update(data)
        .then(() => {
            alert("Profile updated successfully!");
            window.location.href = "profile.html"; // Redirect to profile page
        })
        .catch(error => {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Please try again.");
        })
        .finally(() => {
            // Hide loading text after update is complete
            document.getElementById('loading-text').style.display = 'none';
        });
}
