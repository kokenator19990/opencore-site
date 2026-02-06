// Main JS for Opencore 2.0

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 800); // 0.8s simulated load
    }
});

// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Simple lag effect
        const currentX = parseFloat(cursorGlow.style.left) || 0;
        const currentY = parseFloat(cursorGlow.style.top) || 0;

        // Linear interpolation for smooth lag
        const x = currentX + (mouseX - currentX) * 0.15;
        const y = currentY + (mouseY - currentY) * 0.15;

        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;

        requestAnimationFrame(animateCursor);
    }
    // Initialize position
    cursorGlow.style.left = '50%';
    cursorGlow.style.top = '50%';
    animateCursor();
}


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
        }
    });
}, observerOptions);

document.querySelectorAll('.content-img').forEach(el => observer.observe(el));

// Hero Parallax
const heroImg = document.getElementById('hero-img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        if (scrollVal < window.innerHeight) {
            heroImg.style.transform = `scale(1.1) translateY(${scrollVal * 0.3}px)`;
        }
    });
}

// Form Handling
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const originalText = submitBtn.innerText;

        submitBtn.innerText = 'Enviando...';
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.innerText = '¡Mensaje Enviado!';
            submitBtn.style.backgroundColor = '#10b981';

            setTimeout(() => {
                form.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}
