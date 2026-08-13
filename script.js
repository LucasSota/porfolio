const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const modal = document.querySelector(".video-modal");
const modalVideo = modal.querySelector("video");
const closeModalButton = modal.querySelector(".modal-close");

document.querySelector("#year").textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.querySelector(".sr-only").textContent = isOpen ? "Abrir menú" : "Cerrar menú";
  mobileMenu.hidden = isOpen;
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".sr-only").textContent = "Abrir menú";
    mobileMenu.hidden = true;
  }
});

const closeVideo = () => {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  document.body.classList.remove("modal-open");
};

document.querySelectorAll("[data-video]").forEach((project) => {
  project.addEventListener("click", () => {
    modalVideo.src = project.dataset.video;
    modal.showModal();
    document.body.classList.add("modal-open");
    modalVideo.play().catch(() => {});
  });
});

closeModalButton.addEventListener("click", () => modal.close());
modal.addEventListener("close", closeVideo);
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  if (element.closest(".hero")) element.style.transitionDelay = `${index * 80}ms`;
  observer.observe(element);
});
