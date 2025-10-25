import { prepararCartas, iniciarCarrusel } from './cards.js';

document.addEventListener('DOMContentLoaded', () => {
  /* Primero vinculamos varios elementos del HTML para poder usarlos en el código.
   Es como guardar los botones, contenedores y cosas importantes en variables
   para poder manipularlos más fácil luego.*/
  const enterBtn = document.getElementById('enter-btn');
  const enterContainer = document.getElementById('enter-container');
  const roomContent = document.getElementById('room-content');
  const body = document.body;

  const predictBtn = document.getElementById('predict-btn');
  const predictionModal = document.getElementById('prediction-modal');
  const closeModalBtn = document.getElementById('close-modal');

  const musica = document.getElementById('musicaAmbiental');
  musica.volume = 0; // Pongo el volumen en 0 al inicio para que no arranque fuerte.

  /* Esta función se encarga de subir el volumen poquito a poquito, o sea,
   hace un efecto de "fade-in" (como cuando la música entra suave).
   Lo hace dividiendo el tiempo total en pasos y subiendo el volumen de a poco.*/

   /*DE MOMENTO NO FUNCIONA ME CACHIS*/ 

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

  let carrusel; // Aquí voy a guardar el carrusel una vez que se cree.

  /* Botón "Entrar a la habitación" ----------
  Este botón es el que da inicio a todo. Cuando el usuario hace clic,
  se "abren las cortinas" (una animación en el CSS), desaparece la pantalla de entrada
  y aparece la habitación donde están las cartas del tarot y la tarotista.*/

  enterBtn.addEventListener('click', () => {
    body.classList.add('curtains-open');
    enterContainer.classList.add('d-none');
    roomContent.classList.remove('d-none');

    /* Espero unos segundos para que la animación se vea bien
     y después llamo a las funciones que preparan las cartas y el carrusel. */
    setTimeout(() => {
      prepararCartas();
      carrusel = iniciarCarrusel();
    }, 2800);

    /* Intento reproducir la música de fondo y le aplico el efecto de fade-in.
     A veces el navegador bloquea el audio si el usuario no ha interactuado antes,
     así que por eso está el catch por si pasa eso. */

     /*REPITO, NO FUNCIONA XD JAJAJAJAJ */

    musica.play().then(() => fadeIn(musica, 0.2, 4000))
                 .catch(err => console.log('Audio bloqueado:', err));
  });

  /* Botón "Predecir el futuro"
   Cuando se aprieta este botón, se eligen dos cartas al azar entre las del carrusel
   y se muestra una animación donde las cartas seleccionadas se destacan
   y las demás se difuminan. */

  predictBtn.addEventListener('click', () => {
    const cartas = Array.from(document.querySelectorAll('.tarot-card'));
    if (cartas.length < 2) return; // Me aseguro de que haya al menos dos cartas.

    carrusel.detener(); // Paro el carrusel para que no siga girando mientras elijo las cartas.

    // Selecciono dos cartas distintas al azar. Con el tipico combinado de "math floor math random" 
    const seleccionadas = [];
    while (seleccionadas.length < 2) {
      const aleatoria = cartas[Math.floor(Math.random() * cartas.length)];
      if (!seleccionadas.includes(aleatoria)) seleccionadas.push(aleatoria);
    }

    /* A las cartas seleccionadas les pongo una clase especial para que se vean destacadas,
     y al resto les agrego una clase para que se desvanezcan (animación CSS).*/
    cartas.forEach(c => {
      if (seleccionadas.includes(c)) c.classList.add('selected-card');
      else c.classList.add('fade-out');
    });

    /* Espero un segundo para que se vea la animación y después
    muestro el modal con la "predicción" o mensaje que se quiera mostrar.*/
    setTimeout(() => predictionModal.classList.remove('d-none'), 1000);
  });


  /*Botón cerrar modal
   Este botón simplemente cierra la ventana del modal con la predicción.
   Además, limpia las clases de las cartas para que vuelvan a la normalidad
  y vuelve a poner en marcha el carrusel. */
  closeModalBtn.addEventListener('click', () => {
    predictionModal.classList.add('d-none');
    const cartas = Array.from(document.querySelectorAll('.tarot-card'));
    cartas.forEach(c => c.classList.remove('selected-card', 'fade-out'));
    carrusel.reiniciar();
  });

  /*Ajuste de cartas
   Este evento se ejecuta cada vez que el usuario cambia el tamaño de la ventana.
   Lo que hace es volver a preparar las cartas (posiciones, tamaños, etc.)
   para que el diseño no se desacomode. */
  window.addEventListener('resize', () => prepararCartas());
});