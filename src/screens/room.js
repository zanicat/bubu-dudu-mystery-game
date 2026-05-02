import { ROOMS } from '../data/rooms.js';
import { OBJECTS } from '../data/objects.js';
import { state } from '../state.js';
import { playFindChime, playMiss, playSoftClick } from '../audio.js';

export function renderRoom(goTo, params) {
  const room = ROOMS[params.roomId];
  if (!room) { goTo('menu'); return document.createElement('div'); }

  let currentIndex = 0;
  let remaining = room.placements.length;
  let popupTimer = null;

  const root = document.createElement('div');
  root.className = 'screen room-screen';

  const topbar = document.createElement('div');
  topbar.className = 'room-topbar';
  topbar.innerHTML = `
    <div class="title">${room.title}</div>
    <div class="target">
      <span class="target-label">find:</span>
      <div class="target-silhouette"><img alt=""/></div>
      <span class="target-name"></span>
    </div>
    <div class="progress"><span class="found-count">0</span> / ${room.placements.length}</div>
    <button class="leave-btn">↩ Menu</button>
  `;

  const stageWrap = document.createElement('div');
  stageWrap.className = 'room-stage-wrap';
  const stage = document.createElement('div');
  stage.className = 'room-stage';
  stageWrap.appendChild(stage);

  const bg = document.createElement('img');
  bg.className = 'room-bg';
  bg.src = room.background;
  bg.alt = '';
  stage.appendChild(bg);

  // Render every placement as an absolutely-positioned <img>
  const objectEls = room.placements.map((p) => {
    const obj = OBJECTS[p.objectId];
    const el = document.createElement('img');
    el.className = 'hidden-obj';
    el.src = obj.image;
    el.alt = obj.displayName;
    el.dataset.objectId = obj.id;
    el.style.left = p.x + '%';
    el.style.top = p.y + '%';
    el.style.width = p.w + '%';
    el.addEventListener('click', () => onClickObject(p, el));
    stage.appendChild(el);
    return el;
  });

  // Find popup overlay (lives inside stage)
  const popup = document.createElement('div');
  popup.className = 'find-popup';
  popup.style.display = 'none';
  stage.appendChild(popup);

  root.appendChild(topbar);
  root.appendChild(stageWrap);

  topbar.querySelector('.leave-btn').addEventListener('click', () => {
    playSoftClick();
    goTo('menu');
  });

  function updateTargetUI() {
    const next = room.placements[currentIndex];
    const targetImg = topbar.querySelector('.target-silhouette img');
    const nameEl = topbar.querySelector('.target-name');
    const countEl = topbar.querySelector('.found-count');
    countEl.textContent = String(room.placements.length - remaining);
    if (!next) {
      targetImg.style.display = 'none';
      nameEl.textContent = 'all found!';
      return;
    }
    const obj = OBJECTS[next.objectId];
    targetImg.style.display = '';
    targetImg.src = obj.image;
    nameEl.textContent = obj.displayName;
  }

  function onClickObject(placement, el) {
    const target = room.placements[currentIndex];
    if (!target) return;
    if (placement.objectId !== target.objectId) {
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
      playMiss();
      return;
    }

    // Correct find
    playFindChime();
    state.markFound(placement.objectId);
    el.classList.add('poof');
    setTimeout(() => { el.style.display = 'none'; }, 700);
    showFindPopup(placement.objectId);
    remaining -= 1;
    currentIndex += 1;

    if (remaining === 0) {
      // small delay to let the chime / poof finish before transitioning
      setTimeout(() => {
        if (room.id === 'dudu') {
          state.setLevelComplete(1);
          goTo('story', { which: 'outro-dudu' });
        } else {
          state.setLevelComplete(2);
          goTo('story', { which: 'outro-bubu' });
        }
      }, 1700);
    } else {
      // small delay so the popup flashes before showing next target
      setTimeout(updateTargetUI, 200);
    }
  }

  function showFindPopup(objectId) {
    const obj = OBJECTS[objectId];
    popup.innerHTML = `
      <div class="find-card">
        <img src="assets/characters/bubu-happy.webp" alt="Bubu happy"/>
        <div class="text">You found the<br/>${obj.displayName}!</div>
      </div>
    `;
    popup.style.display = 'flex';
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => { popup.style.display = 'none'; }, 1400);
  }

  updateTargetUI();
  return root;
}
