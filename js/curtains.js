// curtains.js
// Este archivo controla las “cortinas” del inicio.
// Cuando el usuario hace clic en "Entrar", las cortinas se abren con una animación.
// Luego aparece el contenido principal de la habitación.

export const abrirCortinas = (body, enterContainer, roomContent, callback) => {
  // Añadimos la clase que hace que las cortinas se abran con CSS.
  body.classList.add('curtains-open');

  // Ocultamos el botón de entrada porque ya no lo necesitamos.
  enterContainer.classList.add('d-none');

  // Mostramos el contenido de la habitación (cartas, texto, etc.).
  roomContent.classList.remove('d-none');

  // Esperamos unos segundos para que la animación termine antes de continuar.
  setTimeout(callback, 2800); // después de 2.8 segundos, hacemos lo que viene después
};
