class Game {
  constructor() {
    this.selectedCards = [];
    this.matches = 0;
  }
  init(selector, level) {
    this.host = document.querySelector(selector);
    this.level = level;
    this.timer = new Timer();
    this.gameRunning = false;
    this.clearHostElement();
    this.generateCards();
  }
  clearHostElement() {
    this.host.innerHTML = '';
  }
  generateCards() {
    this.cards = [];
    this.host.className = `flex-container cards-${
      this.level.pairs === 12 ? 6 : 4
    }`;
    for (let i = 0; i < this.level.pairs; i++) {
      this.cards.push(new Card(cards[i], 1));
      this.cards.push(new Card(cards[i], 2));
    }
    console.log(this);
    this.shuffle();
  }
  shuffle() {
    const arr = this.cards;
    let m = arr.length,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    this.addCardsToHost();
  }
  addCardsToHost() {
    this.cards.forEach(card => {
      this.host.append(card.container);
      card.container.addEventListener('click', () => {
        this.handleClick(card);
      });
    });
  }
  handleClick(card) {
    if (!this.gameRunning) {
      this.gameRunning = true;
      this.startTimer();
    }
    const cardEl = card.container;
    if (cardEl.classList.contains('flipped')) {
      return;
    }
    cardEl.classList.add('flipped');
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      if (this.selectedCards[0].cardData == this.selectedCards[1].cardData) {
        // We have a match
        this.matches++;
        if (this.matches === this.level.pairs) {
          alert('WINNER!!');
        }
        this.selectedCards = [];
      } else {
        // Got it wrong
        setTimeout(() => {
          this.selectedCards.forEach(card => {
            card.container.classList.remove('flipped');
          });
          this.selectedCards = [];
        }, 1000);
      }
    }
  }
  startTimer() {
    this.timer.startTimer();
    setInterval(() => {
      document.getElementById('timer').innerHTML = this.timer.getCurrentTime();
    }, 1000);
  }
}
