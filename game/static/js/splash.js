 // Simula la carga con una barra de progreso
 document.addEventListener("DOMContentLoaded", function() {
    let progressBar = document.getElementById("progress-bar");
    let width = 0;
    let loading = setInterval(function() {
        if (width >= 100) {
            clearInterval(loading);
            // Cuando la barra se completa, hacemos la transición y redirigimos
            document.querySelector(".splash-container").classList.add("fade-out");
            setTimeout(function() {
                window.location.href = "home/";
            }, 500);  // Tiempo de espera para la animación
        } else {
            width++;
            progressBar.style.width = width + "%";
        }
    }, 50);  // Simulación del tiempo de carga
});