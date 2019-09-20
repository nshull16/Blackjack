//
// Blackjack
// by Nathan Shull
//

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
let gameStarted = false, gameOver = false, playerWon = false, dealerDeck = [], playerDeck = [], dealerScore = 0, playerScore = 0, deck = [];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerDeck = [getNextCard(), getNextCard()];
  playerDeck = [getNextCard(), getNextCard()];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function(){
  playerDeck.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck(){
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++){
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++){
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
    
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i = 0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value ==='Ace'){
      hasAce = true;
    }
  }
  if(hasAce && score + 10 <= 21){
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerDeck);
  playerScore = getScore(playerDeck);
}

function checkForEndOfGame(){
  updateScores();
  
  if(gameOver) {
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
      dealerDeck.push(getNextCard());
      updateScores();
    }
  }
  
  if(playerScore > 21){
    playerWon = false;
    gameOver = true;
  }
  else if(dealerScore > 21){
    playerWon = true;
    gameOver = true;
  }
  else if(gameOver){
    if(playerScore > dealerScore){
      playerWon = true;
    }
    else{
      playerWon = false;
    }

  }
}

function showStatus() {
  if(!gameStarted){
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }
  
  let dealerDeckString = '';
  for(let i = 0; i < dealerDeck.length; i++){
    dealerDeckString += getCardString(dealerDeck[i]) + '\n';
  }
  
  let playerDeckString = '';
  for(let i = 0; i < playerDeck.length; i++) {
    playerDeckString += getCardString(playerDeck[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText = 'Dealer has:\n' + dealerDeckString + '(score: ' + dealerScore + ')\n\n' +
  'Player has:\n' + playerDeckString + '(score: ' + playerScore + ')\n\n';
  
  if(gameOver){
    if(playerWon){
      textArea.innerText += "YOU WIN!";
    }
    else{
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }
}

function shuffleDeck(deck) {
  for(let i = 0; i < deck.length; i++){
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getNextCard(){
  return deck.shift();
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

for(var i = 0; i < deck.length; i++) {
  textArea.innerText += '\n' + getCardString(deck[i]);
}


