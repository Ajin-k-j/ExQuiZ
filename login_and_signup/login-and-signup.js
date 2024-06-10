document.getElementById("registerLink").addEventListener("click", function() {
    if (window.innerWidth <= 600) {
        document.getElementById("flip-card-inner").style.transform = 'rotateY(180deg)';
    }
});

document.getElementById("loginlink").addEventListener("click", function() {
    if (window.innerWidth <= 600) {
        document.getElementById("flip-card-inner").style.transform = 'rotateY(0deg)';
    }
});
