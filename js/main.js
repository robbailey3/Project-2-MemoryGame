// * Wrap everything in document event listener so nothing runs before it should. 
document.addEventListener('DOMContentLoaded', () => {
    // * Define some functions
    const shuffle = (arr) => {
        let m = arr.length,
            i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    };
    // * Step 1: Define all of the variables
    const timer = new Timer();
    const newGame = document.querySelector('.game-options');
    const GAME_HOST = '#game-grid';
    // * Step 2: Let the user click a button to start the game
    newGame.addEventListener('click', ($event) => {
        newGame.classList.add('hidden');
        // TODO: Perhaps switch would be better here.
        if ($event.target.id === 'easy-start') {
            let game = new Game(GAME_HOST, 1);
        }
        if ($event.target.id === 'normal-start') {
            let game = new Game(GAME_HOST, 2);
        }
        if ($event.target.id === 'hard-start') {
            let game = new Game(GAME_HOST, 3);
        }
    });



});