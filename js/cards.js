/*AQUÍ VA TODO LO RELEVANTE A LAS CARTAS Y SU MOVIMIENTO*/

const RADIUS = 180; // radio del círculo que forman las cartas. Se puede ajustar sin que afecte al resto

/* Esta función prepara las cartas al entrar en la habitación
 Primero están amontonadas abajo, luego se colocan en círculo
NOTA: las funciones que funcionan con radianes son curiosas pero hay que tener cuidado al aplicar otras
funciones sobre ellas
*/
export const prepararCartas = () => {
  const orbit = document.getElementById('orbit');
  const cartas = Array.from(orbit.querySelectorAll('.tarot-card'));
  const total = cartas.length;

  /* Paso 1: colocamos todas las cartas en un punto de inicio, abajo por ejemplo, cerca de la mano de la tarotista*/
  cartas.forEach(carta => {
    carta.style.left = '50%';
    carta.style.top = '70%'; // punto de partida ajustable (ver en CSS referencias)
    carta.style.transition = 'all 1s ease';
    carta.style.transform = 'translate(-50%, -50%)';
  });

  /* Paso 2: después de un pequeño retraso, las colocamos en círculo. */
  setTimeout(() => {
    cartas.forEach((carta, i) => {
      const angulo = (i / total) * (2 * Math.PI); /*Divide el círculo completo (360° o 2π radianes) entre el 
      número total de cartas. Así, cada carta recibe su ángulo propio dentro del círculo.*/ 

      const x = Math.cos(angulo) * RADIUS; /*Calcula las coordenadas X e Y de cada carta dentro del círculo.
RADIUS indica qué tan grande es el círculo.
Cuanto mayor el radio, más lejos entre sí estarán las cartas. */


      const y = Math.sin(angulo) * RADIUS;
      carta.style.left = `calc(50% + ${x}px - 50px)`;
      carta.style.top = `calc(50% + ${y}px - 75px)`; /*Estas líneas posicionan cada carta según su ángulo en el círculo.
50% mantiene el centro de referencia del círculo en medio del contenedor (#orbit).*/ 
      carta.style.opacity = 1; 
    });
  }, 100); // 0.1s de retraso para que se vea la animación
};

/* Esta función hace girar las cartas en círculo alrededor del centro*/
export const iniciarCarrusel = () => {
  let anguloActual = 0; // control de la rotación del círculo
  let animacionActiva = true;

  const girar = () => {
    if (!animacionActiva) return;

    const cartas = document.querySelectorAll('.tarot-card');
    const total = cartas.length;

    /* Rotamos cada carta alrededor del centro del orbit (el círculo) para que parezca algo "bonito y mágico"
Es la función que mantiene las cartas girando continuamente en círculo, una y otra vez, frame a frame.
Cada frame, actualiza la posición de todas las cartas según un nuevo ángulo para crear la ilusión de rotación
De esta forma obtenemos un efecto chulísimo de un "carrusel de cartas". NOTA: APUNTAR EN DISCORD PARA USAR MÁS
ADELANTE PORQUE ESTÁ MUY GUAPA.*/ 

    anguloActual += 0.3; /* velocidad de giro del círculo*/
    cartas.forEach((carta, i) => {
      const angulo = (i / total) * 360 + anguloActual;
      const rad = (angulo * Math.PI) / 180; /*Convierte los grados a radianes, porque las funciones Math.cos() 
      y Math.sin() trabajan con radianes. Es una conversión matemática MUY IMPORTANTE para poder hacerla funcionar*/

      const x = Math.cos(rad) * RADIUS;
      const y = Math.sin(rad) * RADIUS;
      const rotY = Math.sin(rad) * 25; /* efecto de inclinación 3D muy chulo. Da un efecto 3D a las cartas 
      mientras giran. */


      carta.style.left = `calc(50% + ${x}px - 50px)`; 
      carta.style.top = `calc(50% + ${y}px - 75px)`; 
      carta.style.transform = `translate(-50%, -50%) rotateY(${rotY}deg)`;
    });

    /* Llamamos a la función otra vez para el siguiente frame. Habrá formas mas sencillas pero así "conseguimos"
    el objetivo*/
    requestAnimationFrame(girar);
  };

  requestAnimationFrame(girar);

  // Devuelvo funciones para detener o reiniciar la animación si es necesario
  return {
    detener: () => { animacionActiva = false; },
    reiniciar: () => {
      animacionActiva = true;
      girar();
    }
  };
};
