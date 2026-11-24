// ===== MENU TOGGLE =====
const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

// ===== WORD SEARCH (fills random letters around the section links) =====
const COLS = 12;
const rows = [
  null,
  ['SKILLS', 'skills'], null,
  ['PROJECTS', 'projects'], null,
  ['EXPERIENCE', 'experience'], null,
  ['EDUCATION', 'education'], null,
  ['CONTACT', 'contact'], null
];
const rand = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
const grid = document.getElementById('wordsearch');
rows.forEach(r => {
  const row = document.createElement('div');
  row.className = 'row';
  if (!r) {
    row.textContent = Array.from({ length: COLS }, rand).join('');
  } else {
    const [word, id] = r;
    const left = Math.floor(Math.random() * (COLS - word.length));
    const a = document.createElement('a');
    a.href = '#' + id; a.textContent = word;
    row.append(Array.from({ length: left }, rand).join(''), a,
               Array.from({ length: COLS - left - word.length }, rand).join(''));
  }
  grid.appendChild(row);
});

// ===== HANDWRITTEN TEXT REVEAL =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .3 });
document.querySelectorAll('.hand').forEach(el => io.observe(el));

// ===== MISSING PHOTO FALLBACK =====
document.querySelectorAll('img').forEach(img => {
  const flag = () => img.classList.add('missing');
  img.addEventListener('error', flag);
  if (img.complete && img.naturalWidth === 0) flag();
});

// ===== TWINKLING STARS in the hero =====
const twCard = document.querySelector('#home');
if (twCard) {
  // [left %, top %, size px]
  const spots = [
    [6,12,24],[16,70,14],[30,9,12],[42,22,28],[54,7,16],[60,40,12],[70,15,22],
    [80,52,14],[90,8,30],[92,34,12],[12,42,18],[48,58,10],[66,80,16],[26,86,12],
    [84,76,20],[36,46,10]
  ];
  spots.forEach(([x, y, s], i) => {
    const el = document.createElement('i');
    el.className = 'tw' + (i % 3 === 0 ? ' five' : '') + (i % 4 === 1 ? ' gold' : '');
    el.style.cssText =
      `left:${x}%;top:${y}%;width:${s}px;height:${s}px;` +
      `animation-duration:${(2.2 + Math.random() * 2.6).toFixed(1)}s;` +
      `animation-delay:${(Math.random() * 3).toFixed(1)}s`;
    twCard.appendChild(el);
  });
}

