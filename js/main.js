(function() {
  const GAME_HOST = '#game-grid'; // The selector of the HTML element which will contain the game content
  const GAME = new Game();
  const hideModal = () => {
    document.querySelector('#game-options').style.display = 'none';
    document.querySelector('#main-content').classList.remove('blurred');
  };
  const showModal = () => {
    document.querySelector('#game-options').style.display = 'block';
    document.querySelector('#main-content').classList.add('blurred');
  };
  document.body.addEventListener('click', ($event) => {
    switch ($event.target.id) {
      case 'easy-start':
        hideModal();
        GAME.init(GAME_HOST, levels.easy);
        break;
      case 'normal-start':
        hideModal();
        GAME.init(GAME_HOST, levels.medium);
        break;
      case 'hard-start':
        hideModal();
        GAME.init(GAME_HOST, levels.hard);
        break;
      case 'reset-game':
        GAME.endGame();
        showModal();
        break;
      case 'stats-reset':
        GAME.hideGameCompleteModal();
        showModal();
        break;
      case 'view-highscores':
        GAME.showHighscores();
        break;
    }
  });
})();
