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
  'yarn-ball': {
    id: 'yarn-ball',
    displayName: 'Yarn Ball',
    image: 'assets/objects/yarn-ball.svg',
  },
  'fish-bone': {
    id: 'fish-bone',
    displayName: 'Fish Bone',
    image: 'assets/objects/fish-bone.svg',
  },
  'mouse-toy': {
    id: 'mouse-toy',
    displayName: 'Mouse Toy',
    image: 'assets/objects/mouse-toy.svg',
  },
  'paw-print': {
    id: 'paw-print',
    displayName: 'Paw Print',
    image: 'assets/objects/paw-print.svg',
  },
  'cat-collar': {
    id: 'cat-collar',
    displayName: "Dudu's Collar",
    image: 'assets/objects/cat-collar.svg',
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
  'teacup': {
    id: 'teacup',
    displayName: 'Teacup',
    image: 'assets/objects/teacup.svg',
  },
  'cookie': {
    id: 'cookie',
    displayName: 'Cookie',
    image: 'assets/objects/cookie.svg',
  },
  'book-bubu': {
    id: 'book-bubu',
    displayName: 'Bubu Storybook',
    image: 'assets/objects/book-bubu.svg',
  },
  'flower': {
    id: 'flower',
    displayName: 'Pink Flower',
    image: 'assets/objects/flower.svg',
  },
  'ribbon': {
    id: 'ribbon',
    displayName: 'Pink Ribbon',
    image: 'assets/objects/ribbon.svg',
  },
};

// Order matters: this is the gallery display order
export const ALL_OBJECT_IDS = [
  // Dudu's room
  'cat-treats',
  'cat-orange',
  'cat-white-markings',
  'yarn-ball',
  'fish-bone',
  'mouse-toy',
  'paw-print',
  'cat-collar',
  // Bubu's room
  'sushi',
  'sleeping-pillow',
  'dudu-plushie',
  'teacup',
  'cookie',
  'book-bubu',
  'flower',
  'ribbon',
];
