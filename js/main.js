/**
 * OpenCORE - Main JS
 * Menu toggle, smooth scroll, active links, form validation
 */

(function() {
  'use strict';

  // Elements
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.section[id]');
  var contactForm = document.getElementById('contactForm');
  var toast = document.getElementById('toast');
  var heroCta = document.querySelector('.hero-cta__btn');

  // ============================================
  // NAVBAR SCROLL
  // ============================================
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================
  // MOBILE MENU
  // ============================================
  function toggleMenu() {
    var isOpen = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // ============================================
  // SMOOTH SCROLL (nav links + hero CTA)
  // ============================================
  function smoothScrollTo(targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      var offset = target.offsetTop - navbar.offsetHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href.substring(1));
      }
    });
  });

  // Hero CTA button smooth scroll
  if (heroCta) {
    heroCta.addEventListener('click', function(e) {
      e.preventDefault();
      var href = heroCta.getAttribute('href');
      if (href && href.startsWith('#')) {
        smoothScrollTo(href.substring(1));
      }
    });
  }

  // ============================================
  // ACTIVE LINK (IntersectionObserver)
  // ============================================
  var observerOpts = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  function handleIntersect(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        var activeLink = document.querySelector('.nav-link[data-section="' + id + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  var observer = new IntersectionObserver(handleIntersect, observerOpts);
  sections.forEach(function(sec) {
    observer.observe(sec);
  });

  // ============================================
  // FORM VALIDATION & SUBMIT
  // ============================================
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function showToast() {
    toast.classList.add('show');
    setTimeout(function() {
      toast.classList.remove('show');
    }, 3500);
  }

  function validateForm() {
    var valid = true;
    var firstName = document.getElementById('firstName');
    var email = document.getElementById('email');
    var countryCode = document.getElementById('countryCode');
    var comment = document.getElementById('comment');

    // Reset errors
    [firstName, email, countryCode, comment].forEach(function(el) {
      if (el) el.classList.remove('error');
    });

    if (!firstName || !firstName.value.trim()) {
      if (firstName) firstName.classList.add('error');
      valid = false;
    }

    if (!email || !email.value.trim() || !isValidEmail(email.value)) {
      if (email) email.classList.add('error');
      valid = false;
    }

    if (!countryCode || !countryCode.value) {
      if (countryCode) countryCode.classList.add('error');
      valid = false;
    }

    if (!comment || !comment.value.trim()) {
      if (comment) comment.classList.add('error');
      valid = false;
    }

    return valid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm()) {
        // Build mailto body
        var firstName = document.getElementById('firstName').value;
        var email = document.getElementById('email').value;
        var countryCode = document.getElementById('countryCode').value;
        var phone = document.getElementById('phone').value || '';
        var comment = document.getElementById('comment').value;

        var subject = encodeURIComponent('Contacto desde web - ' + firstName);
        var body = encodeURIComponent(
          'Nombre: ' + firstName + '\n' +
          'Email: ' + email + '\n' +
          'Teléfono: ' + countryCode + ' ' + phone + '\n\n' +
          'Mensaje:\n' + comment
        );

        // Open mailto
        window.location.href = 'mailto:ventas@opencore.cl?subject=' + subject + '&body=' + body;

        // Show toast and reset
        showToast();
        contactForm.reset();
      } else {
        var firstErr = contactForm.querySelector('.error');
        if (firstErr) firstErr.focus();
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.addEventListener('input', function() {
        this.classList.remove('error');
      });
      el.addEventListener('change', function() {
        this.classList.remove('error');
      });
    });
  }

})();
