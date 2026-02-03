/**
 * OpenCORE v1.6 - Enhanced JavaScript
 * Premium interactions & animations
 */

(function() {
  'use strict';

  // ============================================
  // LOADER WITH PROGRESS
  // ============================================
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    var loaderProgress = document.getElementById('loaderProgress');
    
    // Simulate loading progress
    var progress = 0;
    var interval = setInterval(function() {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(function() {
          loader.classList.add('hidden');
          document.body.classList.add('loaded');
        }, 300);
      }
      if (loaderProgress) {
        loaderProgress.style.width = progress + '%';
      }
    }, 200);
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
  // SCROLL PROGRESS BAR
  // ============================================
  function updateScrollProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ============================================
  // NAVBAR SCROLL
  // ============================================
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
      if (backToTop) backToTop.classList.add('visible');
    } else {
      if (backToTop) backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================
  // BACK TO TOP
  // ============================================
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
  function smoothScrollTo(targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      var offset = target.offsetTop - (navbar ? navbar.offsetHeight : 0);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        smoothScrollTo(href.substring(1));
      }
    });
  });

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
  // COUNTER ANIMATION
  // ============================================
  function animateCounter(element, target, duration) {
    var start = 0;
    var increment = target / (duration / 16);
    var current = start;

    var timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  var counters = document.querySelectorAll('.counter');
  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var counter = entry.target;
        var target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target, 2000);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) {
    counterObserver.observe(counter);
  });

  // ============================================
  // MAGNETIC EFFECT (Desktop only)
  // ============================================
  if (window.innerWidth > 768) {
    document.querySelectorAll('.magnetic').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });

      btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ============================================
  // RIPPLE EFFECT
  // ============================================
  document.querySelectorAll('.ripple-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var rect = this.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      
      // Add ripple styles dynamically
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-effect 0.6s ease-out';
      
      this.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation keyframes
  if (!document.getElementById('ripple-styles')) {
    var style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = '@keyframes ripple-effect { to { transform: scale(20); opacity: 0; } }';
    document.head.appendChild(style);
  }

  // ============================================
  // FORM VALIDATION & SUBMIT
  // ============================================
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function showToast(message) {
    var toastText = toast.querySelector('.toast-text');
    if (toastText) {
      toastText.textContent = message || 'Mensaje enviado correctamente';
    }
    toast.classList.add('show');
    setTimeout(function() {
      toast.classList.remove('show');
    }, 4000);
  }

  function validateForm() {
    var valid = true;
    var firstName = document.getElementById('firstName');
    var email = document.getElementById('email');
    var countryCode = document.getElementById('countryCode');
    var comment = document.getElementById('comment');

    // Reset errors
    [firstName, email, countryCode, comment].forEach(function(el) {
      if (el) {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }
    });

    if (!firstName || !firstName.value.trim()) {
      if (firstName) {
        firstName.style.borderColor = '#dc2626';
        firstName.style.boxShadow = '0 0 0 4px rgba(220, 38, 38, 0.1)';
      }
      valid = false;
    }

    if (!email || !email.value.trim() || !isValidEmail(email.value)) {
      if (email) {
        email.style.borderColor = '#dc2626';
        email.style.boxShadow = '0 0 0 4px rgba(220, 38, 38, 0.1)';
      }
      valid = false;
    }

    if (!comment || !comment.value.trim()) {
      if (comment) {
        comment.style.borderColor = '#dc2626';
        comment.style.boxShadow = '0 0 0 4px rgba(220, 38, 38, 0.1)';
      }
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
          'NUEVO MENSAJE DE CONTACTO\n\n' +
          '═══════════════════════════\n' +
          'DATOS DEL CONTACTO\n' +
          '═══════════════════════════\n\n' +
          'Nombre: ' + fullName + '\n' +
          'Email: ' + email + '\n' +
          (company ? 'Empresa: ' + company + '\n' : '') +
          'Teléfono: ' + countryCode + ' ' + phone + '\n\n' +
          '═══════════════════════════\n' +
          'MENSAJE\n' +
          '═══════════════════════════\n\n' +
          comment + '\n\n' +
          '---\n' +
          'Enviado desde www.opencore.cl'
        );

        // Open mailto
        window.location.href = 'mailto:ventas@opencore.cl?subject=' + subject + '&body=' + body;

        // Show toast and reset
        showToast('¡Gracias! Nos pondremos en contacto pronto.');
        setTimeout(function() {
          contactForm.reset();
        }, 500);
      } else {
        showToast('Por favor completa los campos requeridos');
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
      });
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  var animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animation elements
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) {
    animationObserver.observe(el);
  });

  // ============================================
  // PERFORMANCE: Debounce scroll events
  // ============================================
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // ============================================
  // CONSOLE MESSAGE
  // ============================================
  console.log('%c OpenCORE v1.6 ', 'background: linear-gradient(135deg, #1E5FAD 0%, #7C5CE7 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
  console.log('%c Más de 20 años transformando empresas ', 'color: #1E5FAD; font-size: 14px; font-weight: 600;');
  console.log('%c ¿Interesado en trabajar con nosotros? ventas@opencore.cl ', 'color: #6b7280; font-size: 12px;');

})();
