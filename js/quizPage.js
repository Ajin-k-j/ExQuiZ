// window.location.pathname.split('/').pop() === 'quizPage.html') {


// const questions = [
//     {
//         question : "Had food?",
//         answer : "Red board"
//     },
//     {
//         question : "We are committed to achieve organisation's growth.",
//         answer : "Autograph"
//     },
//     {
//         question : "I hum in the break room, a daily delight giving employees a much needed respile by turning beans into liquid gold.",
//         answer : "Coffee machine"
//     },
//     {
//         question : "I am the sign that says 'challenge your limits' with an arrow.",
//         answer : "Arrow"
//     },
//     {
//         question : "I am a sign that depicts with unity & trust, we conquer the peak, together we use even mountains we seek.",
//         answer : "Climbing up mountain"
//     },
//     {
//         question : "Where have you seen the symbol hope (S) from DC comics here in Experion.",
//         answer : "Superman"
//     },
//     {
//         question : "Something related to ISRO, here in Experion.",
//         answer : "Rocket"
//     },
//     {
//         question : "Fish, burger & soup.",
//         answer : "Wall food art"
//     },
//     {
//         question : "Puttu : Beaf :: Fish curry : ?",
//         answer : "Fish curry"
//     }
// ]

// const questions = [
//     "Had food? -> Red Board",
//     "We are committed to achieve organization's growth -> Autograph",
//     "I hum in the break room, a daily delight. Giving employees a much needed respite by turning beans into liquid gold -> Coffee Machine",
//     "I am the sign that says 'Challenge your limits' with an arrow -> Arrow",
//     "With unity & trust, we conquer the peak. Together we rise, even mountains we seek -> Climbing Up Mountain",
//     "Where have you seen the symbol of hope (S) from DC comics here in Experion -> Superman",
//     "Something related to ISRO here in Experion -> Rocket",
//     "Fish, burger & soup -> Wall Food Art",
//     "Puttu : Beef : : Fish Curry : ? -> Fish Curry",
//     "Without idli, there is no chutney. Without chutney, there is no idli -> Chutney",
//     "Where _ meets _ -> Stew",
//     "After John, I am the first one to know when someone enters the office -> Scanner",
//     "During breaks, I am your friend. A time to relax, a moment to spend filled with tea or coffee warm, I fit right in your palms' form. What am I? -> Tea Cup",
//     "Whenever you take a break, I remind you to be creative -> Creative",
//     "The yummiest irachi pidi -> Irachi Pidi",
//     "I'm red & ready, in case of a blaze, with a nozzle to spray & put out the craze -> Fire Extinguisher",
//     "The inseparable duo -> Puttu & Kadala"
// ];


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
// document.addEventListener('DOMContentLoaded', function () {
//     let questionCount = 3;      //change the question using this variable
//     printQuestions(questions,questionCount);
// });

// function printQuestions(questions,questionCount){
//     let fullMessage = questions[questionCount].question;
//     let characterTextElement = document.getElementById('character-text');
//     typeEffect(characterTextElement, fullMessage, 50);  // Adjust the delay for typing speed
// }




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
        // const questionContainer = document.getElementById("question-container");
        // const characterTextElement = document.getElementById("character-text");
        fullMessage = questions[currentQuestionIndex].split(" -> ")[0];
        typeEffect(characterTextElement, fullMessage, 50);

        // questionContainer.innerHTML = questions[currentQuestionIndex].split(" -> ")[0];
    } else {
        document.getElementById("score-container").style.display = "block";
        document.getElementById("score").textContent = score;
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

init();
