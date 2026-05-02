import { state } from '../state.js';
import { playSoftClick } from '../audio.js';

export function renderMenu(goTo) {
  const save = state.get();
  const root = document.createElement('div');
  root.className = 'screen menu';
  root.innerHTML = `
    <div class="character-strip">
      <img src="assets/characters/bubu-neutral.gif" alt="Bubu"/>
      <img src="assets/characters/ending-together.gif" alt="Bubu and Dudu" style="display:${save.level1Complete ? 'block' : 'none'}"/>
    </div>
    <h1>Find Dudu's Cats</h1>
    <p class="subtitle">a cozy little game for Bubu &amp; Dudu</p>
    <div class="menu-buttons">
      <button class="btn primary" data-action="start">${save.level1Complete ? 'Play Again' : 'Start Game'}</button>
      <button class="btn" data-action="gallery">Gallery</button>
      ${save.level1Complete
        ? `<button class="btn bonus" data-action="bonus">⭐ Bubu's Room</button>`
        : ''}
    </div>
  `;

  root.addEventListener('click', (e) => {
    const action = e.target?.dataset?.action;
    if (!action) return;
    playSoftClick();
    if (action === 'start') goTo('story', { which: 'intro-dudu' });
    else if (action === 'gallery') goTo('gallery');
    else if (action === 'bonus') goTo('story', { which: 'intro-bubu' });
  });

  return root;
}
