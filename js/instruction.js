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

// Content loading for character message
document.addEventListener('DOMContentLoaded', function () {
    let fullMessage = "Scroll down for the game instructions. Go through the complete instruction and understand the game.";
    let characterTextElement = document.getElementById('character-text');
    typeEffect(characterTextElement, fullMessage, 50);     //change the question using this variable
});