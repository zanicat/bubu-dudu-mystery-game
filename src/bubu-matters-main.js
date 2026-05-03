import { renderRoom } from './screens/room.js';
import { renderGallery } from './screens/gallery.js';
import { renderEndcard } from './screens/endcard.js';
import { playSoftClick } from './audio.js';

const BUBU_MATTERS_IDS = [
  'banners', 'calico-mug', 'coat-of-arms',
  'globe', 'ivy', 'sneakers', 'tanooki-tail',
];

function renderMenu(goTo) {
  const root = document.createElement('div');
  root.className = 'screen menu';
  root.innerHTML = `
    <div class="character-strip">
      <img src="assets/characters/bubu-neutral.gif" alt="Bubu"/>
    </div>
    <h1>Bubu Matters</h1>
    <p class="subtitle">a cozy little game for Bubu &amp; Dudu</p>
    <div class="menu-buttons">
      <button class="btn primary" data-action="play">Bubu Matters</button>
      <button class="btn" data-action="gallery">Gallery</button>
    </div>
  `;

  root.addEventListener('click', (e) => {
    const action = e.target?.dataset?.action;
    if (!action) return;
    playSoftClick();
    if (action === 'play') goTo('room', { roomId: 'bubu-matters' });
    else if (action === 'gallery') goTo('gallery', { objectIds: BUBU_MATTERS_IDS, title: 'Bubu Matters Gallery' });
  });

  return root;
}

const SCREENS = {
  menu: renderMenu,
  room: renderRoom,
  gallery: renderGallery,
  endcard: renderEndcard,
};

const app = document.getElementById('app');
let currentNode = null;

function goTo(name, params) {
  const fn = SCREENS[name];
  if (!fn) {
    console.error('unknown screen', name);
    return;
  }
  const next = fn(goTo, params || {});

  const old = currentNode;
  if (old) {
    old.classList.remove('active');
    setTimeout(() => old.remove(), 360);
  }
  app.appendChild(next);
  void next.offsetWidth;
  next.classList.add('active');
  currentNode = next;
}

goTo('menu');

window.__game = { goTo };
