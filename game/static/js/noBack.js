document.addEventListener("keydown", function(event) {
    // Bloquea el retroceso con Alt + flecha izquierda
    if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
    }
  });

  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);  // Prevenir retroceder
  };