class Game {
    constructor(selector, level) {
        this.host = document.querySelector(selector);
        this.host.addEventListener('click', ($event) => {
            this.handleClick($event);
        });
        this.level = level;
        this.cardTypes = [{
                name: '1',
                img: ''
            },
            {
                name: '2',
                img: ''
            },
            {
                name: '3',
                img: ''
            },
            {
                name: '4',
                img: ''
            },
            {
                name: '5',
                img: ''
            },
            {
                name: '6',
                img: ''
            },
            {
                name: '7',
                img: ''
            }, {
                name: '8',
                img: ''
            }
        ];
        this.start();
    }
    start() {
        this.clearExistingHTML();
        this.generateDeck();
    }
    clearExistingHTML() {
        this.host.innerHTML = '';
    }
    generateDeck() {
        switch (this.level) {
            case 1:
                this.deck = this.cardTypes.slice(0, 2).concat(this.cardTypes.slice(0, 2));
                break;
            case 2:
                this.deck = this.cardTypes.concat(this.cardTypes);
                break;
            case 3:
                this.deck = this.cardTypes.concat(this.cardTypes, this.cardTypes, this.cardTypes);
                break;
            default:
                console.log("Unknown level"); // This shouldn't happen. 
                break;
        }
        this.shuffle();
        console.log(this);
    }
    handleClick(event) {

    }
    shuffle() {
        let m = this.deck.length,
            i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
        }
        return this.deck;
    }
}