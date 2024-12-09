document.addEventListener('DOMContentLoaded', function() {

    // Bloquear clic derecho (menú contextual)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Impide el menú contextual
    });

    // Bloquear la selección de texto
    document.addEventListener('selectstart', function(e) {
        e.preventDefault(); // Previene la selección de texto
    });

    // Bloquear arrastre de imágenes
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault(); // Impide el arrastre de imágenes
        }
    });

    // Bloquear las combinaciones de teclas comunes para abrir la consola (F12, Ctrl+Shift+I, Ctrl+U)
    document.addEventListener('keydown', function(e) {
        // Prevenir apertura de la consola con F12
        if (e.key === 'F12') {
            e.preventDefault();
        }

        // Prevenir la apertura de la consola con Ctrl+Shift+I o Ctrl+U
        if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }

        // Prevenir la apertura del inspector de elementos con Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
        }
    });

    // Bloquear la apertura de la consola usando la tecla F12
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12') {
            e.preventDefault(); // Impide la apertura de DevTools con F12
        }
    });

    // Detectar si el usuario está intentando inspeccionar la página (por ejemplo, detectando el enfoque en las herramientas de desarrollo)
    let devtools = /./;
    devtools.toString = function () {
        return "";
    };
    console.log('%c ', devtools);
});
