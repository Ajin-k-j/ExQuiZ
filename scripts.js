// Ensure all files are loaded before displaying the main content
window.onload = function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').classList.remove('d-none');
};

// Typing effect function
function typeEffect(element, text, delay = 100) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
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
