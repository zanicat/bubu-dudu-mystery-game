// Per-room configuration.
// Coordinates are percentages of the room canvas (1600 x 1000).
// `x, y` = top-left of the object; `w` = width; height auto-scales by image aspect ratio.

export const ROOMS = {
  dudu: {
    id: 'dudu',
    title: "Dudu's Room",
    background: 'assets/rooms/dudu-room.svg',
    // Order matters — this is the find order.
    placements: [
      { objectId: 'cat-treats', x: 41.5, y: 13, w: 5 },
      { objectId: 'yarn-ball', x: 45, y: 84, w: 5 },
      { objectId: 'paw-print', x: 7.5, y: 38, w: 3 },
      { objectId: 'fish-bone', x: 19.5, y: 56, w: 5 },
      { objectId: 'mouse-toy', x: 62, y: 73, w: 5 },
      { objectId: 'cat-collar', x: 76, y: 50, w: 4 },
      { objectId: 'cat-orange', x: 60, y: 47, w: 9 },
      { objectId: 'cat-white-markings', x: 84, y: 41, w: 11 },
    ],
    // Non-findable scatter clutter. Each click plays a soft tap and shows a name label.
    decorations: [
      // Hanging top: paper lanterns
      { src: 'assets/decorations/lantern.svg', x: 32, y: 0, w: 3.5, name: 'a paper lantern' },
      { src: 'assets/decorations/lantern.svg', x: 56, y: 0, w: 3.5, name: 'a paper lantern' },
      { src: 'assets/decorations/lantern.svg', x: 78, y: 0, w: 3.5, name: 'a paper lantern' },
      // Wall art
      { src: 'assets/decorations/clock.svg', x: 49, y: 4, w: 5, name: 'a clock' },
      { src: 'assets/decorations/picture-frame.svg', x: 13, y: 38, w: 5, name: 'a little picture' },
      { src: 'assets/decorations/picture-frame.svg', x: 92, y: 18, w: 5, name: 'a little picture' },
      // Above the shelf
      { src: 'assets/decorations/candle.svg', x: 50, y: 14, w: 2.8, name: 'a candle' },
      { src: 'assets/decorations/book-yellow.svg', x: 36, y: 16, w: 2.5, name: 'a yellow book' },
      { src: 'assets/decorations/mug.svg', x: 56, y: 17, w: 3.5, name: 'a mug' },
      // On top of cat tower
      { src: 'assets/decorations/book-yellow.svg', x: 64, y: 33, w: 2.5, name: 'a yellow book' },
      { src: 'assets/decorations/paper.svg', x: 67, y: 34, w: 3.5, name: 'a sheet of paper' },
      // Window-side corner plant
      { src: 'assets/decorations/plant-small.svg', x: 0.5, y: 35, w: 6, name: 'a houseplant' },
      // Desk surface clutter (clusters around fish-bone)
      { src: 'assets/decorations/book-red.svg', x: 14.5, y: 51, w: 3, name: 'a red book' },
      { src: 'assets/decorations/book-blue.svg', x: 17.5, y: 51, w: 3, name: 'a blue book' },
      { src: 'assets/decorations/book-green.svg', x: 24.5, y: 51, w: 3, name: 'a green book' },
      { src: 'assets/decorations/paper.svg', x: 11, y: 56, w: 4, name: 'some scribbled paper' },
      { src: 'assets/decorations/paper.svg', x: 26, y: 60, w: 4, name: 'some scribbled paper' },
      { src: 'assets/decorations/pencil.svg', x: 10, y: 63, w: 6, name: 'a pencil' },
      { src: 'assets/decorations/notebook.svg', x: 9, y: 56, w: 4, name: 'a notebook' },
      { src: 'assets/decorations/candle.svg', x: 28.5, y: 50, w: 3, name: 'a candle' },
      { src: 'assets/decorations/apple.svg', x: 23, y: 56, w: 3, name: 'an apple' },
      // Bed area extras (clusters around cat-collar and white cat)
      { src: 'assets/decorations/cushion.svg', x: 88, y: 53, w: 6, name: 'a fluffy cushion' },
      { src: 'assets/decorations/book-red.svg', x: 96, y: 48, w: 2.5, name: 'a red book' },
      { src: 'assets/decorations/plant-small.svg', x: 71, y: 45, w: 5, name: 'a houseplant' },
      // Floor / rug scatter (clusters around yarn-ball and mouse-toy)
      { src: 'assets/decorations/book-blue.svg', x: 36, y: 84, w: 2.8, name: 'a blue book' },
      { src: 'assets/decorations/book-green.svg', x: 56, y: 86, w: 2.8, name: 'a green book' },
      { src: 'assets/decorations/pencil.svg', x: 50, y: 90, w: 6, name: 'a pencil' },
      { src: 'assets/decorations/notebook.svg', x: 27, y: 88, w: 4, name: 'a notebook' },
      { src: 'assets/decorations/apple.svg', x: 60, y: 90, w: 3, name: 'an apple' },
      { src: 'assets/decorations/cushion.svg', x: 30, y: 78, w: 6, name: 'a floor cushion' },
      { src: 'assets/decorations/paper.svg', x: 9, y: 80, w: 4, name: 'crumpled paper' },
      { src: 'assets/decorations/mug.svg', x: 67, y: 82, w: 4, name: 'a mug' },
    ],
  },

  'dudu-beta': {
    id: 'dudu-beta',
    isBeta: true,
    title: "Dudu's Room ✦ Beta",
    background: 'dudu_room_gen.png',
    placements: [
      { objectId: 'meow-sign-beta',   x: 50, y: 5,  w: 10, h: 7  },
      { objectId: 'alarm-clock-beta', x: 6,  y: 40, w: 5,  h: 8  },
      { objectId: 'pencil-cup-beta',  x: 17, y: 38, w: 5,  h: 9  },
      { objectId: 'cat-stories-book', x: 3,  y: 65, w: 9,  h: 11 },
      { objectId: 'globe-beta',       x: 1,  y: 54, w: 11, h: 17 },
      { objectId: 'blue-yarn-beta',   x: 35, y: 63, w: 6,  h: 7  },
      { objectId: 'cat-bowl-beta',    x: 46, y: 72, w: 7,  h: 7  },
      { objectId: 'teddy-bear-beta',  x: 73, y: 36, w: 9,  h: 14 },
    ],
  },

  'bubu-beta': {
    id: 'bubu-beta',
    isBeta: true,
    title: "Bubu's Room ✦ Beta",
    background: 'bubu_room_gen.png',
    placements: [
      { objectId: 'basket-weave',       x: 5,  y: 48, w: 10, h: 15 },
      { objectId: 'candle-trio',        x: 31, y: 44, w: 7,  h: 9  },
      { objectId: 'lavender-vase',      x: 43, y: 34, w: 10, h: 18 },
      { objectId: 'teapot-beta',        x: 38, y: 41, w: 10, h: 12 },
      { objectId: 'purple-pillow-beta', x: 24, y: 61, w: 15, h: 16 },
      { objectId: 'moon-journal',       x: 35, y: 71, w: 9,  h: 10 },
      { objectId: 'bunny-slippers',     x: 17, y: 74, w: 11, h: 10 },
      { objectId: 'bunny-stuffed',      x: 83, y: 51, w: 8,  h: 16 },
    ],
  },

  bubu: {
    id: 'bubu',
    title: "Bubu's Room",
    background: 'assets/rooms/bubu-room.svg',
    placements: [
      { objectId: 'cookie', x: 16.5, y: 30, w: 3.5 },
      { objectId: 'dudu-plushie', x: 19, y: 36, w: 7 },
      { objectId: 'book-bubu', x: 24, y: 65, w: 4 },
      { objectId: 'teacup', x: 32, y: 71, w: 5 },
      { objectId: 'flower', x: 88, y: 36, w: 4.5 },
      { objectId: 'ribbon', x: 94, y: 70, w: 4 },
      { objectId: 'sushi', x: 39, y: 71, w: 5 },
      { objectId: 'sleeping-pillow', x: 51, y: 78, w: 9 },
    ],
    decorations: [
      // String of paper lanterns across top
      { src: 'assets/decorations/lantern.svg', x: 22, y: 0, w: 3.2, name: 'a paper lantern' },
      { src: 'assets/decorations/lantern.svg', x: 38, y: 1, w: 3.2, name: 'a paper lantern' },
      { src: 'assets/decorations/lantern.svg', x: 58, y: 1, w: 3.2, name: 'a paper lantern' },
      { src: 'assets/decorations/lantern.svg', x: 78, y: 0, w: 3.2, name: 'a paper lantern' },
      // Wall art
      { src: 'assets/decorations/clock.svg', x: 50, y: 18, w: 5, name: 'a clock' },
      { src: 'assets/decorations/picture-frame.svg', x: 6, y: 12, w: 5, name: 'a little picture' },
      { src: 'assets/decorations/picture-frame.svg', x: 92, y: 10, w: 5, name: 'a little picture' },
      // Bookshelf upper area (around cookie, dudu-plushie)
      { src: 'assets/decorations/book-yellow.svg', x: 22.5, y: 22, w: 2.4, name: 'a yellow book' },
      { src: 'assets/decorations/candle.svg', x: 12, y: 18, w: 2.5, name: 'a candle' },
      { src: 'assets/decorations/notebook.svg', x: 14, y: 22, w: 3.5, name: 'a notebook' },
      { src: 'assets/decorations/apple.svg', x: 25, y: 49, w: 2.8, name: 'an apple' },
      // Tea table / floor (clusters around teacup, sushi)
      { src: 'assets/decorations/teapot-small.svg', x: 36, y: 65, w: 5, name: 'a teapot' },
      { src: 'assets/decorations/mug.svg', x: 28, y: 67, w: 4, name: 'a mug' },
      { src: 'assets/decorations/notebook.svg', x: 30.5, y: 70, w: 4, name: 'a notebook' },
      { src: 'assets/decorations/paper.svg', x: 33, y: 70, w: 4, name: 'a love letter' },
      { src: 'assets/decorations/apple.svg', x: 44, y: 70, w: 3, name: 'an apple' },
      { src: 'assets/decorations/cookie.svg', x: 33, y: 80, w: 2.4, name: 'a cookie crumb' },
      // Floor cushions cluster (around sleeping-pillow)
      { src: 'assets/decorations/cushion.svg', x: 42, y: 84, w: 6, name: 'a floor cushion' },
      { src: 'assets/decorations/cushion.svg', x: 70, y: 86, w: 6, name: 'a floor cushion' },
      { src: 'assets/decorations/book-red.svg', x: 60, y: 89, w: 2.6, name: 'a red book' },
      { src: 'assets/decorations/paper.svg', x: 24, y: 90, w: 4, name: 'crumpled paper' },
      // Vanity area (clusters around flower)
      { src: 'assets/decorations/teapot-small.svg', x: 84, y: 35, w: 4, name: 'a teapot' },
      { src: 'assets/decorations/candle.svg', x: 81, y: 38, w: 3, name: 'a candle' },
      { src: 'assets/decorations/book-blue.svg', x: 79, y: 36, w: 2.8, name: 'a blue book' },
      // Bed corner (clusters around ribbon)
      { src: 'assets/decorations/book-green.svg', x: 90, y: 70, w: 2.6, name: 'a green book' },
      { src: 'assets/decorations/pencil.svg', x: 87, y: 76, w: 5, name: 'a pencil' },
      // Corner plants
      { src: 'assets/decorations/plant-small.svg', x: 1, y: 76, w: 5.5, name: 'a houseplant' },
      { src: 'assets/decorations/plant-small.svg', x: 67, y: 64, w: 5, name: 'a houseplant' },
    ],
  },
};
