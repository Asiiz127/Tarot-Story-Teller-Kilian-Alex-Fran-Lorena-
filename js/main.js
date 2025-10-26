import { prepararCartas, iniciarCarrusel } from './cards.js';

document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter-btn');
  const enterContainer = document.getElementById('enter-container');
  const roomContent = document.getElementById('room-content');
  const body = document.body;

  const predictBtn = document.getElementById('predict-btn');
  const predictionModal = document.getElementById('prediction-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const predictionText = document.getElementById('prediction-text');

  const musica = document.getElementById('musicaAmbiental');
  musica.volume = 0;

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

  // Botón "Entrar a la habitación"
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

  // 🔮 Diccionario de augurios
  const augurios = {
    "Priestess+Magician": "Tu intuición y tu ingenio se alinean. Hoy podrías adivinar el Wi-Fi del vecino o el destino del universo.",
    "Priestess+Death": "Renacerás con sabiduría. Es un buen día para tirar lo viejo, menos al gato.",
    "Priestess+Emperor": "El orden y la intuición te harán imparable. Ni el Excel podrá contigo.",
    "Priestess+Empress": "La calma y la belleza florecen. Hoy tu café sabrá exactamente como debe.",
    "Priestess+Hermit": "El silencio será tu mejor aliado. Encontrarás respuestas en lugares con buena conexión a Wi-Fi espiritual.",
    "Priestess+Fool": "La aventura llama. Escucha a tu corazón, pero no a Google Maps.",
    "Priestess+Hierophant": "La tradición y el misterio te guiarán. Ideal para rituales, tesis o trámites del ayuntamiento.",
    "Magician+Emperor": "Poder y control. Puedes lograrlo todo… excepto que tu impresora funcione a la primera.",
    "Magician+Empress": "Creatividad y gracia. Tu día brilla como filtro vintage en una tarde dorada.",
    "Magician+Hermit": "El conocimiento oculto se revela. Solo recuerda que el ‘modo oscuro’ no ilumina el alma.",
    "Magician+Fool": "Magia sin control. Cuidado: podrías convertir el agua en café… o viceversa.",
    "Magician+Hierophant": "Maestría y enseñanza. Eres el profesor que todos necesitamos pero nadie entiende.",
    "Emperor+Empress": "Reino perfecto: orden y amor. Todo bajo control, incluso el gato.",
    "Hermit+Hierophant": "Tu búsqueda interior hallará propósito. No olvides llevar linterna y snacks espirituales.",
    // ☠️ AUGURIOS MALOS
    "Magician+Death": "Tus planes brillantes se apagan. El universo pulsó Ctrl+Z.",
    "Death+Emperor": "Cambios drásticos en tus estructuras. Tu agenda gritará por misericordia.",
    "Death+Empress": "Fin de una era emocional. Tal vez se te muera la planta otra vez.",
    "Death+Hermit": "Oscuridad y soledad. Ideal para noches de drama con banda sonora.",
    "Death+Fool": "La imprudencia cobra su precio. Reconsidera saltar al vacío, o al menos lleva paracaídas.",
    "Death+Hierophant": "Lo viejo muere, pero lo aburrido permanece. Un castigo burocrático eterno.",
    "Emperor+Hermit": "Tu orden interno se derrumba. Te quedarás hablando solo con tus notas de voz.",
    "Emperor+Fool": "Demasiado control ahoga la locura. Terminarás organizando una rebelión contra ti mismo.",
    "Emperor+Hierophant": "Reglas sobre reglas. El caos es inevitable, aunque uses corbata.",
    "Empress+Hermit": "Belleza sin compañía. Selfies místicos sin likes.",
    "Empress+Fool": "Demasiado amor por el riesgo. El romance podría ser un bug del destino.",
    "Hermit+Fool": "Soledad y torpeza. Chocarás contra tus propias ideas (y probablemente una puerta).",
    "Empress+Hierophant": "El deber mata el placer. Hasta Netflix te juzgará."
  };

  // 🔮 Traducciones de las cartas
  const traducciones = {
    "Priestess": "La Sacerdotisa",
    "Magician": "El Mago",
    "Death": "La Muerte",
    "Emperor": "El Emperador",
    "Empress": "La Emperatriz",
    "Hermit": "El Hermitaño",
    "Fool": "El Loco",
    "Hierophant": "El Hierofante"
  };

  // 🔮 Botón "Predecir el futuro"
  predictBtn.addEventListener('click', () => {
    const cartas = Array.from(document.querySelectorAll('.tarot-card'));
    if (cartas.length < 2) return;

    carrusel.detener();

    const seleccionadas = [];
    while (seleccionadas.length < 2) {
      const aleatoria = cartas[Math.floor(Math.random() * cartas.length)];
      if (!seleccionadas.includes(aleatoria)) seleccionadas.push(aleatoria);
    }

    cartas.forEach(c => {
      if (seleccionadas.includes(c)) c.classList.add('selected-card');
      else c.classList.add('fade-out');
    });

    // Obtener nombres de las cartas usando alt del HTML
    const nombre1 = seleccionadas[0].alt;
    const nombre2 = seleccionadas[1].alt;

    const key1 = `${nombre1}+${nombre2}`;
    const key2 = `${nombre2}+${nombre1}`;
    const mensajeAugurio = augurios[key1] || augurios[key2] || "El destino está confundido... vuelve a intentarlo.";

    const nombre1Trad = traducciones[nombre1] || nombre1;
    const nombre2Trad = traducciones[nombre2] || nombre2;

   // Mensaje final con las cartas en rojo
const mensajeFinal = `Tus cartas son 
${nombre1} <span style="color: red;">"(${nombre1Trad})"</span> y 
${nombre2} <span style="color: red;">"(${nombre2Trad})"</span>
Tu augurio es: ${mensajeAugurio}`;

// Mostrar mensaje en el modal usando innerHTML
predictionText.innerHTML = mensajeFinal;




    setTimeout(() => predictionModal.classList.remove('d-none'), 1000);
  });

  // Botón cerrar modal
  closeModalBtn.addEventListener('click', () => {
    predictionModal.classList.add('d-none');
    const cartas = Array.from(document.querySelectorAll('.tarot-card'));
    cartas.forEach(c => c.classList.remove('selected-card', 'fade-out'));
    carrusel.reiniciar();
  });

  // Ajuste de cartas al redimensionar la ventana
  window.addEventListener('resize', () => prepararCartas());
});

/* Función para reproducir el sonido de la bola de cristal */
const glassball = document.getElementById("glassball");
glassball.onclick = reproducirSonidoBola;

function reproducirSonidoBola() {
  const sound = new Audio("Proyect/media/rolling-ball.mp3");
  sound.play().catch(error => {
    console.log("No se pudo reproducir el sonido:", error);
  });
};
