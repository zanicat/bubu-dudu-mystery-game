// Catalog of every findable object across all levels.
// `image` is also used as the gallery sticker AND the silhouette source
// (CSS handles the silhouette via `filter: brightness(0)`).

export const OBJECTS = {
  'cat-treats': {
    id: 'cat-treats',
    displayName: 'Cat Treats',
    image: 'assets/objects/cat-treats.svg',
  },
  'cat-orange': {
    id: 'cat-orange',
    displayName: 'Orange Tabby',
    image: 'assets/cats/cat-orange.png',
  },
  'cat-white-markings': {
    id: 'cat-white-markings',
    displayName: 'White-Markings Cat',
    image: 'assets/cats/cat-white-markings.png',
  },
  'sushi': {
    id: 'sushi',
    displayName: 'Sushi',
    image: 'assets/objects/sushi.svg',
  },
  'sleeping-pillow': {
    id: 'sleeping-pillow',
    displayName: 'Sleeping Pillow',
    image: 'assets/objects/sleeping-pillow.svg',
  },
  'dudu-plushie': {
    id: 'dudu-plushie',
    displayName: 'Dudu Plushie',
    image: 'assets/objects/dudu-plushie.svg',
  },
};

// Order matters: this is the gallery display order
export const ALL_OBJECT_IDS = [
  'cat-treats',
  'cat-orange',
  'cat-white-markings',
  'sushi',
  'sleeping-pillow',
  'dudu-plushie',
];
