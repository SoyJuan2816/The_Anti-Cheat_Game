document.addEventListener("DOMContentLoaded", function() {
    let now = new Date(); // Obtiene la hora actual
    let hours = now.getHours(); // Obtiene la hora del sistema (0-23)
    let menuBG = document.getElementById("menu-container");

    // Obtiene las rutas de las imágenes pasadas desde el HTML
    let dayImage = menuBG.getAttribute('data-day-image');
    let afternoonImage = menuBG.getAttribute('data-afternoon-image');
    let nightImage = menuBG.getAttribute('data-night-image');

    // Cambiar la imagen dependiendo de la hora
    if (hours < 12 && hours >= 6) {
        // Mostrar imagen de día
        menuBG.style.backgroundImage = `url(${dayImage})`;
    } else if (hours >= 12 && hours < 20) {
        // Mostrar imagen de tarde
        menuBG.style.backgroundImage = `url(${afternoonImage})`;
    } else {
        // Mostrar imagen de noche
        menuBG.style.backgroundImage = `url(${nightImage})`;
    }
});
