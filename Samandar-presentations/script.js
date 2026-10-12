// BACKGROUND ANIMATION (PARTICLES)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#00f2fe' : '#9d4edd';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// CALCULATOR LOGIC (1 SLIDE = 4000 UZS)
const slideRange = document.getElementById('slide-range');
const slideVal = document.getElementById('slide-count-val');
const totalPriceEl = document.getElementById('total-price');

let isFast = false;
let is3D = false;

function updatePrice() {
    const slides = parseInt(slideRange.value);
    slideVal.innerText = `${slides} ta slayd`;
    
    let total = slides * 4000;
    if (isFast) total += 10000;
    if (is3D) total += 15000;

    totalPriceEl.innerText = `${total.toLocaleString('uz-UZ')} UZS`;
}

function toggleOption(opt) {
    if (opt === 'fast') {
        isFast = !isFast;
        document.getElementById('opt-fast').classList.toggle('active', isFast);
    }
    if (opt === '3d') {
        is3D = !is3D;
        document.getElementById('opt-3d').classList.toggle('active', is3D);
    }
    updatePrice();
}

slideRange.addEventListener('input', updatePrice);

// TELEGRAM ORDER DIRECT LINK (@nobody_can_saw)
function sendOrderTelegram() {
    const slides = slideRange.value;
    const price = totalPriceEl.innerText;
    
    let msg = `Salom Samandar! Men taqdimot buyurtma qilmoqchiman:%0A%0A`;
    msg += `📌 Slaydlar soni: ${slides} ta%0A`;
    msg += `⚡ Tezkor tayyorlash: ${isFast ? 'Ha (+10,000 UZS)' : 'Yo\'q'}%0A`;
    msg += `🧊 3D Infografika: ${is3D ? 'Ha (+15,000 UZS)' : 'Yo\'q'}%0A`;
    msg += `💰 Umumiy narxi: ${price}`;

    window.open(`https://t.me/nobody_can_saw?text=${msg}`, '_blank');
}