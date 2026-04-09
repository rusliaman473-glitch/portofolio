/* =========================================
   PORTFOLIO MAIN.JS — Animations & Interactions
   ========================================= */

'use strict';

// ── DOM Ready ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initScrollProgress();
  initSmoothScroll();
  initIntersectionObserver();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  initParallax();
  initHamburger();
  initTypewriter();
});

/* ─────────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────────── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower using RAF
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .tool-card, .testimonial-card, input, textarea, select'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

/* ─────────────────────────────────────────
   2. NAVBAR — Scroll & Active State
───────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Sticky glass effect
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ─────────────────────────────────────────
   3. SCROLL PROGRESS BAR
───────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────
   4. SMOOTH SCROLL
───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu if open
      const navLinks = document.getElementById('navLinks');
      if (navLinks) navLinks.classList.remove('open');
    });
  });
}

/* ─────────────────────────────────────────
   5. INTERSECTION OBSERVER — Fade Animations
───────────────────────────────────────── */
function initIntersectionObserver() {
  // Fade-in-up elements
  const fadeEls = document.querySelectorAll('.fade-in-up');
  const sectionTags = document.querySelectorAll('.section-tag');
  const sectionTitles = document.querySelectorAll('.section-title');
  const sectionDescs = document.querySelectorAll('.section-desc');

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeEls.forEach(el => fadeObserver.observe(el));

  // Section headers
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  [...sectionTags, ...sectionTitles, ...sectionDescs].forEach(el => {
    headerObserver.observe(el);
  });
}

/* ─────────────────────────────────────────
   6. SKILL BARS ANIMATION
───────────────────────────────────────── */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        // Small delay for staggered animation
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* ─────────────────────────────────────────
   7. COUNTER ANIMATION
───────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateCount(el, 0, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCount(el, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current + '+';
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = end + '+';
    }
  }
  requestAnimationFrame(step);
}

/* ─────────────────────────────────────────
   8. CONTACT FORM
───────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  // Real-time validation
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) isValid = false;
    });
    if (!isValid) return;

    // Simulate API send
    submitBtn.innerHTML = '<i class="ph ph-spinner"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';

    await new Promise(resolve => setTimeout(resolve, 1800));

    // Send to Node server
    try {
      const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        timestamp: new Date().toISOString()
      };

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {}); // graceful fallback if server not running
    } catch (_) {}

    // Show success
    form.style.display = 'none';
    successMsg.classList.add('show');

    // Add confetti burst
    createConfettiBurst();
  });
}

function validateField(input) {
  const value = input.value.trim();
  let isValid = true;

  // Remove old error state
  input.classList.remove('error');
  input.style.borderColor = '';

  if (input.required && !value) {
    isValid = false;
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) isValid = false;
  }

  if (!isValid) {
    input.classList.add('error');
    input.style.borderColor = '#ef4444';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.12)';
  }

  return isValid;
}

/* ─────────────────────────────────────────
   9. CONFETTI BURST (form success)
───────────────────────────────────────── */
function createConfettiBurst() {
  const colors = ['#7c3aed', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'];
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 9999;
      animation: confetti-fall ${Math.random() * 2 + 1.5}s ease-in ${Math.random() * 0.8}s forwards;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3500);
  }

  // Inject confetti keyframes once
  if (!document.getElementById('confettiStyle')) {
    const style = document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = `
      @keyframes confetti-fall {
        0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(${Math.random() * 720}deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ─────────────────────────────────────────
   10. BACK TO TOP
───────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

/* ─────────────────────────────────────────
   11. PARALLAX HERO
───────────────────────────────────────── */
function initParallax() {
  const heroVisual = document.querySelector('.hero-visual');
  const orbs = document.querySelectorAll('.orb');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
    }

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.04;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  // Mouse tilt on hero image
  const heroImg = document.querySelector('.hero-image-wrap');
  if (heroImg) {
    document.addEventListener('mousemove', (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 8;
      const y = (e.clientY / h - 0.5) * 8;
      heroImg.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    heroImg.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
  }
}

/* ─────────────────────────────────────────
   12. HAMBURGER MENU
───────────────────────────────────────── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

/* ─────────────────────────────────────────
   13. TYPEWRITER EFFECT (Hero Badge)
───────────────────────────────────────── */
function initTypewriter() {
  const badge = document.querySelector('.hero-badge span');
  if (!badge) return;

  const phrases = [
    '✦ Available for new projects',
    '✦ Open to freelance work',
    '✦ Let\'s build something great',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      badge.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typingTimeout = setTimeout(type, 2200);
        return;
      }
    } else {
      badge.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingTimeout = setTimeout(type, 400);
        return;
      }
    }

    const speed = isDeleting ? 40 : 70;
    typingTimeout = setTimeout(type, speed);
  }

  setTimeout(type, 2000);
}

/* ─────────────────────────────────────────
   14. PROJECT CARD TILT
───────────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─────────────────────────────────────────
   15. ACTIVE NAV LINK STYLE
───────────────────────────────────────── */
(function addActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active {
      color: var(--text-primary) !important;
    }
    .nav-links a.active::after {
      width: 100% !important;
    }
    .form-control.error {
      animation: shake 0.3s ease;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25%       { transform: translateX(-6px); }
      75%       { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);
})();

console.log('%c🎨 Fuad Baharudin Portfolio', 'font-size: 18px; font-weight: bold; color: #8b5cf6;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #94a3b8; font-size: 12px;');
