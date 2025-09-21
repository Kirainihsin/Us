/* Subtle floating hearts background */
(function heartsBG(){
  const layer=document.querySelector('.bg-heart');
  for(let i=0;i<18;i++){
    const span=document.createElement('span');
    span.textContent = i%3===0?'💖':(i%3===1?'💕':'❤️');
    span.style.left = Math.random()*100+'vw';
    const dur = 6 + Math.random()*6;
    const delay = -Math.random()*dur; /* start at random positions */
    span.style.animationDuration = dur+'s';
    span.style.animationDelay = delay+'s';
    layer.appendChild(span);
  }
})();

/* Sparkle hearts on hover */
function popHearts(container){
  for(let i=0;i<6;i++){
    const h = document.createElement('span');
    h.textContent = ['✨','💖','💕'][Math.floor(Math.random()*3)];
    h.style.position='absolute';
    h.style.left = (50 + (Math.random()*40-20))+'%';
    h.style.top = (50 + (Math.random()*20-10))+'%';
    h.style.transform='translate(-50%,-50%)';
    h.style.opacity='0';
    h.style.fontSize=(12+Math.random()*14)+'px';
    h.style.transition='transform .9s ease, opacity .9s ease';
    container.appendChild(h);
    requestAnimationFrame(()=>{ /* animate */
      h.style.opacity='1';
      h.style.transform = `translate(-50%,-120%) scale(${1+Math.random()*0.6})`;
    });
    setTimeout(()=>h.remove(), 950);
  }
}

/* Attach hover handlers to frames */
document.querySelectorAll('.photo-frame').forEach(frame=>{
  const sparkle = frame.querySelector('.sparkle-layer');
  frame.addEventListener('mouseenter', ()=>popHearts(sparkle));
});

/* Lightbox viewer */
const frames = Array.from(document.querySelectorAll('.photo-frame'));
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const btnPrev = document.getElementById('lbPrev');
const btnNext = document.getElementById('lbNext');
const btnClose= document.getElementById('lbClose');
let current = 0;

function openLB(index){
  current = index;
  const img = frames[current].querySelector('img');
  lbImg.src = img.getAttribute('src');
  lbImg.alt = img.alt || '';
  lbCap.textContent = frames[current].dataset.caption || '';
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeLB(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function step(delta){
  current = (current + delta + frames.length) % frames.length;
  const img = frames[current].querySelector('img');
  lbImg.src = img.getAttribute('src');
  lbImg.alt = img.alt || '';
  lbCap.textContent = frames[current].dataset.caption || '';
}

frames.forEach((f,i)=>{
  f.addEventListener('click', ()=>openLB(i));
  f.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openLB(i) });
  f.setAttribute('tabindex','0');
  f.setAttribute('role','button');
  f.setAttribute('aria-label','Buka foto');
});

btnPrev.onclick=()=>step(-1);
btnNext.onclick=()=>step(1);
btnClose.onclick=closeLB;
lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLB() });
document.addEventListener('keydown',(e)=>{
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') closeLB();
  if(e.key==='ArrowLeft') step(-1);
  if(e.key==='ArrowRight') step(1);
});
