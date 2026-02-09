/**
 * OpenCORE - Main JS v2.1
 * Premium hero effects, smooth scroll, form validation, advanced interactions
 */

(function() {
  'use strict';

  // ============================================
  // LOADING SCREEN
  // ============================================
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    setTimeout(function() {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 1400);
  });

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  var scrollProgress = document.getElementById('scrollProgress');
  var ticking = false;

  function updateScrollProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }, { passive: true });

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

  // ============================================
  // NAVBAR SCROLL - with transparency transition
  // ============================================
  function onScroll() {
    if (window.scrollY > 80) {
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
  // SMOOTH SCROLL
  // ============================================
  function smoothScrollTo(targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      var offset = target.offsetTop - (navbar ? navbar.offsetHeight : 0);
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

  // Hero CTA buttons smooth scroll
  document.querySelectorAll('.hero-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
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
  // SCROLL REVEAL
  // ============================================
  var revealObserverOpts = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, revealObserverOpts);

  document.querySelectorAll('.reveal, .reveal-mobile').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ============================================
  // CURSOR GLOW (Desktop only)
  // ============================================
  if (window.innerWidth > 768) {
    var cursorGlow = document.getElementById('cursorGlow');
    var mouseX = 0, mouseY = 0;
    var currentX = 0, currentY = 0;

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ============================================
  // HERO - Mouse Light Effect (Desktop)
  // ============================================
  if (window.innerWidth > 768) {
    var heroContainer = document.querySelector('.hero-container');
    var mouseLight = document.getElementById('heroMouseLight');

    if (heroContainer && mouseLight) {
      mouseLight.style.display = 'block';

      heroContainer.addEventListener('mousemove', function(e) {
        var rect = heroContainer.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        mouseLight.style.left = x + 'px';
        mouseLight.style.top = y + 'px';
      });

      heroContainer.addEventListener('mouseleave', function() {
        mouseLight.style.opacity = '0';
      });

      heroContainer.addEventListener('mouseenter', function() {
        mouseLight.style.opacity = '1';
      });
    }
  }

  // ============================================
  // HERO - Parallax on Scroll (Desktop)
  // ============================================
  if (window.innerWidth > 768) {
    var heroBgImg = document.querySelector('.hero-bg-img');
    var heroContent = document.querySelector('.hero-content');

    if (heroBgImg) {
      var parallaxTick = false;

      window.addEventListener('scroll', function() {
        if (!parallaxTick) {
          requestAnimationFrame(function() {
            var scrolled = window.scrollY;
            var heroHeight = heroBgImg.parentElement.parentElement.offsetHeight;

            if (scrolled < heroHeight) {
              var rate = scrolled * 0.3;
              heroBgImg.style.transform = 'scale(1.05) translateY(' + (rate) + 'px)';

              if (heroContent) {
                heroContent.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
                heroContent.style.opacity = Math.max(0, 1 - (scrolled / (heroHeight * 0.6)));
              }
            }
            parallaxTick = false;
          });
          parallaxTick = true;
        }
      }, { passive: true });
    }
  }

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================
  document.querySelectorAll('.magnetic').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
    });

    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ============================================
  // RIPPLE EFFECT on Submit Button
  // ============================================
  document.querySelectorAll('.ripple-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var rect = this.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 600);
    });
  });

  // ============================================
  // HERO - Scroll Indicator Hide on Scroll
  // ============================================
  var scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }

  // ============================================
  // STAGGERED CHILDREN
  // ============================================
  document.querySelectorAll('.stagger-children').forEach(function(parent) {
    var children = parent.children;
    Array.from(children).forEach(function(child, index) {
      child.style.animationDelay = (index * 0.1) + 's';
    });
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

  // Character counter
  var commentField = document.getElementById('comment');
  var charCount = document.getElementById('charCount');
  if (commentField && charCount) {
    commentField.addEventListener('input', function() {
      var len = this.value.length;
      charCount.textContent = '(' + len + '/600)';
      if (len >= 600) {
        charCount.style.color = '#e74c3c';
      } else if (len >= 500) {
        charCount.style.color = '#f39c12';
      } else {
        charCount.style.color = '';
      }
    });
  }

  if (contactForm) {
    var nextField = contactForm.querySelector('input[name="_next"]');
    if (nextField) {
      nextField.value = window.location.href.split('?')[0] + '?sent=1';
    }

    contactForm.addEventListener('submit', function(e) {
      if (!validateForm()) {
        e.preventDefault();
        var firstErr = contactForm.querySelector('.error');
        if (firstErr) firstErr.focus();
        return false;
      }
      return true;
    });

    if (window.location.search.indexOf('sent=1') !== -1) {
      showToast();
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    contactForm.querySelectorAll('input, select, textarea').forEach(function(el) {
      el.addEventListener('input', function() {
        this.classList.remove('error');
      });
      el.addEventListener('change', function() {
        this.classList.remove('error');
      });
    });
  }

  // ============================================
  // HERO - Text Typewriter for accent word
  // ============================================
  var heroAccent = document.getElementById('heroAccent');
  if (heroAccent) {
    var words = ['tecnologia', 'inteligencia', 'innovacion', 'automatizacion'];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;

    function typeWriter() {
      var currentWord = words[wordIndex];

      if (isDeleting) {
        heroAccent.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        heroAccent.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 300;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    // Start after hero animations complete
    setTimeout(typeWriter, 3000);
  }

})();
