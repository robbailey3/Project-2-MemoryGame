class Card {
  constructor(cardData, instance) {
    this.cardData = cardData;
    this.html = this.createCardContainer();
    this.html.append(this.createCardFront(), this.createCardBack());
  }
  createCardContainer(){
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    return cardContainer;
  }
  createCardFront() {
    const cardFront = document.createElement('div');
    const img = document.createElement('img');
    cardFront.classList.add('card-front');
    img.src = './img/card-front.png';
    cardFront.appendChild(img);
    return cardFront;
  }
  createCardBack() {
    const cardBack = document.createElement('div');
    const img = document.createElement('img');
    cardBack.classList.add('card-back');
    img.src = `./img/${this.cardData.img}`;
    cardBack.appendChild(img);
    return cardBack;
  }
}
