// OpenCORE 3.0 Logic

// Spotlight Effect for Bento Cards
const cards = document.querySelectorAll('.bento-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Terminal Auto-Type Effect (Simulated)
const inputs = document.querySelectorAll('.input-ghost');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('.prompt').style.textShadow = "0 0 10px #22c55e";
    });
    input.addEventListener('blur', () => {
        input.parentElement.querySelector('.prompt').style.textShadow = "none";
    });
});

// Form Submit Simulation
const form = document.getElementById('terminalForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('executeBtn');
        const originalText = btn.innerText;

        btn.innerText = "EXECUTING_PROTOCOL...";
        btn.style.color = "#eab308";

        setTimeout(() => {
            btn.innerText = ">> TRANSMISSION_ESTABLISHED";
            btn.style.color = "#22c55e";

            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.style.color = "";
            }, 3000);
        }, 1500);
    });
}
