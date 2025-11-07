const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

toggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    toggle.textContent = navList.classList.contains('active') ? '✖️':'☰';
});

// Efecto nav scroll 
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.85)';
        header.style.boxShadow = 'none';
    }
});

// Reveal
const reveals = document.querySelectorAll('section, .card');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Texto escrito
const heroText = document.querySelector('.hero h1 span');
const text = heroText.textContent;
heroText.textContent = "";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 120);
    } else {
        heroText.classList.add('blink');
    }
}
typeEffect();

// Partículas
const canvas = document.createElement('canvas');
canvas.classList.add('particles');
document.querySelector('.hero').appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = document.querySelector('.hero').offsetHeight;

const particlesArray = [];
const numParticles = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = 'rgba(0, 255, 153, 0.6)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particlesArray) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();