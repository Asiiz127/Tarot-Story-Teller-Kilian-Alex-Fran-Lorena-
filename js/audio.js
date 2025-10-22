/*___________________________________

DE MOMENTO EL AUDIO NO FUNCIONA

 (•◡•)

__________________________________*/

// Este archivo se encarga de controlar la música ambiental.
// Al entrar en la habitación, la música empieza en silencio y va subiendo poco a poco.
// Así se siente como si la habitación "cobrara vida" poco a poco.

export const iniciarMusica = (musica) => {
  musica.volume = 0; // empieza sin sonido
  const playPromise = musica.play(); // intentamos reproducirla

  // Algunos navegadores bloquean el audio hasta que hay interacción,
  // por eso usamos esta promesa.
  if (playPromise !== undefined) {
    playPromise
      .then(() => fadeIn(musica, 0.2, 4000)) // sube el volumen suave
      .catch(err => console.log("Audio bloqueado o error:", err));
  }
};

// Esta función hace el "fade in": sube el volumen poco a poco.
// Parece una tontería, pero hace que el ambiente se sienta más inmersivo.
const fadeIn = (audio, volumenFinal, duracion) => {
  const pasos = 50; // cantidad de pequeños incrementos
  const incremento = volumenFinal / pasos; 
  const intervalo = duracion / pasos;
  let nivel = 0;

  const fadeInterval = setInterval(() => {
    nivel += incremento;
    if (nivel >= volumenFinal) {
      audio.volume = volumenFinal;
      clearInterval(fadeInterval); // paramos cuando llegamos al volumen final
    } else {
      audio.volume = nivel; // sube un poquito
    }
  }, intervalo);
};


// DE MOMENTO NO FUNCIONA, QUIZÁS POR EL NAVEGADOR CHROME QUE ES EN EL QUE HE PROBADO, PERO SEGUIMOS INVESTIGANDO