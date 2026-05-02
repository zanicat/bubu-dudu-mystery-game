import { OBJECTS, ALL_OBJECT_IDS } from '../data/objects.js';
import { state } from '../state.js';
import { playSoftClick } from '../audio.js';

export function renderGallery(goTo) {
  const save = state.get();
  const root = document.createElement('div');
  root.className = 'screen gallery';
  const inner = document.createElement('div');
  inner.className = 'gallery-inner';
  root.appendChild(inner);

  inner.innerHTML = `
    <h2>Sticker Gallery</h2>
    <p class="subtitle">found ${Object.keys(save.foundStickers).length} of ${ALL_OBJECT_IDS.length}</p>
    <div class="grid">
      ${ALL_OBJECT_IDS.map(id => {
        const obj = OBJECTS[id];
        const found = state.isFound(id);
        return `
          <div class="sticker ${found ? 'unlocked' : 'locked'}">
            <img src="${obj.image}" alt="${found ? obj.displayName : 'locked sticker'}"/>
            <div class="name">${found ? obj.displayName : '???'}</div>
          </div>
        `;
      }).join('')}
    </div>
    <footer>
      <button class="btn ghost" data-action="back">↩ Back to menu</button>
      <button class="btn ghost" data-action="reset" style="font-size:13px; padding:8px 14px; border-width:1px;">Reset progress</button>
    </footer>
  `;

  root.addEventListener('click', (e) => {
    const action = e.target?.dataset?.action;
    if (!action) return;
    playSoftClick();
    if (action === 'back') goTo('menu');
    if (action === 'reset') {
      if (confirm('Reset all progress? Your gallery and bonus level unlock will be cleared.')) {
        state.reset();
        goTo('menu');
      }
    }
  });

  return root;
}
