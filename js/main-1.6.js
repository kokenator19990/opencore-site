/**
 * OpenCORE v1.6 - Clean JavaScript
 */

(function() {
  'use strict';

  // ============================================
  // LOADER
  // ============================================
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    setTimeout(function() {
      loader.classList.add('hidden');
    }, 600);
  });

  // ============================================
  // ELEMENTS
  // ============================================
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.section[id]');
  var contactForm = document.getElementById('contactForm');
  var toast = document.getElementById('toast');
  var scrollProgress = document.getElementById('scrollProgress');
  var backToTop = document.getElementById('backToTop');

  // ============================================
  // SCROLL PROGRESS
  // ============================================
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = percent + '%';
    }
  }

  // ============================================
  // NAVBAR SCROLL
  // ============================================
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
    
    updateProgress();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================
  // BACK TO TOP
  // ============================================
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  function smoothScroll(id) {
    var el = document.getElementById(id);
    if (el) {
      var offset = el.offsetTop - (navbar ? navbar.offsetHeight : 0);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        smoothScroll(href.substring(1));
      }
    });
  });

  // ============================================
  // ACTIVE LINK
  // ============================================
  var observerOpts = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  var observer = new IntersectionObserver(function(entries) {
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
  }, observerOpts);

  sections.forEach(function(sec) {
    observer.observe(sec);
  });

  // ============================================
  // FORM
  // ============================================
  function showToast(msg) {
    var toastEl = document.getElementById('toast');
    if (msg) {
      toastEl.querySelector('span:last-child').textContent = msg;
    }
    toastEl.classList.add('show');
    setTimeout(function() {
      toastEl.classList.remove('show');
    }, 4000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function validateForm() {
    var valid = true;
    var firstName = document.getElementById('firstName');
    var email = document.getElementById('email');
    var comment = document.getElementById('comment');
    
    [firstName, email, comment].forEach(function(el) {
      if (el) {
        el.style.borderColor = '';
      }
    });

    if (!firstName.value.trim()) {
      firstName.style.borderColor = '#EF4444';
      valid = false;
    }
    
    if (!email.value.trim() || !isValidEmail(email.value)) {
      email.style.borderColor = '#EF4444';
      valid = false;
    }
    
    if (!comment.value.trim()) {
      comment.style.borderColor = '#EF4444';
      valid = false;
    }
    
    return valid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value || '';
        var email = document.getElementById('email').value;
        var company = document.getElementById('company').value || '';
        var countryCode = document.getElementById('countryCode').value;
        var phone = document.getElementById('phone').value || '';
        var comment = document.getElementById('comment').value;

        var fullName = firstName + (lastName ? ' ' + lastName : '');
        var subject = encodeURIComponent('Contacto Web - ' + fullName);
        var body = encodeURIComponent(
          'Nombre: ' + fullName + '\n' +
          'Email: ' + email + '\n' +
          (company ? 'Empresa: ' + company + '\n' : '') +
          'Teléfono: ' + countryCode + ' ' + phone + '\n\n' +
          'Mensaje:\n' + comment
        );

        window.location.href = 'mailto:ventas@opencore.cl?subject=' + subject + '&body=' + body;
        
        showToast('¡Gracias! Tu mensaje está listo para enviar.');
        setTimeout(function() {
          contactForm.reset();
        }, 500);
      }
    });

    contactForm.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.addEventListener('input', function() {
        this.style.borderColor = '';
      });
    });
  }

  // Console message
  console.log('%c OpenCORE v1.6 ', 'background: linear-gradient(135deg, #2563EB, #7C3AED); color: white; font-size: 14px; padding: 8px 16px; border-radius: 6px; font-weight: 600;');

})();
