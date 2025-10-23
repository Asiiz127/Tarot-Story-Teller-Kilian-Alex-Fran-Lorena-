import { prepararCartas, iniciarCarrusel } from './cards.js';

document.addEventListener('DOMContentLoaded', () => {
  // Elementos DOM
  const enterBtn = document.getElementById('enter-btn');
  const enterContainer = document.getElementById('enter-container');
  const roomContent = document.getElementById('room-content');
  const body = document.body;

  const predictBtn = document.getElementById('predict-btn');
  const predictionModal = document.getElementById('prediction-modal');
  const closeModalBtn = document.getElementById('close-modal');

  const musica = document.getElementById('musicaAmbiental');
  musica.volume = 0;

  // Función de fade-in de música
  const fadeIn = (audio, volumenFinal, duracion) => {
    const pasos = 50;
    const incremento = volumenFinal / pasos;
    const intervalo = duracion / pasos;
    let nivel = 0;
    const fadeInterval = setInterval(() => {
      nivel += incremento;
      if (nivel >= volumenFinal) {
        audio.volume = volumenFinal;
        clearInterval(fadeInterval);
      } else {
        audio.volume = nivel;
      }
    }, intervalo);
  };

  let carrusel;

  // ---------- Botón "Entrar a la habitación" ----------
  enterBtn.addEventListener('click', () => {
    body.classList.add('curtains-open');
    enterContainer.classList.add('d-none');
    roomContent.classList.remove('d-none');

    setTimeout(() => {
      prepararCartas();
      carrusel = iniciarCarrusel();
    }, 2800);

    musica.play().then(() => fadeIn(musica, 0.2, 4000))
                 .catch(err => console.log('Audio bloqueado:', err));
  });

  // ---------- Botón "Predecir el futuro" ----------
  predictBtn.addEventListener('click', () => {
    const cartas = Array.from(document.querySelectorAll('.tarot-card'));
    if (cartas.length < 2) return;

    carrusel.detener();

    // Selección de dos cartas aleatorias
    const seleccionadas = [];
    while (seleccionadas.length < 2) {
      const aleatoria = cartas[Math.floor(Math.random() * cartas.length)];
      if (!seleccionadas.includes(aleatoria)) seleccionadas.push(aleatoria);
    }

    // Aplicar clases para animación
    cartas.forEach(c => {
      if (seleccionadas.includes(c)) c.classList.add('selected-card');
      else c.classList.add('fade-out');
    });

    // Mostrar modal con predicción
    setTimeout(() => predictionModal.classList.remove('d-none'), 1000);
  });

  // ---------- Botón cerrar modal ----------
  closeModalBtn.addEventListener('click', () => {
    predictionModal.classList.add('d-none');
    const cartas = Array.from(document.querySelectorAll('.tarot-card'));
    cartas.forEach(c => c.classList.remove('selected-card', 'fade-out'));
    carrusel.reiniciar();
  });

  // Ajustar cartas al redimensionar
  window.addEventListener('resize', () => prepararCartas());
});
