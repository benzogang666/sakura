/* ============================
   index.js — Асылай 1 жас тойы
   ============================ */

/* ===== МУЗЫКА ===== */
const musicBtn = document.getElementById('musicBtn');
const bgMusic  = document.getElementById('bgMusic');
let isPlaying  = false;

// Автозапуск при открытии
window.addEventListener('load', () => {
  bgMusic.play().catch(() => {});
  musicBtn.textContent = '🎶';
  musicBtn.classList.add('playing');
  isPlaying = true;
});

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('playing');
    isPlaying = false;
  } else {
    bgMusic.play().catch(() => {});
    musicBtn.textContent = '🎶';
    musicBtn.classList.add('playing');
    isPlaying = true;
  }
});

/* ===== COUNTDOWN ===== */
const targetDate = new Date('2026-06-28T12:00:00');

function updateCountdown() {
  const now  = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<div class="count-block"><span>🎉</span><small>Той басталды!</small></div>';
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  document.getElementById('days').textContent    = String(days).padStart(2,'0');
  document.getElementById('hours').textContent   = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== КОНФЕТТИ — медленное, редкое, золотое ===== */
const canvas = document.getElementById('confetti-canvas');
const ctx    = canvas.getContext('2d');

let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

// Тёплая казахская палитра — только тихие, редкие частицы
const COLORS = ['#C9973A','#E8C56A','#B8722A','#A0522D','#F5ECD7','#E8D5B0'];

// Всего 35 частиц вместо 120 — редкое «золотое» падение
const pieces = Array.from({ length: 35 }, () => createPiece());

function createPiece(fromTop = false) {
  return {
    x:      Math.random() * W,
    y:      fromTop ? -10 : Math.random() * H,
    r:      3 + Math.random() * 5,
    dx:     (Math.random() - 0.5) * 0.6,   // медленно в стороны
    dy:     0.4 + Math.random() * 0.8,      // медленно вниз
    angle:  Math.random() * Math.PI * 2,
    dAngle: (Math.random() - 0.5) * 0.02,  // почти не вращается
    color:  COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.35 + Math.random() * 0.35,
  };
}

function animateConfetti() {
  ctx.clearRect(0, 0, W, H);

  pieces.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle   = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    // Простые ромбы — как казахский орнамент
    ctx.beginPath();
    ctx.moveTo(0, -p.r);
    ctx.lineTo(p.r * 0.6, 0);
    ctx.lineTo(0,  p.r);
    ctx.lineTo(-p.r * 0.6, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    p.x     += p.dx;
    p.y     += p.dy;
    p.angle += p.dAngle;

    if (p.y > H + 15) {
      Object.assign(p, createPiece(true));
      p.y = -10;
    }
  });

  requestAnimationFrame(animateConfetti);
}

animateConfetti();

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);

revealEls.forEach(el => observer.observe(el));

/* ===== КЛИК — мягкие золотые искры ===== */
document.addEventListener('click', (e) => {
  const syms = ['✦','❖','✧','❋','💛','✨'];
  for (let i = 0; i < 4; i++) {
    const el = document.createElement('div');
    el.textContent = syms[Math.floor(Math.random() * syms.length)];
    el.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top:  ${e.clientY}px;
      font-size: ${12 + Math.random() * 14}px;
      pointer-events: none;
      z-index: 9999;
      color: #C9973A;
      animation: softBurst 1s ease forwards;
      --dx: ${(Math.random() - 0.5) * 60}px;
      --dy: ${-25 - Math.random() * 50}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes softBurst {
    0%   { transform: translate(0,0) scale(1);   opacity: 0.9; }
    100% { transform: translate(var(--dx), var(--dy)) scale(0.4); opacity: 0; }
  }
`;
document.head.appendChild(style);
