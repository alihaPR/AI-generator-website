document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dropdown").forEach(dropdown => {
    const link = dropdown.querySelector(".mobile-tools-toggle");
    const submenu = dropdown.querySelector(".mobile-submenu");
    const arrow = link?.querySelector(".arrow");
    if (!link || !submenu) return;
    link.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        submenu.classList.toggle("active");
        arrow?.classList.toggle("open");
      }
    });
  });
});
