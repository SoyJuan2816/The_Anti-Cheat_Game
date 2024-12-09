document.addEventListener("DOMContentLoaded", function () {
    const easyButton = document.querySelector(".easy");
    const mediumButton = document.querySelector(".medium");
    const hardButton = document.querySelector(".hard");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const optionsContainer = document.getElementById("popup-options");
    const answerPopup = document.getElementById("answer-popup");
    const answerMessage = document.getElementById("answer-message");

    // JSON con preguntas, opciones, respuestas correctas y dificultad
    const questionsData = {
        "questions": [
            {
                "question": "¿Cuál es la capital de Francia?",
                "options": ["Madrid", "París"],
                "correctAnswer": "París",
                "difficulty": "Fácil"
            },
            {
                "question": "¿En qué año se descubrió América?",
                "options": ["1492", "1493", "1500"],
                "correctAnswer": "1492",
                "difficulty": "Intermedio"
            },
            {
                "question": "¿Quién es el autor de la teoría de la relatividad?",
                "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla", "Marie Curie"],
                "correctAnswer": "Albert Einstein",
                "difficulty": "Difícil"
            }
        ]
    };

    const players = [
        { id: "player1", position: 0 },
        { id: "player2", position: 0 },
    ];
    let currentPlayerIndex = 0;

    function updatePlayerPosition(playerIndex, steps) {
        const player = players[playerIndex];
        const boardCells = document.querySelectorAll(".cell");

        // Remover el color de la posición actual del jugador
        if (player.position > 0 && player.position <= boardCells.length) {
            boardCells[player.position - 1].style.border = "1px solid #000";
        }

        // Actualizar posición
        player.position = Math.min(player.position + steps, boardCells.length);

        // Colorear la nueva posición
        if (player.position > 0) {
            boardCells[player.position - 1].style.border = `3px solid ${
                playerIndex === 0 ? "blue" : "red"
            }`;
        }
    }

    // Función para mostrar el popup con las opciones de la pregunta
    function showPopup(message, color, questionData) {
        popupMessage.innerHTML = `<strong>Pregunta:</strong> ${questionData.question}`;
        popup.style.display = "flex";
        popup.style.backgroundColor = color;

        optionsContainer.innerHTML = ""; // Limpiar opciones previas
        questionData.options.forEach((option) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.classList.add("option-button");
            optionButton.addEventListener("click", () =>
                handleOptionClick(option, questionData.correctAnswer, questionData)
            );
            optionsContainer.appendChild(optionButton);
        });
    }

    // Función que maneja el clic en una opción
    function handleOptionClick(selectedOption, correctAnswer, questionData) {
        const allOptionButtons = document.querySelectorAll(".option-button");
        allOptionButtons.forEach((button) => (button.disabled = true));

        let steps = 0;
        if (selectedOption === correctAnswer) {
            showAnswerPopup("¡Correcto!", "correct");
            // Determinar el número de pasos según la dificultad
            if (questionData.difficulty === "Fácil") steps = 1;
            if (questionData.difficulty === "Intermedio") steps = 2;
            if (questionData.difficulty === "Difícil") steps = 3;
        } else {
            showAnswerPopup(
                `Incorrecto. La respuesta correcta era: ${correctAnswer}`,
                "incorrect"
            );
        }

        // Actualizar la posición del jugador actual
        updatePlayerPosition(currentPlayerIndex, steps);

        // Cambiar turno al siguiente jugador
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        // Cerrar el popup principal después de 1 segundo
        setTimeout(() => {
            popup.style.display = "none";
        }, 1000);
    }

    // Función para mostrar el popup pequeño con el resultado
    function showAnswerPopup(message, resultType) {
        answerMessage.textContent = message;
        answerPopup.classList.remove("correct", "incorrect");  // Quitar clases previas
        answerPopup.classList.add(resultType);  // Añadir clase correcta o incorrecta
        answerPopup.style.display = "block";  // Mostrar el popup pequeño
        answerPopup.style.opacity = "1";  // Hacer visible

        // Desvanecer el popup pequeño después de 2 segundos
        setTimeout(() => {
            answerPopup.style.opacity = "0";  // Hacerlo invisible
            setTimeout(() => {
                answerPopup.style.display = "none";  // Ocultarlo completamente
            }, 1000);
        }, 2000);
    }

    // Función para obtener una pregunta aleatoria del nivel seleccionado
    function getQuestionByDifficulty(difficulty) {
        const questions = questionsData.questions.filter(q => q.difficulty === difficulty);
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    // Asignar eventos a los botones de dificultad
    easyButton.addEventListener("click", function() {
        const questionData = getQuestionByDifficulty("Fácil");
        showPopup("Dificultad: FÁCIL", "#90EE90", questionData);  // Color verde claro
    });

    mediumButton.addEventListener("click", function() {
        const questionData = getQuestionByDifficulty("Intermedio");
        showPopup("Dificultad: INTERMEDIO", "#FFD700", questionData);  // Color amarillo
    });

    hardButton.addEventListener("click", function() {
        const questionData = getQuestionByDifficulty("Difícil");
        showPopup("Dificultad: DIFÍCIL", "#FF6347", questionData);  // Color rojo tomate
    });
});
