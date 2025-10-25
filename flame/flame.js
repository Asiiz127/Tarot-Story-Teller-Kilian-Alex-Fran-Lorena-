// === flame.js ===
// Desfase aleatorio para que varias llamas no se muevan al unísono
document.querySelectorAll('.flame').forEach(f => {
  const delay = (Math.random() * 0.5).toFixed(2);
  f.style.animationDelay = `${delay}s`;
});
