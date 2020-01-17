class MatchingGame {
    constructor(cards) {
    this.cardsArray = cards;
    this.busy = false;
    this.score = document.querySelector('#score');
    this.highScore = document.querySelector('#highScore');
    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    hideCards() {
        for(card of this.cardsArray) {
            card.classList.remove('visible');
            card.classList.remove('matched');
        }
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.scoreTotal++;
            this.score.innerText = this.scoreTotal;
            card.classList.add('visible');

            if(this.cardToCheck) {
                //second card flip
                //check for match
                this.checkForCardMatch(card);
            } else {
                //first card flip
                this.cardToCheck = card;
            }
        }
    }

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }

        this.cardToCheck = null;
    }

    getCardType(card) {
        return card.querySelector('.card-value').src;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length) {
            //you win
            this.victory();
            let restart = document.querySelector('.start');
            restart.innerText = "Restart?"
        }
    }

    cardMisMatch(card1, card2) {
        //this.busy = true;
        setTimeout(function () {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    canFlipCard(card){ 
        //3 cases to prevent
        //console.log("busy - " + this.busy);
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }

    victory () {
        if(this.highScore.innerText == 0) {
            this.highScore.innerText = this.score.innerText;
        } else if(this.highScore.innerText > this.score.innerText) {
            this.highScore.innerText = this.score.innerText;
        }
    }

    startGame() {
        //this.busy = true;
        this.cardToCheck = null;
        this.scoreTotal = 0;
        this.matchedCards = [];
        this.shuffleCards();
        setTimeout(function () {
            this.busy = false;
        }, 500);
        this.hideCards();
        this.score.innerText = 0;
    }

}

document.addEventListener('DOMContentLoaded', function() {
    const start = document.querySelector(".start");
    const cards = document.querySelectorAll(".card");
    const cardList = document.querySelector('.game-container');
    let game = new MatchingGame(cards);

    //
    start.addEventListener('click', function (e) {
        for(card of cards) {
            card.classList.remove('visible');
            game.startGame();
        }

    });

    cardList.addEventListener('click', function(e) {
        if(e.target.tagName === 'IMG') {
            const flipCard = e.target.parentElement.parentElement;
            game.flipCard(flipCard);
        }
    })

});