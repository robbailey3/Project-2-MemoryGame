/**
 * @description Class for the cards
 * @class Card
 */
class Card {
  /**
   * @description Creates an instance of Card.
   * @param {object} cardData
   * @memberof Card
   */
  constructor(cardData) {
    this.cardData = cardData;
    this.html = this.createCardContainer();
    this.html.append(this.createCardFront(), this.createCardBack());
  }
  /**
   * @description Create the div container for the card
   * @return {HTMLElement} cardContainer
   * @memberof Card
   */
  createCardContainer() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    return cardContainer;
  }
  /**
   * @description Create the HTML for the front of the card
   * @return {HTMLElement} cardFront
   * @memberof Card
   */
  createCardFront() {
    const cardFront = document.createElement('div');
    const img = document.createElement('img');
    cardFront.classList.add('card-front');
    img.src = './img/card-front.png';
    cardFront.appendChild(img);
    return cardFront;
  }
  /**
   * @description Create the HTML for the back of the card
   * @return {HTMLElement} cardBack
   * @memberof Card
   */
  createCardBack() {
    const cardBack = document.createElement('div');
    const img = document.createElement('img');
    cardBack.classList.add('card-back');
    img.src = `./img/${this.cardData.img}`;
    cardBack.appendChild(img);
    return cardBack;
  }
}
