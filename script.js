// Effet de défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation au défilement
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Choix du plan
const planA = document.getElementById('planA');
const planB = document.getElementById('planB');

planA.addEventListener('click', () => {
    alert("Plan A choisi : Économisez, achetez des MK2, vendez-les, puis attaquez les rivaux.");
});

planB.addEventListener('click', () => {
    alert("Plan B choisi : Attaquez directement les Herrera et la French pour dominer rapidement.");
});

// Effet de grain sur le fond
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.body.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
});
