document.getElementById('comodines-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const comodinesSeleccionados = {};
    const players = document.querySelectorAll('.player-section');
    
    players.forEach((playerSection, index) => {
        const playerName = `player${index + 1}`;
        comodinesSeleccionados[playerName] = [];
        const inputs = playerSection.querySelectorAll('input:checked');
        inputs.forEach(input => {
            comodinesSeleccionados[playerName].push(input.value);
        });
    });

    // Obtener la configuración del juego desde localStorage
    let gameSettings = JSON.parse(localStorage.getItem('gameSettings'));

    // Si no existe gameSettings, crear un objeto vacío o redirigir
    if (!gameSettings) {
        alert("No se encontró la configuración del juego. Redirigiendo...");
        window.location.href = "../marathon"; // Redirige si no hay datos
        return;
    }

    // Agregar los comodines seleccionados a gameSettings
    gameSettings.comodines = comodinesSeleccionados;

    // Guardar el objeto gameSettings actualizado en localStorage
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    
    console.log(comodinesSeleccionados); // Aquí puedes enviar datos al servidor si es necesario.
    window.location.href = "/The_Anti-Cheat_Game/tablero/"; // Redirige a la siguiente pantalla.
});


// Obtén las rutas de las imágenes desde los atributos del body
let body = document.querySelector('body');
let cofre_cerrado = body.getAttribute('data-cofre-cerrado');
let cofre_poco_abierto = body.getAttribute('data-cofre-poco-abierto');
let cofre_abierto = body.getAttribute('data-cofre-abierto');

// Función para actualizar la imagen del cofre según el estado del checkbox
function actualizarImagenCofre(cofre, checkbox) {
    if (checkbox.checked) {
        // Si el checkbox está marcado, la imagen es "abierto"
        cofre.setAttribute("alt", "Cofre Abierto");
        cofre.setAttribute("src", cofre_abierto);
    } else {
        // Si el checkbox no está marcado, la imagen es "cerrado"
        cofre.setAttribute("alt", "Cofre Cerrado");
        cofre.setAttribute("src", cofre_cerrado);
    }
}

// Configura los eventos para cada cofre y su checkbox correspondiente
for (let i = 1; i <= 6; i++) {
    const cofre = document.getElementById(`cofre${i}`);
    const label = document.getElementById(`label${i}`);
    const checkbox = label.querySelector('input[type="checkbox"]'); // Obtener el input del label

    // Configurar el evento 'change' para actualizar la imagen cuando se seleccione el checkbox
    if (cofre && checkbox) {
        checkbox.addEventListener('change', function() {
            actualizarImagenCofre(cofre, checkbox);
        });

        // Si el checkbox ya está seleccionado al cargar la página, actualizar la imagen
        actualizarImagenCofre(cofre, checkbox);
    }

    // Agregar los eventos de mouseover y mouseleave solo si el checkbox NO está marcado
    if (cofre && label) {
        label.addEventListener('mouseover', function() {
            if (!checkbox.checked) {
                // Solo cambiar la imagen si el checkbox NO está marcado
                cofre.setAttribute("alt", "Cofre Poco Abierto");
                cofre.setAttribute("src", cofre_poco_abierto);
            }
        });

        label.addEventListener('mouseleave', function() {
            if (!checkbox.checked) {
                // Solo cambiar la imagen si el checkbox NO está marcado
                cofre.setAttribute("alt", "Cofre Cerrado");
                cofre.setAttribute("src", cofre_cerrado);
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Recuperar la configuración del juego desde localStorage
    const gameSettings = JSON.parse(localStorage.getItem('gameSettings'));
    console.log(gameSettings);

    if (!gameSettings || !gameSettings.difficulty) {
        alert("No se encontró la configuración del juego. Redirigiendo...");
        window.location.href = "../marathon"; // Redirigir si no hay datos
        return;
    }

    // Determinar el límite de comodines basado en la dificultad
    let maxComodines = 0;
    switch (gameSettings.difficulty.toLowerCase()) {
        case 'dificil':
            maxComodines = 1;
            break;
        case 'normal':
            maxComodines = 2;
            break;
        case 'fácil':
            maxComodines = 3;
            break;
        default:
            alert("Dificultad desconocida. Usando el valor predeterminado de 1 comodín.");
            maxComodines = 1;
    }

    // Seleccionar las secciones de cada jugador
    const playerSections = document.querySelectorAll('.player-section');

    playerSections.forEach(section => {
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        let selectedCount = 0;

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    // Incrementar el conteo si se selecciona un checkbox
                    selectedCount++;
                    if (selectedCount > maxComodines) {
                        alert(`Solo puedes seleccionar ${maxComodines} comodín(es) para cada jugador en el modo ${gameSettings.difficulty}.`);
                        this.checked = false; // Desmarcar el checkbox
                        selectedCount--; // Ajustar el conteo
                    }
                } else {
                    // Reducir el conteo si se desmarca un checkbox
                    selectedCount--;
                }
            });
        });
    });
});
