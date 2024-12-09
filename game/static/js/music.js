document.addEventListener("DOMContentLoaded", function() {
    const audioElement = document.createElement("audio");
    audioElement.loop = false; // Desactivamos el loop para cambiar de canción cuando termine la actual
    document.body.appendChild(audioElement);

    // Lista de canciones
    const songs = [
        "../../static/music/Pirates_of_the_Coast.mp3",
        "../../static/music/Minstrel_of_the_Misty_Woods.mp3",
        "../../static/music/Dragon_Riders.mp3"
    ];

    // Intentar cargar la canción, el tiempo y el volumen previamente guardados en localStorage
    const savedSong = localStorage.getItem('currentSong');
    const savedTime = localStorage.getItem('currentTime');
    const savedVolume = localStorage.getItem('volume') !== null ? parseFloat(localStorage.getItem('volume')) : 1;

    let randomSong;
    if (savedSong) {
        // Si ya hay una canción guardada, usarla
        randomSong = savedSong;
    } else {
        // Si no hay una canción guardada, seleccionar aleatoriamente
        randomSong = songs[Math.floor(Math.random() * songs.length)];
    }

    // Guardar la canción seleccionada en localStorage
    localStorage.setItem('currentSong', randomSong);
    audioElement.src = randomSong;

    // Si hay un tiempo guardado, establecerlo en el audio
    if (savedTime) {
        audioElement.currentTime = parseFloat(savedTime);
    }

    // Establecer el volumen inicial desde localStorage (o el valor por defecto 1 si no hay guardado)
    audioElement.volume = savedVolume;

    // Reproducir la canción aleatoria
    audioElement.play().catch((error) => {
        console.log("Error al reproducir automáticamente:", error);
    });

    // Control del popup de configuración
    const configButton = document.getElementById("button_settings");
    const configPopup = document.getElementById("config-popup");
    const closePopupButton = document.getElementById("close-popup");

    if (configButton && configPopup) {
        configButton.addEventListener("click", () => {
            configPopup.style.display = "flex";
        });

        closePopupButton.addEventListener("click", () => {
            configPopup.style.display = "none";
        });
    }

    // Ajuste de volumen
    const volumeControl = document.getElementById("volume-control");
    const volumeIcon = document.getElementById("volume-icon");

    function updateVolumeIcon(volume) {
        if (volume === 0 || volume < 0.1) {
            volumeIcon.className = "fas fa-volume-mute";
        } else if (volume <= 0.3) {
            volumeIcon.className = "fas fa-volume-off";
        } else if (volume <= 0.6) {
            volumeIcon.className = "fas fa-volume-down";
        } else {
            volumeIcon.className = "fas fa-volume-up";
        }
    }

    updateVolumeIcon(savedVolume);

    if (volumeControl) {
        // Establecer el control de volumen al valor guardado
        volumeControl.value = savedVolume;
        
        volumeControl.addEventListener("input", (event) => {
            const newVolume = event.target.value;
            audioElement.volume = newVolume;

            // Guardar el volumen en localStorage
            localStorage.setItem('volume', newVolume);
            updateVolumeIcon(newVolume);
        });
    }

    // Guardar el tiempo actual de la canción cada vez que cambie
    audioElement.addEventListener('timeupdate', () => {
        localStorage.setItem('currentTime', audioElement.currentTime);
    });

    // Cambiar a una canción aleatoria cuando la actual termine
    audioElement.addEventListener('ended', function() {
        // Seleccionar una nueva canción aleatoria
        const newSong = songs[Math.floor(Math.random() * songs.length)];

        // Guardar la nueva canción en localStorage
        localStorage.setItem('currentSong', newSong);
        audioElement.src = newSong;

        // Reproducir la nueva canción
        audioElement.play().catch((error) => {
            console.log("Error al reproducir la nueva canción:", error);
        });
    });
});
