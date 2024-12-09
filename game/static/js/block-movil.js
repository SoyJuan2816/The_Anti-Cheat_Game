// Función para detectar dispositivos móviles
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  }

  // Si el dispositivo es móvil, redirigir o mostrar un mensaje
  if (isMobile()) {
    document.body.style.background = 'white'
    document.body.innerHTML = '<h1 stye="color: white !important">Este sitio no está disponible en dispositivos móviles.</h1>';
  }