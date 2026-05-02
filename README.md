# Find Dudu's Cats

A cozy hidden-objects browser game starring Bubu and Dudu.

## How to play

1. Open `index.html` in a modern browser (Chrome, Firefox, Safari, or Edge).
   - Because it uses ES modules, it must be served over HTTP — opening the
     local file directly may produce CORS errors. The simplest options:
     ```
     # Python (already on most systems)
     python3 -m http.server 8000

     # or Node's http-server
     npx http-server -p 8000
     ```
     Then visit http://localhost:8000.
2. Pick **Start Game** to play Dudu's room. Find each item the silhouette
   shows in the top bar. There are no timers and no hints — just look around.
3. After completing Dudu's room, a ⭐ Bubu's Room button appears on the
   main menu as a bonus level.
4. The **Gallery** menu option shows your sticker collection. Locked stickers
   appear as silhouettes; finding an item unlocks the colored sticker.

Progress (gallery + bonus unlock) is saved in your browser's localStorage,
so you can close the tab and come back later.

## Project layout

```
bubu_dudu_mystery_game/
├── index.html
├── styles.css
├── src/
│   ├── main.js               entry + screen router
│   ├── state.js              save data + localStorage
│   ├── audio.js              Web Audio synth (no audio files needed)
│   ├── data/
│   │   ├── objects.js        object catalog (id, name, image)
│   │   └── rooms.js          per-room layout + object placements
│   └── screens/              one module per screen
│       ├── menu.js
│       ├── story.js          story popup runner (reused for intros + outros)
│       ├── room.js           hidden-object gameplay loop
│       ├── gallery.js        sticker book
│       └── endcard.js        post-level celebratory screen
└── assets/
    ├── characters/           the four Bubu/Dudu animated stickers
    ├── cats/                 the two cat cutouts (split from the source PNG)
    ├── rooms/                room backgrounds (SVG)
    └── objects/              illustrated hidden objects (SVG)
```

The original source files are kept at the project root for reference:
`bubu-dudu-cat.gif`, `bubu-dudu-sseeyall.webp`, `dudu_cry.webp`,
`bubu-dudu._ending.gif`, and `benny_simba_cats_drawing_edited_enlarged_2024-12-06.png`.

## Swapping art

Every asset is referenced by a stable filename, so swapping art is a
file replacement — no code changes needed.

| What you want to change | Replace this file |
| --- | --- |
| Bubu's neutral pose | `assets/characters/bubu-neutral.gif` |
| Bubu's happy reaction (find popup) | `assets/characters/bubu-happy.webp` |
| Dudu crying (intro) | `assets/characters/dudu-cry.webp` |
| Both characters together (endings) | `assets/characters/ending-together.gif` |
| Orange cat | `assets/cats/cat-orange.png` (transparent BG) |
| White-markings cat | `assets/cats/cat-white-markings.png` (transparent BG) |
| Dudu's room art | `assets/rooms/dudu-room.svg` |
| Bubu's room art | `assets/rooms/bubu-room.svg` |
| End card backdrop | `assets/rooms/end-card.svg` |
| Cat treats | `assets/objects/cat-treats.svg` |
| Sushi | `assets/objects/sushi.svg` |
| Sleeping pillow | `assets/objects/sleeping-pillow.svg` |
| Dudu plushie | `assets/objects/dudu-plushie.svg` |

If you want to reposition a hidden object, edit
`src/data/rooms.js` — coordinates are percentages of the room.

## Sound

All sounds (find chime, unlock fanfare, button click) are generated at
runtime via the Web Audio API. There are no audio files. To swap to
custom sounds, edit `src/audio.js`.

## Notes

- The two cat images were split from
  `benny_simba_cats_drawing_edited_enlarged_2024-12-06.png` with a
  transparent-background chroma key. Because the cats overlap in the
  source artwork, each cutout has minor edge artifacts where the other
  cat shows through; at gameplay display sizes (~10 % of room width),
  these are not noticeable.
- The animated GIF/WebP characters play their loops automatically when
  rendered inside an `<img>` tag.
