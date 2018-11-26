class Game {
  constructor() {
    this.selectedCards = [];
    this.matches = 0;
    this.moves = 0;
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
      this.host.append(card.html);
      card.html.addEventListener('click', () => {
        this.handleClick(card);
      });
    });
  }
  startGame() {
    this.gameRunning = true;
    this.moves = 0;
    this.startTimer();
  }
  endGame() {
    this.gameRunning = false;
    this.endTimer();
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
    console.log('Checking for match');
    if (this.selectedCards[0].cardData == this.selectedCards[1].cardData) {
      // We have a match
      this.selectedCards.forEach((card) => {
        card.html.classList.add('flash');
      })
      this.matches++;
      console.log("Matches: " + this.matches);
      console.log("Pairs: " + this.level.pairs);
      if (this.matches === this.level.pairs) {
        this.gameComplete();
      }
      this.selectedCards = [];
    } else {
      this.selectedCards.forEach(card => {
        card.html.classList.add('incorrect');
      });
      // Got it wrong
      setTimeout(() => {
        this.selectedCards.forEach(card => {
          card.html.classList.remove('incorrect');
          card.html.classList.remove('flipped');
        });
        this.selectedCards = [];
      }, 1000);
    }
  }
  updateMoveCounter() {
    this.moves++;
    document.getElementById('moves').innerHTML = this.moves;
  }
  gameComplete(){
    alert('WINNER!!!');
    this.endTimer();
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
