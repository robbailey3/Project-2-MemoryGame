class Game {
  constructor() {
    this.timer = new Timer();
    this.selectedCards = [];
    this.tempCards = [];
    this.matches = 0;
    this.moves = 0;
  }
  init(selector, level) {
    this.host = document.querySelector(selector);
    this.level = level;
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
    this.shuffle();
  }
  shuffle() {
    let m = this.cards.length,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [this.cards[m], this.cards[i]] = [this.cards[i], this.cards[m]];
    }
    this.addCardsToHost();
  }
  addCardsToHost() {
    let i = 0;
    this.cards.forEach(card => {
      this.host.append(card.html);
      card.html.classList.add('animate');
      card.html.addEventListener('click', () => {
        this.handleClick(card);
      });
      i++;
    });
  }
  startGame() {
    this.gameRunning = true;
    this.moves = 0;
    this.incorrectMoves = 0;
    this.cards.forEach(card => {
      card.html.classList.remove('animate');
    });
    document.querySelector('#stats-container').classList.add('active');
    this.startTimer();
  }
  endGame() {
    this.gameRunning = false;
    this.endTimer();
    document.querySelector('#stats-container').classList.remove('active');
  }
  handleClick(card) {
    if (!this.gameRunning) {
      // Start the game on first click
      this.startGame();
    }
    const cardEl = card.html;
    if (cardEl.classList.contains('flipped')) {
      return;
    }
    cardEl.classList.add('flipped');
    this.selectedCards.push(card);
    /* When two cards are selected, update the move counter and check for a match */
    if (this.selectedCards.length === 2) {
      this.updateMoveCounter();
      this.checkForMatch();
    }
  }
  checkForMatch() {
    if (this.selectedCards[0].cardData == this.selectedCards[1].cardData) {
      // We have a match
      this.selectedCards.forEach(card => {
        card.html.classList.add('flash');
      });
      this.matches++;
      if (this.matches === this.level.pairs) {
        this.gameComplete();
      }
      this.selectedCards = [];
    } else {
      this.incorrectMove();
    }
  }
  incorrectMove() {
    this.tempCards.push(...this.selectedCards);
    this.selectedCards = [];
    // Got it wrong
    this.incorrectMoves++;
    this.tempCards.forEach(card => {
      card.html.classList.add('incorrect');
    });
    setTimeout(() => {
      this.tempCards.forEach(card => {
        card.html.classList.remove('incorrect');
        card.html.classList.remove('flipped');
      });
      this.tempCards = [];
    }, 1000);
  }
  updateMoveCounter() {
    this.moves++;
    document.getElementById('moves').innerHTML = this.moves;
  }
  gameComplete() {
    this.endTimer();
    document.getElementById('game-complete').style.display = 'block';
    addTextToEl('#number-of-moves', this.moves);
    document.getElementById('incorrect-moves').innerText = this.incorrectMoves;
    document.getElementById(
      'time-taken'
    ).innerText = this.timer.getTimeDifference();
  }
  startTimer() {
    this.timer.startTimer();
    this.timerInterval = setInterval(() => {
      document.getElementById('timer').innerHTML = this.timer.getCurrentTime();
    }, 1000);
  }
  endTimer() {
    this.timer.endTimer();
    clearInterval(this.timerInterval);
  }
}
const addTextToEl = (elRef, text) => {
  document.querySelector(elRef).innerText = text;
};
