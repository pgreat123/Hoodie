// ==========================================
// HOODIE Particle Background
// ==========================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.8 + 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y -= this.speed;

        if (this.y < -10) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(0,245,255,${this.opacity})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00F5FF";

        ctx.fill();
    }
}

function initParticles() {

    particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }

}

initParticles();

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();
