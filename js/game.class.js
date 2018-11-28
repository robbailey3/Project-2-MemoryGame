class Game {
  constructor() {
    this.timer = new Timer();
  }
  reset(){
    this.selectedCards = [];
    this.tempCards = [];
    this.moves = 0;
    this.matches = 0;
  }
  init(selector, level) {
    this.reset();
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
      this.cards.push(new Card(cards[i]));
      this.cards.push(new Card(cards[i]));
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
    // Reset all of the counters and start the game
    this.gameRunning = true;
    this.moves = 0;
    this.incorrectMoves = 0;
    this.cards.forEach(card => {
      card.html.classList.remove('animate');
    });
    this.showStatsModal();
    this.startTimer();
  }
  endGame() {
    this.gameRunning = false;
    this.endTimer();
    this.hideStatsModal();
  }
  /**
   *
   * * Handle the user's click.
   * @param {Card} card
   * @memberof Game
   */
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
  /**
   *
   * * Check if the selected cards match.
   * @memberof Game
   */
  checkForMatch() {
    console.log(this);
    if (this.selectedCards[0].cardData == this.selectedCards[1].cardData) {
      // We have a match
      this.handleCorrectMove();
    } else {
      this.handleIncorrectMove();
    }
  }
  handleCorrectMove() {
    this.selectedCards.forEach(card => {
      card.html.classList.add('flash'); // Add the class for the animations
    });
    this.matches++; // Incremenet the match counter
    if (this.matches === this.level.pairs) {
      // If the user has found all the matches, the game is complete.
      this.gameComplete();
    }
    this.selectedCards = [];
  }
  handleIncorrectMove() {
    /*
     * Add the selected cards to a temporary array so they can be animated without blocking the user continuing.
     */
    this.tempCards.push(...this.selectedCards);
    this.selectedCards = [];
    this.incorrectMoves++;
    this.tempCards.forEach(card => {
      card.html.classList.add('incorrect');
    });
    // Show the flipped cards for 1 second prior to flipping back
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
    document.querySelector('#moves').innerText = this.moves;
  }
  gameComplete() {
    this.endTimer();
    this.calculateStars();
    this.hideStatsModal();
    this.gameCompleteModal();
  }
  calculateStars(){
    if(this.moves > this.level.oneStar){
      this.displayStars(1);      
    }else if (this.moves > this.level.twoStar){
      this.displayStars(2);
    }else{
      this.displayStars(3);
    }
  }
  gameCompleteModal() {
    this.showGameCompleteModal();
    document.querySelector('#number-of-moves').innerText = this.moves;
    document.querySelector('#incorrect-moves').innerText = this.incorrectMoves;
    document.querySelector(
      '#time-taken'
    ).innerText = this.timer.getTimeDifference();
    this.storeHighScore();
  }
  startTimer() {
    this.timer.startTimer();
    this.timerInterval = setInterval(() => {
      document.querySelector('#timer').innerHTML = this.timer.getCurrentTime();
    }, 1000);
  }
  endTimer() {
    this.timer.endTimer();
    clearInterval(this.timerInterval);
  }
  storeHighScore() {
    this.storedScores = JSON.parse(localStorage.getItem('highscores')) || {
      Easy: 0,
      Medium: 0,
      Hard: 0
    };
    const currentLevelName = this.level.name;
    if (
      this.storedScores[currentLevelName] === 0 ||
      this.moves < this.storedScores[currentLevelName]
    ) {
      this.storedScores[currentLevelName] = this.moves;
    }
    localStorage.setItem('highscores', JSON.stringify(this.storedScores));
  }
  displayStars(numberOfStars) {
    for(let i = 0; i < numberOfStars; i++){
      let div = document.createElement('div');
      div.classList.add('star-container');
      let star = document.createElement('img');
      star.classList.add('star');
      star.src = './img/star.png';
      div.appendChild(star);
      document.querySelector('#stars-container').appendChild(div);
    }
  }
  showHighscores() {
    document.querySelector('#highscores').classList = 'active';
    document.querySelector('#easy-score').innerText = this.storedScores.Easy;
    document.querySelector(
      '#medium-score'
    ).innerText = this.storedScores.Medium;
    document.querySelector('#hard-score').innerText = this.storedScores.Hard;
  }
  showGameCompleteModal() {
    document.querySelector('#game-complete').style.display = 'block';
  }
  hideGameCompleteModal() {
    document.querySelector('#game-complete').style.display = 'none';
  }
  showStatsModal() {
    document.querySelector('#stats-container').classList.add('active');
  }
  hideStatsModal() {
    document.querySelector('#stats-container').classList.remove('active');
  }
}
