// Per-room configuration.
// Coordinates are percentages of the room canvas.
// `x, y` = top-left of the object; `w` = width; height auto-scales by image aspect ratio.

export const ROOMS = {
  dudu: {
    id: 'dudu',
    title: "Dudu's Room",
    background: 'assets/rooms/dudu-room.svg',
    placements: [
      // Order matters — this is the find order.
      // 1) Cat treats — on the wall shelf
      { objectId: 'cat-treats', x: 41.5, y: 13, w: 5 },
      // 2) Orange tabby — peeking out of the cat tower hole
      { objectId: 'cat-orange', x: 60, y: 47, w: 9 },
      // 3) White-markings cat — on the bed by the pillow
      { objectId: 'cat-white-markings', x: 84, y: 41, w: 11 },
    ],
  },
  bubu: {
    id: 'bubu',
    title: "Bubu's Room",
    background: 'assets/rooms/bubu-room.svg',
    placements: [
      // 1) Sushi — on the tea tray
      { objectId: 'sushi', x: 39, y: 71, w: 5 },
      // 2) Sleeping pillow — on the floor cushion
      { objectId: 'sleeping-pillow', x: 51, y: 78, w: 9 },
      // 3) Dudu plushie — on the bookshelf
      { objectId: 'dudu-plushie', x: 19, y: 36, w: 7 },
    ],
  },
};
