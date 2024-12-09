document.addEventListener("DOMContentLoaded", function() {
    const marathonButton = document.getElementById("button_marathon");
    const learnButton = document.getElementById("button_learn");
    const splitScreen = document.getElementById("split-screen");
    const body = document.querySelector('body');

    // Al hacer clic en el botón de "Maratón"
    marathonButton.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el enlace redirija inmediatamente
        splitScreen.classList.add("split-open"); // Activar la animación de división
        setTimeout(function() {
            window.location.href = '../marathon/';
        }, 800); // Esperar el tiempo de la animación (0.8s)
    });

    // Al hacer clic en el botón de "Aprende"
    learnButton.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el enlace redirija inmediatamente
        splitScreen.classList.add("split-open"); // Activar la animación de división
        body.classList.add("bg-learn");
        setTimeout(function() {
            window.location.href = '../learn/0/';
        }, 800); // Esperar el tiempo de la animación (0.8s)
    });
});
