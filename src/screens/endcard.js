import { playSoftClick, playUnlock } from '../audio.js';
import { state } from '../state.js';

export function renderEndcard(goTo, params) {
  const which = params?.which || 'dudu';
  const root = document.createElement('div');
  root.className = 'screen endcard';

  const message = which === 'dudu'
    ? 'Dudu and his cats are reunited! ♡ A secret room is now waiting in the menu.'
    : which === 'bubu'
    ? 'Both rooms found! Bubu and Dudu thank you. ✨'
    : "Bubu's things are all found! ♡ Thank you for helping Bubu.";

  root.innerHTML = `
    <img class="end-bg" src="assets/rooms/end-card.svg" alt=""/>
    <div class="end-card-inner">
      <img src="assets/characters/ending-together.gif" alt="Bubu and Dudu together"/>
      <p>${message}</p>
      <button class="btn primary" data-action="menu">Back to menu</button>
    </div>
  `;

  // Play the unlock fanfare on first arrival here from L1
  if (which === 'dudu' || which === 'bubu-matters') {
    setTimeout(() => playUnlock(), 250);
  }

  root.querySelector('button').addEventListener('click', () => {
    playSoftClick();
    goTo('menu');
  });

  return root;
}
