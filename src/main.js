import { renderMenu } from './screens/menu.js';
import { renderStory } from './screens/story.js';
import { renderRoom } from './screens/room.js';
import { renderGallery } from './screens/gallery.js';
import { renderEndcard } from './screens/endcard.js';

const SCREENS = {
  menu: renderMenu,
  story: renderStory,
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

  // Cross-fade: fade out old, then mount new and fade in
  const old = currentNode;
  if (old) {
    old.classList.remove('active');
    setTimeout(() => old.remove(), 360);
  }
  app.appendChild(next);
  // force reflow then activate
  void next.offsetWidth;
  next.classList.add('active');
  currentNode = next;
}

// Boot
goTo('menu');

// Expose for debugging
window.__game = { goTo };
