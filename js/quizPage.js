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

const questions = [];

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
    let initialText = "Click the button below to open your camera and see the first question";
    let initialTextBox = document.getElementById("character-text");
    typeEffect(initialTextBox, initialText, 20);

    const URL = "https://teachablemachine.withgoogle.com/models/K6tcbDhZH/";

    let model, webcam, labelContainer, maxPredictions;
    let score = 0;
    let currentQuestionIndex = 0;
    firestore.collection('quiz-questions').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                questions.push(doc.data());
            });
            console.log(questions); // Ensure questions are fetched
        })
        .catch(error => {
            console.error("Error fetching quiz questions:", error);
        });

    const startQuizButton = document.getElementById('camButton');
    startQuizButton.addEventListener('click', init);

    async function init() {
        let loadingCircle = document.getElementById("loadingCircle");
        let cameraButton = document.getElementById("camButton");
        let skipButton = document.getElementById("skipButton");
        let scoreDiv = document.getElementById('scoreHeader');
        let textBox = document.getElementById('character-message');
        cameraButton.classList.add("makeDisapear");
        loadingCircle.classList.remove("makeDisapear");
        let instDiv = document.getElementById("inst");

        instDiv.style.display = 'none';

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        if (webcam.play()) {
            loadingCircle.classList.add("makeDisapear");
            scoreDiv.classList.remove("makeDisapear");
            skipButton.querySelector('button').classList.remove("makeDisapear");
        }
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
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
            characterTextElement.innerHTML = " ";
            characterTextElement.style.color = "black";
            fullMessage = questions[currentQuestionIndex].question;
            typeEffect(characterTextElement, fullMessage, 10);
        } else if (currentQuestionIndex >= questions.length) {
            stopGame();
            
        }
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        let correct = false;

        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].className === questions[currentQuestionIndex].answer && prediction[i].probability > 0.865) {
                correct = true;
            }
        }

        if (correct) {
            let newMessage = "Correct!! Go to next question";
            let skipButton = document.getElementById("skipButton");
            let characterTextElement = document.getElementById('character-text');
            skipButton.classList.add("makeDisapear");
            characterTextElement.innerHTML = "";
            characterTextElement.style.color = "green";
            typeEffect(characterTextElement, newMessage, 50);

            score += 1;
            document.getElementById('score').textContent = score;
            document.getElementById("modalScore").textContent = score;
            document.getElementById("modalScoreEachQues").textContent = score;
            showModalCurrScore();

            currentQuestionIndex += 1;
        }
    }

    function skipQuestion() {
        if (document.getElementById('character-text').innerHTML == "Correct!! Go to next question") {
            showQuestion();
        } else {
            currentQuestionIndex += 1;
            showQuestion();
        }
    }

    function showFinalScore() {
        const finalScore = score;
        alert(`Your Final Score: ${finalScore}`);
        window.location.href = 'scoreCardHuntGame.html';
    }

    // Expose skipQuestion to global scope
    window.skipQuestion = skipQuestion;

    function stopGame() {
        webcam.stop();
        document.getElementById("webcam-container").style.display = "none";
        document.getElementById("skipButton").style.display = "none";
        document.getElementById("please-wait").style.display = "block"; // Show please wait message
        saveScore(user.uid, profileData.name, score);
        // showFinalScore();
    }

    // Modal
    function showModal() {
        $('#myModal').modal('show');
    }

    function showModalCurrScore() {
        $('#currentScoreModal').modal('show');
    }

    async function saveScore(uid, name, newScore) {
        const scoresRef = firestore.collection('HuntGame').doc(uid);

        try {
            const doc = await scoresRef.get();
            if (doc.exists) {
                const previousScore = doc.data().score;
                if (newScore > previousScore) {
                    await updateScore(scoresRef, uid, name, newScore);
                } else {
                    console.log("New score is not higher than the previous score. No update made.");
                    showFinalScore();
                }
            } else {
                await updateScore(scoresRef, uid, name, newScore);
            }
        } catch (error) {
            console.error("Error getting document:", error);
            document.getElementById("please-wait").style.display = "none"; // Hide please wait message on error
            alert("Error saving score. Please try again.");
        }
    }

    async function updateScore(scoresRef, uid, name, score) {
        try {
            await scoresRef.set({
                uid: uid,
                name: name,
                score: score,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Score saved successfully!");
            document.getElementById("please-wait").style.display = "none"; // Hide please wait message on success
            showFinalScore(); // Call showFinalScore after score is saved
        } catch (error) {
            console.error("Error saving score:", error);
            document.getElementById("please-wait").style.display = "none"; // Hide please wait message on error
            alert("Error saving score. Please try again.");
        }
    }

    document.getElementById("scoreCardPage").addEventListener('click', () => {
        window.location.href = 'scoreCardHuntGame.html';
    });
}
