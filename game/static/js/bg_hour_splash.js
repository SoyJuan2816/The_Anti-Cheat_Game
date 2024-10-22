// bg_hour_splash.js
document.addEventListener("DOMContentLoaded", function() {
    let now = new Date(); // Obtiene la hora actual
    let hours = now.getHours(); // Obtiene la hora del sistema (0-23)
    let splashContainer = document.getElementById("splash-container");
    let progressContainer = document.querySelector(".progress-container");

    let body = document.querySelector('body');

    // Rutas de body
    let body_day = body.getAttribute('data-day-image');
    let body_afternoon = body.getAttribute('data-afternoon-image');
    let body_night = body.getAttribute('data-night-image');

    // Obtiene las rutas de las imágenes pasadas desde el HTML
    let dayImage = splashContainer.getAttribute('data-day-image');
    let afternoonImage = splashContainer.getAttribute('data-afternoon-image');
    let nightImage = splashContainer.getAttribute('data-night-image');

    // Cambiar la imagen dependiendo de la hora
    if (hours < 12 && hours >= 6) {
        // Mostrar imagen de día
        body.style.backgroundImage = `url(${body_day})`;
        splashContainer.style.backgroundImage = `url(${dayImage})`;
        progressContainer.style.backgroundColor = "#7c1818";
    } else if (hours >= 12 && hours < 20) {
        // Mostrar imagen de tarde
        body.style.backgroundImage = `url(${body_afternoon})`;
        splashContainer.style.backgroundImage = `url(${afternoonImage})`;
        progressContainer.style.backgroundColor = "rgb(211 41 41)";
    } else {
        // Mostrar imagen de noche
        body.style.backgroundImage = `url(${body_night})`;
        splashContainer.style.backgroundImage = `url(${nightImage})`;
        progressContainer.style.backgroundColor = "rgb(210 17 220)";
    }
});
