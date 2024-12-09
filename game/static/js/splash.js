document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play-button");
    const textInstruction = document.getElementById("textInstruction");
    const progressBarContainer = document.querySelector(".progress-container");
    const progressBar = document.getElementById("progress-bar");
    const audioElement = document.getElementById("background-music");
    const songs = [
        "../../static/music/Pirates_of_the_Coast.mp3",
        "../../static/music/Minstrel_of_the_Misty_Woods.mp3",
        "../../static/music/Dragon_Riders.mp3"
    ];

    localStorage.removeItem("currentSong");

    // Cargar configuraciones de música desde localStorage
    const savedSong = localStorage.getItem('currentSong');
    const savedTime = localStorage.getItem('currentTime');
    const savedVolume = localStorage.getItem('volume') !== null ? parseFloat(localStorage.getItem('volume')) : 1;
    let currentSong = savedSong || songs[Math.floor(Math.random() * songs.length)];

    // Configurar audio
    audioElement.src = currentSong;
    audioElement.volume = savedVolume;
    if (savedTime) {
        audioElement.currentTime = parseFloat(savedTime);
    }

    // Actualizar almacenamiento al cambiar de canción o posición
    audioElement.addEventListener('timeupdate', () => {
        localStorage.setItem('currentTime', audioElement.currentTime);
    });

    audioElement.addEventListener('ended', () => {
        currentSong = songs[Math.floor(Math.random() * songs.length)];
        localStorage.setItem('currentSong', currentSong);
        audioElement.src = currentSong;
        audioElement.play().catch((error) => console.log("Error al reproducir nueva canción:", error));
    });

    // Mostrar barra de progreso y comenzar la música al hacer clic en "Jugar"
    playButton.addEventListener("click", function() {
        localStorage.removeItem("currentSong");
        
        
        progressBarContainer.style.display = "block";
        audioElement.play().catch((error) => console.log("Error al reproducir música:", error));

        let width = 0;
        const loading = setInterval(() => {
            if (width >= 100) {
                clearInterval(loading);
                document.querySelector(".splash-container").classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = "home/";
                }, 500);
            } else {
                width++;
                progressBar.style.width = width + "%";
            }
        }, 50);
    });

    playButton.addEventListener('mouseover', function() {
        // Aplicamos la transición de desvanecimiento
        textInstruction.style.transition = 'opacity 1s ease-out'; // 1 segundo de duración
        textInstruction.style.opacity = 0; // Cambiamos la opacidad a 0
    
        // Después de la transición (1 segundo), lo ocultamos completamente
        setTimeout(() => {
            textInstruction.style.display = "none"; // Cambiar display a none para que no ocupe espacio
        }, 1000); // 1000ms es el mismo tiempo que la transición de opacidad
    });
});
