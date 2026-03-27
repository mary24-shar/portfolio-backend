// ================= TYPING ANIMATION =================
const text = "Front-End Developer | BCA Student";
const typingElement = document.querySelector(".typing");
let index = 0;

function typeEffect() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 70);
    }
}
typeEffect();


// ================= SCROLL REVEAL =================
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ================= SKILL BAR ANIMATION =================
window.addEventListener("load", () => {
    const bars = document.querySelectorAll(".progress-bar");
    bars.forEach(bar => {
        bar.style.width = bar.getAttribute("data-progress");
    });
});


// ================= PARTICLE BACKGROUND =================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5);
        this.speedY = (Math.random() - 0.5);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = "rgba(186,85,255,0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Adjust particles for mobile
const particleCount = window.innerWidth < 768 ? 60 : 120;

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Fix resize issue
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// ================= THEME TOGGLE =================
function toggleTheme() {
    const body = document.body;
    const toggle = document.querySelector(".theme-toggle");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        toggle.textContent = "☀️";
    } else {
        toggle.textContent = "🌙";
    }
}


// ================= BACKEND CONNECTION =================
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !message) {
        alert("Please fill all fields ❗");
        return;
    }

    try {
        const response = await fetch("https://portfolio-backend-7kfj.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        alert(data.message);
        form.reset();

    } catch (error) {
        alert("❌ Failed to connect to backend");
        console.error(error);
    }
});