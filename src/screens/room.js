import { ROOMS } from '../data/rooms.js';
import { OBJECTS } from '../data/objects.js';
import { state } from '../state.js';
import { playFindChime, playMiss, playSoftClick, playDecoTap } from '../audio.js';

export function renderRoom(goTo, params) {
  const room = ROOMS[params.roomId];
  if (!room) { goTo('menu'); return document.createElement('div'); }

  const isBeta = !!room.isBeta;
  let currentIndex = 0;
  let remaining = room.placements.length;
  let popupTimer = null;

  const root = document.createElement('div');
  root.className = 'screen room-screen';

  const topbar = document.createElement('div');
  topbar.className = 'room-topbar' + (isBeta ? ' room-topbar--beta' : '');
  topbar.innerHTML = `
    <div class="title">${room.title}</div>
    <div class="target">
      <span class="target-label">find:</span>
      ${isBeta ? '' : '<div class="target-silhouette"><img alt=""/></div>'}
      <span class="target-name"></span>
    </div>
    <div class="progress"><span class="found-count">0</span> / ${room.placements.length}</div>
    <button class="leave-btn">↩ Menu</button>
  `;

  const stageWrap = document.createElement('div');
  stageWrap.className = 'room-stage-wrap';
  const stage = document.createElement('div');
  stage.className = 'room-stage';
  if (new URLSearchParams(location.search).get('debug') === '1') {
    stage.classList.add('debug-regions');
  }
  stageWrap.appendChild(stage);

  const bg = document.createElement('img');
  bg.className = 'room-bg';
  bg.src = room.background;
  bg.alt = '';
  stage.appendChild(bg);

  // Decoration layer (non-findable scatter). Rendered before placements so
  // findables stack above and decoration clicks don't shadow them.
  (room.decorations || []).forEach((d) => {
    const el = document.createElement('img');
    el.className = 'room-deco';
    el.src = d.src;
    el.alt = '';
    el.style.left = d.x + '%';
    el.style.top = d.y + '%';
    el.style.width = d.w + '%';
    el.addEventListener('click', (ev) => {
      playDecoTap();
      showDecoLabel(d, ev);
    });
    stage.appendChild(el);
  });

  // Render placements. Classic rooms: visible <img> sprites. Beta rooms:
  // invisible <div> hotspots directly over the painted background art.
  const objectEls = room.placements.map((p) => {
    const obj = OBJECTS[p.objectId];
    let el;

    if (isBeta) {
      el = document.createElement('div');
      el.className = 'hidden-region';
      el.title = '';           // no tooltip spoiler
      el.style.left   = p.x + '%';
      el.style.top    = p.y + '%';
      el.style.width  = p.w + '%';
      el.style.height = (p.h || p.w) + '%';
    } else {
      el = document.createElement('img');
      el.className = 'hidden-obj';
      el.src = obj.image;
      el.alt = obj.displayName;
      el.dataset.objectId = obj.id;
      el.style.left  = p.x + '%';
      el.style.top   = p.y + '%';
      el.style.width = p.w + '%';
    }

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
      if (targetImg) targetImg.style.display = 'none';
      nameEl.textContent = 'all found!';
      return;
    }
    const obj = OBJECTS[next.objectId];
    if (targetImg) {
      targetImg.style.display = '';
      targetImg.src = obj.image;
    }
    nameEl.textContent = obj.displayName;
  }

  function onClickObject(placement, el) {
    const target = room.placements[currentIndex];
    if (!target) return;
    if (placement.objectId !== target.objectId) {
      // Wrong target
      if (isBeta) {
        // Flash a brief red tint at click location instead of shaking a sprite
        el.classList.remove('region-miss');
        void el.offsetWidth;
        el.classList.add('region-miss');
      } else {
        el.classList.remove('shake');
        void el.offsetWidth;
        el.classList.add('shake');
      }
      playMiss();
      return;
    }

    // Correct find
    playFindChime();
    state.markFound(placement.objectId);

    if (isBeta) {
      // Show expanding ring over the found region, then disable the hotspot
      showFindRing(placement, el);
      el.style.pointerEvents = 'none';
    } else {
      el.classList.add('poof');
      setTimeout(() => { el.style.display = 'none'; }, 700);
    }

    showFindPopup(placement.objectId);
    remaining -= 1;
    currentIndex += 1;

    if (remaining === 0) {
      setTimeout(() => {
        if (room.id === 'dudu') {
          state.setLevelComplete(1);
          goTo('story', { which: 'outro-dudu' });
        } else if (room.id === 'bubu') {
          state.setLevelComplete(2);
          goTo('story', { which: 'outro-bubu' });
        } else if (room.id === 'dudu-beta') {
          goTo('room', { roomId: 'bubu-beta' });
        } else {
          goTo('menu');
        }
      }, 1700);
    } else {
      setTimeout(updateTargetUI, 200);
    }
  }

  function showFindRing(placement, hotspot) {
    const ring = document.createElement('div');
    ring.className = 'beta-find-ring';
    const cx = placement.x + (placement.w / 2);
    const cy = placement.y + ((placement.h || placement.w) / 2);
    ring.style.left = cx + '%';
    ring.style.top  = cy + '%';
    // Ring diameter roughly matches the hotspot width
    const size = placement.w * 1.4;
    ring.style.width  = size + '%';
    ring.style.height = size + '%';
    stage.appendChild(ring);
    setTimeout(() => ring.remove(), 800);
  }

  function showDecoLabel(d, ev) {
    if (!d || !d.name) return;
    const label = document.createElement('div');
    label.className = 'deco-label';
    label.textContent = d.name;
    const rect = stage.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      label.style.left = (((ev.clientX - rect.left) / rect.width) * 100) + '%';
      label.style.top  = (((ev.clientY - rect.top)  / rect.height) * 100) + '%';
    }
    stage.appendChild(label);
    setTimeout(() => label.remove(), 750);
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
