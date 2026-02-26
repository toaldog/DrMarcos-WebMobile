/* ============================================================
   main.js — Dr. Marcos Guimarães Landing Page
   Responsivo Mobile + Desktop
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     HAMBURGER / MENU MOBILE
  ========================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const header = document.querySelector('.site-header');

  function closeMenu() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    // Fechar ao clicar num link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
        closeMenu();
      }
    });

    // Fechar ao pressionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ==========================================
     HEADER SHADOW ON SCROLL
  ========================================== */
  if (header) {
    const handleHeaderScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  /* ==========================================
     STICKY CTA — aparece só em mobile (<=768px)
     após rolar 400px
  ========================================== */
  const stickyCta = document.getElementById('sticky-cta');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function handleStickyVisibility() {
    if (!stickyCta) return;
    if (isMobile() && window.scrollY > 400) {
      stickyCta.classList.add('visible');
      document.body.classList.add('has-sticky-cta');
    } else {
      stickyCta.classList.remove('visible');
      document.body.classList.remove('has-sticky-cta');
    }
  }

  window.addEventListener('scroll', handleStickyVisibility, { passive: true });
  window.addEventListener('resize', handleStickyVisibility, { passive: true });
  handleStickyVisibility();

  /* ==========================================
     SMOOTH SCROLL — links âncora
  ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = href === '#top' ? document.body : document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const extra = 12;
        const targetY = href === '#top'
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - headerH - extra;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================
     ANIMAÇÕES DE ENTRADA (Intersection Observer)
  ========================================== */
  const animSelectors = [
    '.product-card',
    '.testimonial-card',
    '.kit-banner',
    '.author-inner',
    '.section-header',
    '.trust-item',
    '.final-cta-section',
  ];

  const targets = document.querySelectorAll(animSelectors.join(', '));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach((el, i) => {
      el.classList.add('anim-hidden');
      // stagger delay leve para cards em grid
      el.style.transitionDelay = `${(i % 3) * 60}ms`;
      io.observe(el);
    });
  } else {
    // Fallback: mostrar tudo sem animação
    targets.forEach(el => el.classList.add('is-visible'));
  }

  /* ==========================================
     AJUSTE: posição do mobile-nav abaixo header
  ========================================== */
  function positionMobileNav() {
    if (mobileNav && header) {
      mobileNav.style.top = header.offsetHeight + 'px';
    }
  }
  positionMobileNav();
  window.addEventListener('resize', positionMobileNav, { passive: true });

});
