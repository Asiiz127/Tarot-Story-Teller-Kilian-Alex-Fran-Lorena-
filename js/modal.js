// Controla la parte donde se eligen las cartas al azar y aparece el mensaje del futuro.
import { detenerCarrusel, reanudarCarrusel } from "./cards.js";

// Muestra el modal con las cartas seleccionadas
export const mostrarPrediccion = () => {
  const cartas = Array.from(document.querySelectorAll('.tarot-card'));
  if (cartas.length < 2) return;

  detenerCarrusel(); // pausamos el giro

  // Seleccionamos dos cartas aleatorias
  const seleccionadas = [];
  while (seleccionadas.length < 2) {
    const aleatoria = cartas[Math.floor(Math.random() * cartas.length)];
    if (!seleccionadas.includes(aleatoria)) seleccionadas.push(aleatoria);
  }

  // Mostramos visualmente las seleccionadas y atenuamos las demás
  cartas.forEach(c => {
    if (seleccionadas.includes(c)) c.classList.add('selected-card');
    else c.classList.add('fade-out');
  });

  // Un pequeño retraso antes de mostrar el modal, para que se vea la animación
  setTimeout(() => {
    document.getElementById('prediction-modal').classList.remove('d-none');
  }, 1000);
};

// Cierra el modal y reinicia la animación de las cartas
export const cerrarModal = () => {
  const modal = document.getElementById('prediction-modal');
  modal.classList.add('d-none');

  // Quitamos las clases de selección y desvanecimiento
  const cartas = Array.from(document.querySelectorAll('.tarot-card'));
  cartas.forEach(c => c.classList.remove('selected-card', 'fade-out'));

  reanudarCarrusel(); // las cartas vuelven a girar
};
