/* ============================================
   OpenCORE v1.7 - Interactive Banner Scripts
   ============================================ */

// Loading Screen
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }
});

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) return;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.pageYOffset;
  const progress = (scrolled / documentHeight) * 100;
  
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// Cursor Glow Effect (Desktop only)
if (window.innerWidth > 768) {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format number based on value
    const displayValue = Math.floor(current);
    if (target >= 100) {
      element.textContent = displayValue;
    } else {
      element.textContent = displayValue;
    }
  }, 16);
}

// Initialize counters when visible
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const countersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      
      // Animate counter
      animateCounter(counter, target);
      
      // Add plus sign if needed
      if (target >= 20 && target < 100) {
        setTimeout(() => {
          counter.textContent = `${target}+`;
        }, 2000);
      } else if (target >= 100) {
        setTimeout(() => {
          counter.textContent = `${target}+`;
        }, 2000);
      } else {
        setTimeout(() => {
          counter.textContent = `${target}%`;
        }, 2000);
      }
      
      // Stop observing after animation
      countersObserver.unobserve(counter);
    }
  });
}, observerOptions);

// Observe all counter elements
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    countersObserver.observe(counter);
  });
});

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.btn-primary-magnetic');

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-4px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal, .reveal-mobile');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// Form Handling (if forms exist)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'var(--c-error)';
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (isValid) {
      // Show success message
      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
      form.reset();
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  });
});

// Parallax Effect for Hero Shapes
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.05 * (index + 1);
    const yPos = scrolled * speed;
    shape.style.transform = `translateY(${yPos}px)`;
  });
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking && window.innerWidth > 768) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Console branding
console.log(
  '%c🚀 OpenCORE v1.7',
  'color: #1E5FAD; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
);
console.log(
  '%cTransformamos ideas en soluciones digitales',
  'color: #7C5CE7; font-size: 14px;'
);
