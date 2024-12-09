document.addEventListener('DOMContentLoaded', function () {
    // Obtener el botón "Continuar" y el formulario
    const playButton = document.getElementById('playbtn');
    const form = document.querySelector('form');

    playButton.addEventListener('click', function (event) {
        // Prevenir que el formulario se envíe automáticamente
        event.preventDefault();

        // Obtener los valores seleccionados
        const map = form.querySelector('#map-select').value;
        const size = form.querySelector('#size-select').value;
        const difficulty = form.querySelector('#difficult-select').value;
        const mode = form.querySelector('#mode-select').value;
        const player1 = form.querySelector('#player_1').value.trim();
        const player2 = form.querySelector('#player_2').value.trim();

        // Verificar que los campos de nombres de jugadores no estén vacíos
        if (!player1 || !player2) {
            alert('Por favor, ingresa los nombres de ambos jugadores antes de continuar.');
            return; // Detener ejecución si falta algún nombre
        }

        // Guardar los valores en localStorage
        localStorage.setItem('gameSettings', JSON.stringify({
            map: map,
            size: size,
            difficulty: difficulty,
            mode: mode,
            player1: player1,
            player2: player2
        }));

        // Redirigir al siguiente paso
        form.submit(); // Si necesitas enviar el formulario al servidor
    });
});
