const characterTextElement = document.getElementById("character-text");
const fullMessage = "Hey User, How Was Your Experience Using ExQuiZ? Please Give Us Your Feedback So That We Can Improve The App :)"

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

typeEffect(characterTextElement, fullMessage, 30)