document.addEventListener("DOMContentLoaded", function() {
    // Control del popup de configuración
    const configButton = document.getElementById("button_settings");
    const configPopup = document.getElementById("config-popup");
    const closePopupButton = document.getElementById("close-popup");

    // Función para cerrar el popup
    function closePopup() {
        configPopup.style.display = "none";
    }

    if (configButton && configPopup) {
        configButton.addEventListener("click", () => {
            configPopup.style.display = "flex";
        });

        // Cerrar al hacer clic en el botón de cierre
        closePopupButton.addEventListener("click", closePopup);

        // Cerrar al hacer clic fuera del contenido del popup
        configPopup.addEventListener("click", (event) => {
            if (event.target === configPopup) {
                closePopup();
            }
        });

        // Cerrar al presionar la tecla Esc
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closePopup();
            }
        });
    }
});

function popup(){
    configButton.addEventListener("click", () => {
        configPopup.style.display = "flex";
    });

    // Cerrar al hacer clic en el botón de cierre
    closePopupButton.addEventListener("click", closePopup);

    // Cerrar al hacer clic fuera del contenido del popup
    configPopup.addEventListener("click", (event) => {
        if (event.target === configPopup) {
            closePopup();
        }
    });

    // Cerrar al presionar la tecla Esc
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePopup();
        }
    });
}