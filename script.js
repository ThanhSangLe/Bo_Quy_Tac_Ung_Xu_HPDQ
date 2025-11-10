// script.js - smooth scroll + intersection observer for fade-in
document.addEventListener('DOMContentLoaded', () => {
  // Keyboard accessibility for collapsible section headers
  document.querySelectorAll('.collapsible').forEach(header => {
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Sync chevron rotation state by toggling 'collapsed' class manually after Bootstrap collapse events
  const syncChevron = (trigger) => {
    const targetSel = trigger.getAttribute('data-bs-target');
    if (!targetSel) return;
    const target = document.querySelector(targetSel);
    if (!target) return;
    if (target.classList.contains('show')) {
      trigger.classList.remove('collapsed');
      trigger.setAttribute('aria-expanded', 'true');
    } else {
      trigger.classList.add('collapsed');
      trigger.setAttribute('aria-expanded', 'false');
    }
  };
  document.querySelectorAll('.collapsible').forEach(c => syncChevron(c));
  document.querySelectorAll('.collapsible').forEach(c => {
    c.addEventListener('click', () => {
      setTimeout(()=>syncChevron(c), 250);
    });
  });
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