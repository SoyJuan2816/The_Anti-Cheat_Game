document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const diceResult = document.getElementById("dice-result");
    const currentTurn = document.getElementById("current-turn");
    const player1Element = document.getElementById("player1");
    const player2Element = document.getElementById("player2");
    const rollDiceButton = document.getElementById("roll-dice-btn");

    // Popup Winner
    // Seleccionar elementos del popup
    const winnerPopup = document.getElementById("winner-popup");
    const winnerMessage = document.getElementById("winner-message");
    const closePopupButton = document.getElementById("close-popup");

    // Función para mostrar el popup
    function showWinnerPopup(winnerName) {
        winnerMessage.textContent = `Felicidades, el ganador es ${winnerName}`;
        winnerPopup.classList.remove("hidden");
    }

    // Cerrar el popup cuando se haga clic en el botón de cerrar
    closePopupButton.addEventListener("click", () => {
        winnerPopup.classList.add("hidden");
        window.location.href = '../home/';
    });

    // determinar un ganador
    function checkWinner() {
        if(players[0].position >= boardSize || players[1].position >= boardSize){
            // Desactivar botones de preguntas:
            document.getElementById('easy').disabled = true;
            document.getElementById('medium').disabled = true;
            document.getElementById('hard').disabled = true;
            clearInterval(gameTimerInterval); // Detener la actualización del temporizador visual
            if(players[0].position > players[1].position){
                showWinnerPopup(players[1].name)
            }
            if(players[1].position > players[0].position){
                showWinnerPopup(players[0].name)
            }
        }
    }

    // Cargar configuración del tablero desde las cookies
    const itemsCookies = JSON.parse(localStorage.getItem('gameSettings'));
    console.log(itemsCookies.mode)
    const timeLimits = {
        Fácil: 15,
        Normal: 10,
        Difícil: 5
    };

    let gameTimerInterval;
    let timer; // Variable global para almacenar el temporizador

    const players = [
        { id: "player1", name: "Jugador 1", position: 20, color: "red", diceRoll: 0 , comodin: itemsCookies.comodines.player1 },
        { id: "player2", name: "Jugador 2", position: 0, color: "blue", diceRoll: 0, comodin: itemsCookies.comodines.player2 },
    ];

    let currentPlayerIndex = 0;
    let boardSize = 25; // Default number of cells
    let columns = 5; // Default number of columns (for smaller board)
    let comodinSteps = 1;
    let correctlyAnsweredQuestions = []; // Preguntas respondidas correctamente

    if (itemsCookies && itemsCookies.size === '80 casillas') {
        boardSize = 80;
    }

    if (itemsCookies && itemsCookies.size === '50 casillas') {
        boardSize = 50;
    }

    // Selección de mapas
    if (itemsCookies.map === 'Aleatorio'){
        const bgTab = [
            '/static/img/bgTablero/barco_pirata.jpg',
            '/static/img/bgTablero/fondo_oceano.jpg',
            '/static/img/bgTablero/isla_embrujada.jpg',
            '/static/img/bgTablero/isla_tesoro.jpg',
        ];

        const bgRandom = Math.floor(Math.random() * bgTab.length)
        document.body.style.backgroundImage = `url(${bgTab[bgRandom]})`;
    }

    if (itemsCookies.map === 'Barco de barba roja'){
        document.body.style.backgroundImage = `url(/static/img/bgTablero/barco_pirata.jpg)`;
    }
    
    if (itemsCookies.map === 'Fondo del oceano'){
        document.body.style.backgroundImage = `url(/static/img/bgTablero/fondo_oceano.jpg)`;
    }

    if (itemsCookies.map === 'Isla embrujada'){
        document.body.style.backgroundImage = `url(/static/img/bgTablero/isla_embrujada.jpg)`;
    }

    if (itemsCookies.map === 'Isla del tesoro'){
        document.body.style.backgroundImage = `url(/static/img/bgTablero/isla_tesoro.jpg)`;
    }

    // Cargar las posiciones de los jugadores desde las cookies
    loadPlayerPositions();
    loadPlayerNamesFromCookies();

    // Generar el tablero con el tamaño configurado
    generateBoard(boardSize);

    // Función para generar el tablero dinámicamente con las filas alternadas
    function generateBoard(size) {
        board.innerHTML = ""; // Limpiar tablero previo
        const colors = ["#FFA07A", "#FFD700", "#98FB98", "#AFEEEE", "#DDA0DD"];
        columns = size <= 25 ? 5 : size <= 50 ? 7 : 10; // Configurar columnas dinámicas

        board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        const rows = Math.ceil(size / columns); // Calcular la cantidad de filas necesarias
        let cells = [];

        // Crear las celdas con el orden alternado
        for (let i = 1; i <= size; i++) {
            cells.push(i);
        }

        for (let row = 0; row < rows; row++) {
            const rowStartIndex = row * columns;
            const rowEndIndex = Math.min((row + 1) * columns, size);

            const rowCells = cells.slice(rowStartIndex, rowEndIndex);

            // Si es una fila impar, invertir el orden de las casillas (NO SIRVE CORRECTAMENTE PARA AVANZAR Y/O RETROCEDER)
            /*if (row % 2 !== 0) {
                rowCells.reverse();
            }*/

            rowCells.forEach((cellNumber) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.textContent = cellNumber;
                cell.style.backgroundColor = colors[(cellNumber - 1) % colors.length];
                cell.style.borderRadius = '5rem';
                cell.onclick = () => selectCell(cellNumber); // Detectar selección de casillas
                board.appendChild(cell);
            });
        }

        // Agregar "Start" en la primera casilla (casilla 1)
        const firstCell = board.querySelector(".cell:first-child");
        if (firstCell) {
            //firstCell.textContent = "Start";
            firstCell.textContent = "";
            firstCell.style.backgroundImage = `url('/static/img/start-icon.png')`; // Puedes poner una imagen de inicio si lo deseas
            firstCell.style.backgroundSize = "90%";
            firstCell.style.backgroundRepeat = "no-repeat";
            firstCell.style.backgroundPosition = "center";
        }

        // Agregar "Meta" en la última casilla (casilla size)
        const lastCell = board.querySelector(`.cell:nth-child(${size})`);
        if (lastCell) {
            //lastCell.textContent = "Meta";
            lastCell.textContent = "";
            lastCell.style.backgroundImage = `url('/static/img/flag-icon.png')`; // Puedes poner una imagen de meta si lo deseas
            lastCell.style.backgroundSize = "70%";
            lastCell.style.backgroundRepeat = "no-repeat";
            lastCell.style.backgroundPosition = "center";
        }
    }

    // Función para manejar la selección de una casilla
    function selectCell(cellNumber) {
        // Si la casilla ya fue seleccionada, la deselecciona
        const selectedCell = document.querySelector(`.cell[data-cell='${cellNumber}']`);
        if (selectedCell) {
            selectedCell.classList.remove("selected");
            delete selectedCell.dataset.selected;
        } else {
            // Si la casilla no ha sido seleccionada, la selecciona
            const cell = document.querySelector(`.cell:nth-child(${cellNumber})`);
            cell.classList.add("selected");
            cell.dataset.selected = true;
        }
        
        // Guardar las selecciones en las cookies
        saveSelectionsToCookies();
    }

    // Guardar las selecciones de las casillas en las cookies
    function saveSelectionsToCookies() {
        const selectedCells = [];
        const allCells = document.querySelectorAll(".cell");
        allCells.forEach((cell, index) => {
            if (cell.dataset.selected) {
                selectedCells.push(index + 1); // Guardar la casilla seleccionada
            }
        });

        document.cookie = `selectedCells=${JSON.stringify(selectedCells)}; path=/; max-age=31536000`; // 1 año de expiración
    }

    // Cargar las selecciones de las casillas desde las cookies
    function loadPlayerPositions() {
        const cookies = document.cookie.split("; ");
        const selectedCellsCookie = cookies.find(cookie => cookie.startsWith("selectedCells="));
        if (selectedCellsCookie) {
            const selectedCells = JSON.parse(selectedCellsCookie.split("=")[1]);
            if (selectedCells && selectedCells.length > 0) {
                // Marcar las casillas como seleccionadas desde las cookies
                selectedCells.forEach(cellNumber => {
                    const cell = document.querySelector(`.cell:nth-child(${cellNumber})`);
                    if (cell) {
                        cell.classList.add("selected");
                        cell.dataset.selected = true;
                    }
                });
            }
        }
    }

    // Cargar los nombres de los jugadores desde las cookies
    function loadPlayerNamesFromCookies() {
        const player1Name = itemsCookies.player1;
        const player2Name = itemsCookies.player2;

        if (player1Name) {
            player1Element.textContent = `Jugador 1: ${player1Name}`;
            players[0].name = player1Name;
        }

        if (player2Name) {
            player2Element.textContent = `Jugador 2: ${player2Name}`;
            players[1].name = player2Name;
        }

        
    }

    // Función para lanzar el dado y determinar el primer turno
    window.rollDice = function () {
        // Lanzar el dado para cada jugador
        players.forEach(player => {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            player.diceRoll = diceValue;
        });

        // Mostrar los resultados de los dados
        diceResult.textContent = `Resultado del dado: ${itemsCookies.player1}: ${players[0].diceRoll} - ${itemsCookies.player2}: ${players[1].diceRoll}`;

        // Determinar quién empieza, basándose en el dado
        if (players[0].diceRoll > players[1].diceRoll) {
            currentPlayerIndex = 0;
        } else if (players[0].diceRoll < players[1].diceRoll) {
            currentPlayerIndex = 1;
        } else {
            // En caso de empate, volver a lanzar el dado
            diceResult.textContent += " (Empate, tirando nuevamente...)";
            return; // Volver a tirar el dado
        }

        // Llamar a la función para iniciar el temporizador
        startTimer();

        // Actualizar el turno
        currentTurn.textContent = `Turno de: ${players[currentPlayerIndex].name}`;

        // Activar botones de preguntas:
        document.getElementById('easy').disabled = false;
        document.getElementById('medium').disabled = false;
        document.getElementById('hard').disabled = false;

        // Desactivar el botón de lanzar dado una vez que se ha decidido el turno
        rollDiceButton.style.visibility = 'hidden';
    };

    const easyButton = document.querySelector(".easy");
    const mediumButton = document.querySelector(".medium");
    const hardButton = document.querySelector(".hard");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("question-text");
    const optionsContainer = document.getElementById("popup-options");
    const answerPopup = document.getElementById("answer-popup");
    const answerMessage = document.getElementById("answer-message");

    let questionsData = {}; // Inicializamos una variable para almacenar los datos

    // Definimos una función asincrónica para leer el archivo JSON
    async function loadQuestions() {
    try {
        const response = await fetch('/static/data/qF.json'); // Esperamos la respuesta
        if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
        }
        questionsData = await response.json(); // Esperamos que se parseen los datos JSON
        //console.log(questionsData); // Ahora puedes usar questionsData aquí
        questionsData.questions.forEach(question => {
        //console.log(question.question); // Accedemos a las preguntas
        });
    } catch (error) {
        console.error('Error:', error); // Manejo de errores
    }
    }

    // Llamamos a la función para cargar los datos
    loadQuestions();

    function updatePlayerPosition(playerIndex, steps) {
        const player = players[playerIndex];
        const boardCells = document.querySelectorAll(".cell");

        // Limpiar la celda anterior
        if (player.position > 0 && player.position <= boardCells.length) {
            boardCells[player.position - 1].style.border = "1px solid #000";  // Borde por defecto
        }

        // Actualizar posición
        player.position = Math.min(player.position + steps, boardCells.length);

        // Colorear la nueva posición
        if (player.position > 0) {
            boardCells[player.position - 1].style.border = `3px solid ${player.color}`;
        }
        
        if (player.position < 0){
            player.position = 0;
        }

        checkWinner();

        currentTurn.textContent = `Turno de: ${players[playerIndex].name}`;
    }
    
    function useComodin(index, player, questionData) {
        const usedComodin = player.comodin.splice(index, 1)[0]; // Remover comodín usado
        // Actualizar la interfaz de usuario para eliminar el comodín
        
        const comodinDiv = document.querySelectorAll(".comodin-div");
        if (comodinDiv[index]) {
            comodinDiv[index].remove(); // Eliminar el botón del comodín usado
        }
    
        if (usedComodin === "Cambio de Pregunta"){
            // Obtener una nueva pregunta de la misma dificultad
            const newQuestion = getQuestionByDifficulty(questionData.difficulty);
            
            console.log(newQuestion.difficulty)
            if(newQuestion.difficulty === 'Fácil'){
                showPopup("Nueva pregunta seleccionada con el comodín", "#90EE90", newQuestion);
            }
            if(newQuestion.difficulty === 'Intermedio'){
                showPopup("Nueva pregunta seleccionada con el comodín", "#FFD700", newQuestion);
            }
            if(newQuestion.difficulty === 'Difícil'){
                showPopup("Nueva pregunta seleccionada con el comodín", "#FF6347", newQuestion);
            }

            // Actualizar la pregunta actual con la nueva
            questionData.question = newQuestion.question;
            questionData.correctAnswer = newQuestion.correctAnswer;
            questionData.options = newQuestion.options;
        }

        if(usedComodin === "Respuesta"){
            showAnswerPopup(`La respuesta correcta era: ${questionData.correctAnswer}`, "correct");
            return;
        }

        if(usedComodin === "Duplicar Avance"){
            comodinSteps = 2;
        }
    }

    // Mezclar las respuestas
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }    

    function showPopup(message, color, questionData) {
        popupMessage.textContent = `${questionData.question}`;
        popup.style.display = "flex";
        popup.style.backgroundColor = color;
    
        optionsContainer.innerHTML = "";
        const shuffledOptions = shuffleArray([...questionData.options]);

        shuffledOptions.forEach((option) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.classList.add("option-button");
            optionButton.addEventListener("click", () => {
                clearTimeout(timer); // Detener el temporizador si se selecciona una respuesta
                clearInterval(timerInterval); // Detener la actualización del temporizador visual
                handleOptionClick(option, questionData.correctAnswer, questionData)
            });
            optionsContainer.appendChild(optionButton);
        });
    
        // Mostrar los comodines del jugador en turno
        const comodinesContainer = document.getElementById("popup-comodines");
        comodinesContainer.innerHTML = ""; // Limpiar los comodines previos
        const currentPlayer = players[currentPlayerIndex];
    
        if (!Array.isArray(currentPlayer.comodin)) {
            console.error("Error: Los comodines del jugador actual no están definidos correctamente.", currentPlayer);
            return;
        }
    
        currentPlayer.comodin.forEach((comodin, index) => {
            const comodinImage = document.createElement("img");
            const comodinText = document.createElement("text");
            const comodinDiv = document.createElement("div");
            comodinText.textContent = comodin;
            comodinImage.classList.add("comodin-img");
            comodinText.classList.add("comodin-text");
            comodinDiv.classList.add("comodin-div");
            comodinDiv.appendChild(comodinImage);
            comodinDiv.appendChild(comodinText);
            comodinImage.addEventListener("click", () => useComodin(index, currentPlayer, questionData));
            comodinesContainer.appendChild(comodinDiv);
        });

        // Obtener el tiempo límite según la configuración del juego
        const difficultyLevel = itemsCookies.difficulty; // Ejemplo: Fácil, Normal, Difícil
        const timeLimit = timeLimits[difficultyLevel] || 10; // Predeterminado: 10 segundos

         // Inicializar el temporizador visual
        const timerValueElement = document.getElementById("timer-value");
        timerValueElement.textContent = timeLimit;

        let remainingTime = timeLimit;
        const timerInterval = setInterval(() => {
            remainingTime--;
            timerValueElement.textContent = remainingTime;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);

        // Iniciar el temporizador
        timer = setTimeout(() => {
            // Si se acaba el tiempo, considerar como incorrecta
            showAnswerPopup("¡Tiempo agotado! La respuesta se considera incorrecta.", "incorrect");

            // Cambiar turno al siguiente jugador
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            updatePlayerPosition(currentPlayerIndex, -1); // Penalizar con -1 paso

            // Cerrar el popup después de un segundo
            setTimeout(() => {
                popup.style.display = "none";
            }, 1000);
        }, timeLimit * 1000);
    }
    

    function handleOptionClick(selectedOption, correctAnswer, questionData) {
        clearTimeout(timer); // Detener el temporizador
        const allOptionButtons = document.querySelectorAll(".option-button");
        allOptionButtons.forEach((button) => (button.disabled = true));
        
        let steps = 0;
        if (selectedOption === correctAnswer) {
            showAnswerPopup("¡Correcto!", "correct");
            if (questionData.difficulty === "Fácil") steps = (1 * comodinSteps);
            if (questionData.difficulty === "Intermedio") steps = (2 * comodinSteps);
            if (questionData.difficulty === "Difícil") steps = (3 * comodinSteps);
            // Agregar la pregunta al arreglo si fue respondida correctamente
            correctlyAnsweredQuestions.push(questionData.question);
        } else {
            showAnswerPopup('Respuesta Incorrecta', "incorrect");
            if (questionData.difficulty === "Fácil"){
                steps = (-1 * comodinSteps);
            }
            if (questionData.difficulty === "Intermedio"){
                steps = (-2 * comodinSteps);
            }
            if (questionData.difficulty === "Difícil"){
                steps = (-3 * comodinSteps);
            }
        }
        
        // Resetear comodinSteps a su valor inicial después de usarlo
        comodinSteps = 1;
        
        // Cambiar turno al siguiente jugador
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        // Actualizar la posición del jugador actual
        updatePlayerPosition(currentPlayerIndex, steps);


        // Cerrar el popup principal después de 1 segundo
        setTimeout(() => {
            popup.style.display = "none";
        }, 1000);
    }

    function showAnswerPopup(message, resultType) {
        answerMessage.textContent = message;
        answerPopup.classList.remove("correct", "incorrect");
        answerPopup.classList.add(resultType);
        answerPopup.style.display = "block";
        answerPopup.style.opacity = "1";

        setTimeout(() => {
            answerPopup.style.opacity = "0";
            setTimeout(() => {
                answerPopup.style.display = "none";
            }, 1000);
        }, 2000);
    }

    function getQuestionByDifficulty(difficulty) {
        // Filtrar las preguntas por dificultad y que no estén en correctlyAnsweredQuestions
        const questions = questionsData.questions.filter(q => 
            q.difficulty === difficulty && !correctlyAnsweredQuestions.includes(q.question)
        );
    
        // Si no quedan preguntas disponibles, mostrar mensaje y detener el flujo
        if (questions.length === 0) {
            alert("¡No hay más preguntas disponibles para esta dificultad!");
            return null; // Retorna null si no hay preguntas disponibles
        }
    
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    easyButton.addEventListener("click", function() {
        const questionData = getQuestionByDifficulty("Fácil");
        if (questionData) {
            showPopup("Dificultad: FÁCIL", "#90EE90", questionData);
        }
    });
    
    mediumButton.addEventListener("click", function() {
        const questionData = getQuestionByDifficulty("Intermedio");
        if (questionData) {
            showPopup("Dificultad: INTERMEDIO", "#FFD700", questionData);
        }
    });
    
    hardButton.addEventListener("click", function() {
        const questionData = getQuestionByDifficulty("Difícil");
        if (questionData) {
            showPopup("Dificultad: DIFÍCIL", "#FF6347", questionData);
        }
    });    

    const gameModeElement = document.getElementById("game-mode");
    const gameTimerElement = document.getElementById("game-timer");

    // Configurar el modo de juego desde las cookies
    const mode = itemsCookies.mode || "Juego Rápido"; // Valor por defecto si no está en cookies
    gameModeElement.textContent = `Modo de juego: ${mode}`;

    // Tiempo total basado en el modo de juego
    let totalTime = 0; // En segundos
    if (mode === "Juego Rápido (5 minutos)") {
        totalTime = 5 * 60; // 5 minutos en segundos
    } else if (mode === "Divertido (10 minutos)") {
        totalTime = 10 * 60; // 10 minutos en segundos
    }else{
        totalTime = -1;
        gameTimerElement.style.visibility = 'hidden'
    }

    // Actualizar el temporizador visualmente
    function updateTimerDisplay() {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        gameTimerElement.textContent = `Tiempo restante: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Temporizador decreciente
    function startTimer(){
        gameTimerInterval = setInterval(() => {
            if (!isPaused && totalTime > 0) {
                totalTime--;
                updateTimerDisplay();
            } else if(totalTime < 0){
                
            } else {
                clearInterval(gameTimerInterval);
                // Acción al finalizar el tiempo
                alert("¡Tiempo agotado! El juego ha terminado.");
                // Aquí puedes redirigir o mostrar un popup, según la lógica del juego
                if(players[0].position > players[1].position){
                    showWinnerPopup(players[1].name)
                }
                if(players[1].position > players[0].position){
                    showWinnerPopup(players[0].name)
                }
            }
        }, 1000);
    }

    /* FUNCIONES PARA EL BOTÓN DE PAUSA */

    let isPaused = false; // Estado de pausa
    let pauseTime = totalTime; // Almacenar el tiempo restante al hacer pausa

    const pauseButton = document.getElementById("pauseButton");
    const pausePopup = document.getElementById("pausePopup");
    const resumeButton = document.getElementById("resumeButton");
    const settingsButton = document.getElementById("settingsButton");
    const exitButton = document.getElementById("exitButton");

    pauseButton.addEventListener("click", () => {
        if (!isPaused) {
            isPaused = true;  // Marcar como pausado
            clearInterval(gameTimerInterval);  // Detener el temporizador
            pauseTime = totalTime;  // Guardar el tiempo actual cuando se hace pausa
            pausePopup.style.display = "flex";  // Mostrar el popup de pausa
            disableBackgroundInteraction();  // Desactivar la interacción con el fondo
        }
    });
    
    // Función para reanudar el juego
    resumeButton.addEventListener("click", () => {
        if (isPaused) {
            isPaused = false;  // Marcar como reanudado
            pausePopup.style.display = "none";  // Ocultar el popup de pausa
            totalTime = pauseTime;  // Restaurar el tiempo antes de la pausa
            updateTimerDisplay();  // Actualizar el temporizador visual
            startTimer();
            enableBackgroundInteraction();  // Rehabilitar la interacción con el fondo
        }
    });
    
    // Función para salir del juego
    exitButton.addEventListener("click", () => {
        // Aquí puedes agregar la lógica para salir del juego
        alert("Saliendo del juego...");
        window.location.href = '../home/';
    });

    function disableBackgroundInteraction() {
        document.getElementById("game-container").style.pointerEvents = "none";
    }
    
    function enableBackgroundInteraction() {
        document.getElementById("game-container").style.pointerEvents = "auto";
    }

    // Inicializar el temporizador visualmente
    updateTimerDisplay();
});
