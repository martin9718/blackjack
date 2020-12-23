/*
 *2C = Two of Clubs
 *2D = Two of Daimonds
 *2H = Two of Hearts
 *2S = Two of Spedes
 */

const myModule = (() => {
    'use strict'


    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let pointsPlayers = [];

    //HTML References
    const btnRequest = document.querySelector('#btnRequest'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew');

    const divPLayersCards = document.querySelectorAll('.divCards'),
        scoresHTML = document.querySelectorAll('small');


    //This function initilizes the game
    const initializeGame = (numberPlayers = 2) => {
        divPLayersCards[0].classList.add('min-height');
        deck = createDeck();
        pointsPlayers = [];
        for (let i = 0; i < numberPlayers; i++) {
            pointsPlayers.push(0);
        }

        scoresHTML.forEach(element => element.innerHTML = 0);
        divPLayersCards.forEach(element => element.innerHTML = '');

        btnRequest.disabled = false;
        btnStop.disabled = false;
    }

    //This function returns a shuffled deck
    const createDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {

            for (let type of types) {
                deck.push(i + type);
            }

        }

        for (let type of types) {
            for (let spe of specials) {
                deck.push(spe + type);
            }
        }

        //shuffle is an underline method that returns a randomly ordered array
        return _.shuffle(deck);
    }



    // This function allows me to take a card
    const requestCard = () => {
        if (deck.length === 0) throw 'There aren\'t cards in the deck';
        return deck.pop();
    }

    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10 :
            value * 1;
    }

    //Turn 0 = first player and last is the computer
    const accumulatePoints = (card, turn) => {

        pointsPlayers[turn] += valueCard(card);
        scoresHTML[turn].innerText = pointsPlayers[turn];
        return pointsPlayers[turn];
    }

    const createCardHTML = (card, turn) => {
        divPLayersCards[turn].classList.remove('min-height');
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ card }.png`;
        
        imgCard.classList.add('cardDeck', 'img-fluid', 'col-3', 'col-sm-3', 'col-md-2', 'col-lg-2');
        divPLayersCards[turn].append(imgCard);
    }

    const decideWinner = () => {

        const [minimumPoints, pointsComputer] = pointsPlayers;

        
           setTimeout(() => {
                if (pointsComputer === minimumPoints) {
                    alert('Nobody wins :(');
                } else if (minimumPoints > 21) {
                    alert('Computer wins');
                } else if (pointsComputer > 21) {
                    alert('Player wins');
                } else {
                    alert('Computer wins');
                }
            },500);
 
    }

    //Turn computer
    const computerTurn = (minimumPoints) => {

        let pointsComputer = 0;

        do {

            const card = requestCard();
            pointsComputer = accumulatePoints(card, pointsPlayers.length - 1);
            createCardHTML(card, pointsPlayers.length - 1);

        } while ((pointsComputer < minimumPoints) && minimumPoints <= 21);
      

        decideWinner();       
    }


    //Events
    btnRequest.addEventListener('click', () => {

        const card = requestCard();
        const pointsPlayer = accumulatePoints(card, 0);
        createCardHTML(card, 0);

        if (pointsPlayer > 21) {
            console.warn('Sorry you lost');
            btnRequest.disabled = true;
            btnStop.disabled = true;
            computerTurn(pointsPlayer);
        } else if (pointsPlayer === 21) {
            console.warn('21, Great!');
            btnRequest.disabled = true;
            btnStop.disabled = true;
            computerTurn(pointsPlayer);
        }

    });

    btnStop.addEventListener('click', () => {
        btnRequest.disabled = true;
        btnStop.disabled = true;
        computerTurn(pointsPlayers[0]);
    });

    btnNew.addEventListener('click', () => {
        initializeGame();
    });

    return {
        newGame: initializeGame
    };

})();