window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("contact-btn");
  const modal = document.getElementById("contact-modal");
  const close = document.getElementById("close-contact");

  if (!btn || !modal || !close) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("d-none");
  });

  close.addEventListener("click", () => {
    modal.classList.add("d-none");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("d-none");
  });
});
