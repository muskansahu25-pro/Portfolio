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