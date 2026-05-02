import { playSoftClick } from '../audio.js';

// Each beat is rendered into a single .story-card.
// Beat shape: { image | duo: [a, b], caption, hint?, durationMs?, advance: 'click'|'auto' }

const BEATS = {
  'intro-dudu': [
    {
      image: 'assets/characters/bubu-neutral.gif',
      caption: 'Help! My Dudu can’t find his cats and he’s crying. Can you help me find them for him? 🐱',
      hint: 'click to continue',
      advance: 'click',
    },
    {
      image: 'assets/characters/dudu-cry.webp',
      caption: 'mrrrrew … where did the kitties go …',
      hint: 'click to start searching',
      advance: 'click',
    },
  ],
  'intro-bubu': [
    {
      image: 'assets/characters/bubu-neutral.gif',
      caption: 'Wait! Now I can’t find my favorite things in my room. Could you help once more? ✨',
      hint: 'click to continue',
      advance: 'click',
    },
  ],
  'outro-dudu': [
    {
      image: 'assets/characters/bubu-happy.webp',
      caption: 'You found them all! Thank you so much for helping us! 🥺',
      advance: 'click',
      hint: 'click to continue',
    },
    {
      image: 'assets/characters/ending-together.gif',
      caption: 'Thank you for helping me find my cats! 😊 — Dudu',
      advance: 'click',
      hint: 'click to continue',
    },
    {
      image: 'assets/characters/ending-together.gif',
      caption: 'Yay! Bubu and Dudu, together again. ♡',
      advance: 'click',
      hint: 'click to continue',
    },
  ],
  'outro-bubu': [
    {
      image: 'assets/characters/bubu-happy.webp',
      caption: 'You did it again! Bubu is so grateful. ✨',
      advance: 'click',
      hint: 'click to continue',
    },
    {
      image: 'assets/characters/ending-together.gif',
      caption: 'Thank you for helping us both! ♡ Bubu &amp; Dudu',
      advance: 'click',
      hint: 'click to continue',
    },
  ],
};

export function renderStory(goTo, params) {
  const which = params?.which || 'intro-dudu';
  const beats = BEATS[which] || [];
  let i = 0;

  const root = document.createElement('div');
  root.className = 'screen story';
  const cardWrap = document.createElement('div');
  cardWrap.className = 'story-card';
  root.appendChild(cardWrap);

  function renderBeat() {
    const beat = beats[i];
    if (!beat) {
      onDone();
      return;
    }
    cardWrap.classList.remove('fade-in');
    void cardWrap.offsetWidth;
    cardWrap.classList.add('fade-in');
    cardWrap.innerHTML = `
      ${beat.duo
        ? `<div class="duo">${beat.duo.map(src => `<img src="${src}" alt=""/>`).join('')}</div>`
        : `<img src="${beat.image}" alt=""/>`}
      <p>${beat.caption}</p>
      ${beat.hint ? `<div class="hint">${beat.hint}</div>` : ''}
    `;

    if (beat.advance === 'auto' && beat.durationMs) {
      setTimeout(advance, beat.durationMs);
    }
  }

  function advance() {
    playSoftClick();
    i += 1;
    if (i >= beats.length) onDone();
    else renderBeat();
  }

  function onDone() {
    if (which === 'intro-dudu') goTo('room', { roomId: 'dudu' });
    else if (which === 'intro-bubu') goTo('room', { roomId: 'bubu' });
    else if (which === 'outro-dudu') goTo('endcard', { which: 'dudu' });
    else if (which === 'outro-bubu') goTo('endcard', { which: 'bubu' });
    else goTo('menu');
  }

  root.addEventListener('click', advance);
  renderBeat();
  return root;
}
