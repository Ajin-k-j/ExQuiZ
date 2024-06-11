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

window.onload = function () {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            fetchUserProfile(user);
            document.getElementById('loader').style.display = 'none';
            document.getElementById('main-content').classList.remove('d-none');
        } else {
            window.location.href = 'signin.html'; // Redirect to sign-in page
        }
    });
};

// Function to fetch and display user profile
function fetchUserProfile(user) {
    const profileRef = firestore.collection('profiles').doc(user.uid);
    profileRef.get()
        .then(doc => {
            if (doc.exists) {
                const profileData = doc.data();
                startGame(user, profileData);
            } else {
                console.error("No such document!");
            }
        })
        .catch(error => {
            console.error("Error getting document:", error);
        });
}

function startGame(user, profileData) {
    // Typing effect function
    function typeEffect(element, text, delay = 100, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, delay);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    const URL = "https://teachablemachine.withgoogle.com/models/K6tcbDhZH/";

    let model, webcam, labelContainer, maxPredictions;
    let score = 0;
    let currentQuestionIndex = 0;
    const questions = [
        "Had food? -> Red Board",
        "We are committed to achieve organization's growth -> Autograph",
        "I hum in the break room, a daily delight. Giving employees a much needed respite by turning beans into liquid gold -> Coffee Machine",
        "I am the sign that says 'Challenge your limits' with an arrow -> Arrow",
        "With unity & trust, we conquer the peak. Together we rise, even mountains we seek -> Climbing Up Mountain",
        "Where have you seen the symbol of hope (S) from DC comics here in Experion -> Superman",
        "Something related to ISRO here in Experion -> Rocket",
        "Fish, burger & soup -> Wall Food Art",
        "Puttu : Beef : : Fish Curry : ? -> Fish Curry",
        "Without idli, there is no chutney. Without chutney, there is no idli -> Chutney",
        "Where _ meets _ -> Stew",
        "After John, I am the first one to know when someone enters the office -> Scanner",
        "During breaks, I am your friend. A time to relax, a moment to spend filled with tea or coffee warm, I fit right in your palms' form. What am I? -> Tea Cup",
        "Whenever you take a break, I remind you to be creative -> Creative",
        "The yummiest irachi pidi -> Irachi Pidi",
        "I'm red & ready, in case of a blaze, with a nozzle to spray & put out the craze -> Fire Extinguisher",
        "The inseparable duo -> Puttu & Kadala"
    ];

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }

        document.getElementById("loading-text").style.display = "none";
        showQuestion();
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const characterTextElement = document.getElementById("character-text");
            characterTextElement.innerHTML = "";
            const fullMessage = questions[currentQuestionIndex].split(" -> ")[0];
            typeEffect(characterTextElement, fullMessage, 50);
        } else {
            document.getElementById("score-section").style.display = "block";
            document.getElementById("score").textContent = score;
            stopGame();
        }
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        let correct = false;

        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].className === questions[currentQuestionIndex].split(" -> ")[1] && prediction[i].probability > 0.865) {
                labelContainer.childNodes[i].innerHTML = "Probability: " + prediction[i].probability.toFixed(2);
                correct = true;
            } else {
                labelContainer.childNodes[i].innerHTML = "";
            }
        }

        if (correct) {
            score += 1;
            currentQuestionIndex += 1;
            showQuestion();
        }
    }

    function skipQuestion() {
        currentQuestionIndex += 1;
        showQuestion();
    }

    // Expose skipQuestion to global scope
    window.skipQuestion = skipQuestion;

    function stopGame() {
        webcam.stop();
        document.getElementById("camera-section").style.display = "none";
        document.getElementById("skipButton").style.display = "none";
        document.getElementById("please-wait").style.display = "block"; // Show please wait message
        saveScore(user.uid, profileData.name, score);
    }

    function saveScore(uid, name, newScore) {
        const scoresRef = firestore.collection('HuntGame').doc(uid);

        scoresRef.get()
            .then(doc => {
                if (doc.exists) {
                    const previousScore = doc.data().score;
                    if (newScore > previousScore) {
                        updateScore(scoresRef, uid, name, newScore);
                    } else {
                        console.log("New score is not higher than the previous score. No update made.");
                        window.location.href = 'scoreCardHuntGame.html'; // Redirect to scoreCard page
                    }
                } else {
                    updateScore(scoresRef, uid, name, newScore);
                }
            })
            .catch(error => {
                console.error("Error getting document:", error);
                document.getElementById("please-wait").style.display = "none"; // Hide please wait message on error
                alert("Error saving score. Please try again.");
            });
    }

    function updateScore(scoresRef, uid, name, score) {
        scoresRef.set({
            uid: uid,
            name: name,
            score: score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("Score saved successfully!");
            window.location.href = 'scoreCardHuntGame.html'; // Redirect to scoreCard page
        }).catch(error => {
            console.error("Error saving score:", error);
            document.getElementById("please-wait").style.display = "none"; // Hide please wait message on error
            alert("Error saving score. Please try again.");
        });
    }

    init();
}
