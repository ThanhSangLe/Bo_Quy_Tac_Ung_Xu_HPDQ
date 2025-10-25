// script.js - smooth scroll + intersection observer for fade-in
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Collapse Bootstrap navbar on small screens if open
        const collapseEl = document.querySelector('.navbar-collapse.show');
        if (collapseEl) {
          const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // IntersectionObserver to animate fade-in elements
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe any element with .fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});