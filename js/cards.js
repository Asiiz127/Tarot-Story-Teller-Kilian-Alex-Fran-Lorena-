/*AQUÍ VA TODO LO RELEVANTE A LAS CARTAS Y SU MOVIMIENTO*/

const RADIUS = 180; // radio del círculo que forman las cartas

// Esta función prepara las cartas al entrar en la habitación
// Primero están amontonadas abajo, luego se colocan en círculo
export const prepararCartas = () => {
  const orbit = document.getElementById('orbit');
  const cartas = Array.from(orbit.querySelectorAll('.tarot-card'));
  const total = cartas.length;

  // Paso 1: colocamos todas las cartas en un punto de inicio, abajo por ejemplo, cerca de la mano de la tarotista
  cartas.forEach(carta => {
    carta.style.left = '50%';
    carta.style.top = '70%'; // punto de partida ajustable
    carta.style.opacity = 0;
    carta.style.transition = 'all 1s ease';
    carta.style.transform = 'translate(-50%, -50%)';
  });

  // Paso 2: después de un pequeño retraso, las colocamos en círculo. 
  setTimeout(() => {
    cartas.forEach((carta, i) => {
      const angulo = (i / total) * (2 * Math.PI);
      const x = Math.cos(angulo) * RADIUS;
      const y = Math.sin(angulo) * RADIUS;
      carta.style.left = `calc(50% + ${x}px - 50px)`;
      carta.style.top = `calc(50% + ${y}px - 75px)`;
      carta.style.opacity = 1; // ahora se ven
    });
  }, 100); // 0.1s de retraso para que se vea la animación
};

// Esta función hace girar las cartas en círculo alrededor del centro
export const iniciarCarrusel = () => {
  let anguloActual = 0; // control de la rotación del círculo
  let animacionActiva = true;

  const girar = () => {
    if (!animacionActiva) return;

    const cartas = document.querySelectorAll('.tarot-card');
    const total = cartas.length;

    // Rotamos cada carta alrededor del centro del orbit (el círculo) para que parezca algo "bonito y mágico"
    anguloActual += 0.3; // velocidad de giro del círculo
    cartas.forEach((carta, i) => {
      const angulo = (i / total) * 360 + anguloActual;
      const rad = (angulo * Math.PI) / 180;
      const x = Math.cos(rad) * RADIUS;
      const y = Math.sin(rad) * RADIUS;
      const rotY = Math.sin(rad) * 25; // efecto de inclinación 3D

      carta.style.left = `calc(50% + ${x}px - 50px)`;
      carta.style.top = `calc(50% + ${y}px - 75px)`;
      carta.style.transform = `translate(-50%, -50%) rotateY(${rotY}deg)`;
    });

    // Llamamos a la función otra vez para el siguiente frame
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
