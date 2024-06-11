document.addEventListener("DOMContentLoaded", function() {
    const flipCardInner = document.querySelector('.flip-card-inner');
    const flipToSignupLink = document.getElementById('flip-to-signup');
    const flipToSigninLink = document.getElementById('flip-to-signin');

    flipToSignupLink.addEventListener('click', function(event) {
        event.preventDefault();
        flipCardInner.style.transform = 'rotateY(180deg)';
    });

    flipToSigninLink.addEventListener('click', function(event) {
        event.preventDefault();
        flipCardInner.style.transform = 'rotateY(0deg)';
    });
});
