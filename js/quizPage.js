// window.location.pathname.split('/').pop() === 'quizPage.html') {


const questions = [
    {
        question : "Had food?",
        answer : "Red board"
    },
    {
        question : "We are committed to achieve organisation's growth.",
        answer : "Autograph"
    },
    {
        question : "I hum in the break room, a daily delight giving employees a much needed respile by turning beans into liquid gold.",
        answer : "Coffee machine"
    },
    {
        question : "I am the sign that says 'challenge your limits' with an arrow.",
        answer : "Arrow"
    },
    {
        question : "I am a sign that depicts with unity & trust, we conquer the peak, together we use even mountains we seek.",
        answer : "Climbing up mountain"
    },
    {
        question : "Where have you seen the symbol hope (S) from DC comics here in Experion.",
        answer : "Superman"
    },
    {
        question : "Something related to ISRO, here in Experion.",
        answer : "Rocket"
    },
    {
        question : "Fish, burger & soup.",
        answer : "Wall food art"
    },
    {
        question : "Puttu : Beaf :: Fish curry : ?",
        answer : "Fish curry"
    }
]


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
    let questionCount = 3;      //change the question using this variable
    printQuestions(questions,questionCount);
});

function printQuestions(questions,questionCount){
    let fullMessage = questions[questionCount].question;
    let characterTextElement = document.getElementById('character-text');
    typeEffect(characterTextElement, fullMessage, 50);  // Adjust the delay for typing speed
}