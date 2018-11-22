class Card {
  constructor(cardData, instance) {
    this.cardData = cardData;
    this.container = document.createElement('div');
    this.container.classList.add(['card-container']);
    // this.container.id = cardData.name + '-' + instance;
    this.cardFront = document.createElement('div');
    this.cardFront.className = 'card-front';
    this.cardBack = document.createElement('img');
    this.cardBack.src = `img/${cardData.img}`;
    this.cardBack.className = 'card-back';
    this.container.append(this.cardFront, this.cardBack);
  }
}
