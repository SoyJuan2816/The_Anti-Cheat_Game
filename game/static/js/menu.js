// menu.js
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el botón de jugar por su id
    let playButton = document.getElementById("button_play");

    // Agregar un listener para detectar el click
    playButton.addEventListener("click", function() {
        // Redirigir a la página de jugar
        window.location.href = '../select_mode/';
    });
});
