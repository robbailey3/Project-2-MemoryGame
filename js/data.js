/**
 * * NOTE: The star thresholds are based on:
 * * * One Star = Math.floor(totalcards * 1.2);
 * * * Two Star = Math.floor(totalcards * 0.8);
 *  */

const levels = {
  easy: {
    id: 1,
    name: 'Easy',
    pairs: 6,
    oneStar: 14,
    twoStar: 9,
  },
  medium: {
    id: 2,
    name: 'Medium',
    pairs: 8,
    oneStar: 19,
    twoStar: 12,
  },
  hard: {
    id: 3,
    name: 'Hard',
    pairs: 12,
    oneStar: 28,
    twoStar: 19,
  },
};

const cards = [
  {
    name: 'bear',
    img: 'bear.png',
  },
  {
    name: 'butterfly',
    img: 'butterfly.png',
  },
  {
    name: 'camel',
    img: 'camel.png',
  },
  {
    name: 'cat',
    img: 'cat.png',
  },
  {
    name: 'chicken',
    img: 'chicken.png',
  },
  {
    name: 'cow',
    img: 'cow.png',
  },
  {
    name: 'crab',
    img: 'crab.png',
  },
  {
    name: 'crocodile',
    img: 'crocodile.png',
  },
  {
    name: 'deer',
    img: 'deer.png',
  },
  {
    name: 'dog',
    img: 'dog.png',
  },
  {
    name: 'elephant',
    img: 'elephant.png',
  },
  {
    name: 'koala',
    img: 'koala.png',
  },
];
