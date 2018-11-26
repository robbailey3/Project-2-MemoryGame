(function() {
  const GAME_HOST = '#game-grid'; // The selector of the HTML element which will contain the game content
  const GAME_HOST_ELEMENT = document.querySelector(GAME_HOST);
  const game = new Game();
  const clickHandler = $event => {
    game.handleClick($event);
  };
  const hideModal = () => {
    document.querySelector('.game-options').style.display = 'none';
    document.querySelector('#main-content').classList.remove('blurred');
  };
  const showModal = () => {
    document.querySelector('.game-options').style.display = 'block'; 
    document.querySelector('#main-content').classList.add('blurred');
  }
  document.querySelector('#easy-start').addEventListener('click', () => {
    hideModal();
    game.init(GAME_HOST, levels.easy);
  });
  document.querySelector('#normal-start').addEventListener('click', () => {
    hideModal();
    game.init(GAME_HOST, levels.medium);
  });
  document.querySelector('#hard-start').addEventListener('click', () => {
    hideModal();
    game.init(GAME_HOST, levels.hard);
  });
  document.querySelector('#reset-game').addEventListener('click', () => {
    game.endGame();
    showModal();
  })
})();
