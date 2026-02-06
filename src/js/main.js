// Main JS for Opencore 2.0

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve if we only want it to run once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const revealElements = document.querySelectorAll('.content-img');
revealElements.forEach(el => observer.observe(el));

// Hero Parallax
const heroImg = document.getElementById('hero-img');
window.addEventListener('scroll', () => {
    if (!heroImg) return;
    const scrollVal = window.scrollY;
    // Simple parallax: move background slightly slower than scroll
    if (scrollVal < window.innerHeight) {
        heroImg.style.transform = `scale(1.1) translateY(${scrollVal * 0.3}px)`;
    }
});

// Active Link Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current) && current !== '') {
            a.classList.add('active');
        }
    });
});

// Form Handling
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalText = submitBtn.innerText;

    // Simulate loading
    submitBtn.innerText = 'Enviando...';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
        submitBtn.innerText = '¡Mensaje Enviado!';
        submitBtn.style.backgroundColor = '#10b981'; // Success Green

        // Reset after 3 seconds
        setTimeout(() => {
            form.reset();
            submitBtn.innerText = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.opacity = '1';
        }, 3000);

        // Here you would implement actual email sending logic (mailto or API)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Form Data:', data);

        // Keep the mailto fallback if backend is not ready?
        // window.location.href = `mailto:ventas@opencore.cl?subject=Contacto Web&body=${data.message}...`;
    }, 1500);
});
