// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  root.setAttribute('data-theme', storedTheme);
}
themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => nav.classList.toggle('show'));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav?.classList.remove('show');
    }
  });
});

// Intersection Observer for fade-in
const io = new IntersectionObserver((entries)=>{
  for (const e of entries){
    if(e.isIntersecting){ e.target.classList.add('is-inview'); io.unobserve(e.target); }
  }
},{threshold:.12});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));

// Hero network animation (lightweight, elegant)
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let w, h, points, rafId;
const COLORS_LIGHT = ['#00A6A6', '#FF6B35', '#002E4E'];
const COLORS_DARK  = ['#00A6A6', '#FFB599', '#7fb7ff'];

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = Math.max(400, window.innerHeight * 0.78);
  init();
}
window.addEventListener('resize', resize, {passive:true});

function init(){
  cancelAnimationFrame(rafId);
  const count = Math.round((w*h)/30000); // density
  points = Array.from({length: count}, ()=> ({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: (Math.random()-.5)*0.2,
    vy: (Math.random()-.5)*0.2
  }));
  animate();
}

function animate(){
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const palette = dark ? COLORS_DARK : COLORS_LIGHT;
  ctx.clearRect(0,0,w,h);
  // gentle parallax
  const t = performance.now()/8000;
  const ox = Math.sin(t)*12;
  const oy = Math.cos(t)*8;

  // update
  for (const p of points){
    p.x += p.vx; p.y += p.vy;
    if (p.x<0||p.x>w) p.vx*=-1;
    if (p.y<0||p.y>h) p.vy*=-1;
  }

  // draw connections
  for (let i=0;i<points.length;i++){
    const p = points[i];
    for (let j=i+1;j<points.length;j++){
      const q = points[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const d2 = dx*dx + dy*dy;
      if (d2 < 140*140){
        ctx.globalAlpha = Math.max(0, 1 - (d2 / (140*140))) * 0.25;
        ctx.strokeStyle = palette[(i+j)%palette.length];
        ctx.beginPath();
        ctx.moveTo(p.x+ox, p.y+oy);
        ctx.lineTo(q.x+ox, q.y+oy);
        ctx.stroke();
      }
    }
  }

  // draw nodes
  ctx.globalAlpha = 0.7;
  for (const [i,p] of points.entries()){
    ctx.fillStyle = palette[i%palette.length];
    ctx.beginPath();
    ctx.arc(p.x+ox, p.y+oy, 2, 0, Math.PI*2);
    ctx.fill();
  }

  rafId = requestAnimationFrame(animate);
}

// Sync theme changes with canvas palette
const themeObserver = new MutationObserver(()=>{ /* palette changes next frame */ });
themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

resize();

// Contact form (Formspree quick integration)
const FORMSPREE_ENDPOINT = ""; // TODO: set to your Formspree endpoint like "https://formspree.io/f/abcdwxyz"
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.textContent = "Enviando…";
  const data = Object.fromEntries(new FormData(form).entries());

  if(!FORMSPREE_ENDPOINT){
    statusEl.textContent = "Configuración requerida: agrega tu endpoint de Formspree en script.js (FORMSPREE_ENDPOINT).";
    statusEl.style.color = "var(--accent)";
    return;
  }

  try{
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method:'POST',
      headers:{'Accept':'application/json'},
      body: new FormData(form)
    });
    if (res.ok){
      statusEl.textContent = "¡Mensaje enviado! Te responderemos pronto.";
      statusEl.style.color = "var(--primary)";
      form.reset();
    } else {
      statusEl.textContent = "No se pudo enviar. Intenta nuevamente.";
      statusEl.style.color = "var(--accent)";
    }
  }catch(err){
    statusEl.textContent = "Error de red. Revisa tu conexión.";
    statusEl.style.color = "var(--accent)";
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
