/**
 * @description The main class for the game
 * @class Game
 */
class Game {
  constructor() {
    this.timer = new Timer();
  }
  /**
   * @description Set all of the variables to their initial state (e.g. move counter)
   * @memberof Game
   */
  reset() {
    this.selectedCards = [];
    this.tempCards = [];
    this.moves = 0;
    this.incorrectMoves = 0;
    this.matches = 0;
  }
  /**
   * @description Call this method to begin the game
   * @param {string} selector The id or class of the element which hosts the game
   * @param {Level} level The level of the game (from the levels array in data.js)
   * @memberof Game
   */
  init(selector, level) {
    this.reset();
    this.host = document.querySelector(selector);
    this.level = level;
    this.gameRunning = false;
    this.clearHostElement();
    this.generateCards();
  }
  /**
   * @description Method to clear all of the content from the game host element
   * @memberof Game
   */
  clearHostElement() {
    this.host.innerHTML = '';
  }
  /**
   *
   * @description Method to generate the array of cards
   * @memberof Game
   */
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
    this.addCardsToHost();
  }
  /**
   * @description Method to shuffle the array of cards so they are in a random order
   * @memberof Game
   */
  shuffle() {
    let m = this.cards.length;
    let i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [this.cards[m], this.cards[i]] = [this.cards[i], this.cards[m]];
    }
  }
  /**
   * @description Append each card to the host
   * @memberof Game
   */
  addCardsToHost() {
    let i = 0;
    this.cards.forEach((card) => {
      this.host.append(card.html);
      card.html.classList.add('animate');
      card.html.addEventListener('click', () => {
        this.handleClick(card);
      });
      i++;
    });
  }
  /**
   * @description Method to start the game
   * @memberof Game
   */
  startGame() {
    // Reset the counters and start the game
    this.reset();
    this.gameRunning = true;
    this.cards.forEach((card) => {
      card.html.classList.remove('animate');
    });
    this.showStatsModal();
    this.startTimer();
  }
  /**
   * @description Method to end the game
   * @memberof Game
   */
  endGame() {
    this.gameRunning = false;
    this.endTimer();
    this.hideStatsModal();
  }
  /**
   *
   * @description Handle the user's click.
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
   * @description Check if the selected cards match.
   * @memberof Game
   */
  checkForMatch() {
    if (this.selectedCards[0].cardData == this.selectedCards[1].cardData) {
      // We have a match
      this.handleCorrectMove();
    } else {
      this.handleIncorrectMove();
    }
  }
  /**
   * @description The player's move is correct :) - handle it here.
   * @memberof Game
   */
  handleCorrectMove() {
    this.selectedCards.forEach((card) => {
      card.html.classList.add('flash'); // Add the class for the animations
    });
    this.matches++; // Incremenet the match counter
    if (this.matches === this.level.pairs) {
      // If the user has found all the matches, the game is complete.
      this.gameComplete();
    }
    this.selectedCards = [];
  }
  /**
   * @description The player's move is not correct :( - handle it here
   * @memberof Game
   */
  handleIncorrectMove() {
    /*
     * Add the selected cards to a temporary array and remove them from this.selected cards so they can be animated without blocking the user from continuing.
     */
    this.tempCards.push(...this.selectedCards);
    this.selectedCards = [];
    this.incorrectMoves++;
    this.tempCards.forEach((card) => {
      card.html.classList.add('incorrect');
    });
    // Show the flipped cards for 1 second prior to flipping back
    setTimeout(() => {
      this.tempCards.forEach((card) => {
        card.html.classList.remove('incorrect');
        card.html.classList.remove('flipped');
      });
      // Empty the array
      this.tempCards = [];
    }, 1000);
  }
  /**
   * @description Increment the move counter and update the DOM to display it
   * @memberof Game
   */
  updateMoveCounter() {
    this.moves++;
    document.querySelector('#moves').innerText = this.moves;
    this.updateStarDisplay();
  }
  /**
   * @description Method for when the user has completed the game.
   * @memberof Game
   */
  gameComplete() {
    this.endTimer();
    this.calculateStars();
    this.hideStatsModal();
    this.gameCompleteModal();
  }
  /**
   * @description Calculate the number of stars based on the amount of moves
   * @memberof Game
   */
  calculateStars() {
    if (this.moves > this.level.oneStar) {
      this.displayStars(1);
    } else if (this.moves > this.level.twoStar) {
      this.displayStars(2);
    } else {
      this.displayStars(3);
    }
  }
  /**
   * @description Update the number of stars displaying to the user whilst the game is running.
   * @memberof Game
   */
  updateStarDisplay() {
    let numberOfStars;
    const starContainer = document.getElementById('star-display');
    starContainer.innerHTML = '';
    if (this.moves > this.level.oneStar) {
      numberOfStars = 1;
    } else if (this.moves > this.level.twoStar) {
      numberOfStars = 2;
    } else {
      numberOfStars = 3;
    }
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('img');
      star.classList.add('star');
      star.src = './img/star.png';
      starContainer.appendChild(star);
    }
  }
  /**
   * @description Show the modal with the game statistics
   * @memberof Game
   */
  gameCompleteModal() {
    this.showGameCompleteModal();
    document.querySelector('#number-of-moves').innerText = this.moves;
    document.querySelector('#incorrect-moves').innerText = this.incorrectMoves;
    document.querySelector(
        '#time-taken'
    ).innerText = this.timer.getTimeDifference();
    this.storeHighScore();
  }
  /**
   * @description Start the time
   * @memberof Game
   */
  startTimer() {
    this.timer.startTimer();
    this.timerInterval = setInterval(() => {
      document.querySelector('#timer').innerHTML = this.timer.getCurrentTime();
    }, 1000);
  }
  /**
   * @description End the timer
   * @memberof Game
   */
  endTimer() {
    this.timer.endTimer();
    clearInterval(this.timerInterval);
  }
  /**
   * @description If the score for this game is a high score, store it in localStorage
   * @memberof Game
   */
  storeHighScore() {
    this.storedScores = JSON.parse(localStorage.getItem('highscores')) || {
      Easy: 0,
      Medium: 0,
      Hard: 0,
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
  /**
   * @description Display the stars to the user
   * @param {number} numberOfStars
   * @memberof Game
   */
  displayStars(numberOfStars) {
    const container = document.querySelector('#stars-container');
    container.innerHTML = ''; // Clear the element
    for (let i = 0; i < numberOfStars; i++) {
      const div = document.createElement('div');
      div.classList.add('star-container');
      const star = document.createElement('img');
      star.classList.add('star');
      star.src = './img/star.png';
      div.appendChild(star);
      container.appendChild(div);
    }
  }
  /**
   * @description Show the highscores to the user
   * @memberof Game
   */
  showHighscores() {
    document.querySelector('#highscores').classList.add('active');
    document.querySelector('#easy-score').innerText = this.storedScores.Easy;
    document.querySelector(
        '#medium-score'
    ).innerText = this.storedScores.Medium;
    document.querySelector('#hard-score').innerText = this.storedScores.Hard;
  }
  /**
   * @description Show the game-complete modal
   * @memberof Game
   */
  showGameCompleteModal() {
    document.querySelector('#game-complete').style.display = 'block';
  }
  /**
   * @description Hide the game-complete modal
   * @memberof Game
   */
  hideGameCompleteModal() {
    document.querySelector('#game-complete').style.display = 'none';
    document.querySelector('#highscores').classList.remove('active');
  }
  /**
   * @description Show the game stats modal
   * @memberof Game
   */
  showStatsModal() {
    document.querySelector('#stats-container').classList.add('active');
  }
  /**
   * @description Hide the game stats modal
   * @memberof Game
   */
  hideStatsModal() {
    document.querySelector('#stats-container').classList.remove('active');
  }
}
