const symbols = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'];
let shuffled = symbols.sort(() => 0.5 - Math.random());

const board = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.innerHTML = '?';
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

  this.classList.add('flip');
  this.innerHTML = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedPairs++;
      resetTurn();

      if (matchedPairs === symbols.length / 2) {
        setTimeout(() => alert("🎉 You won!"), 300);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.innerHTML = '?';
        secondCard.innerHTML = '?';
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function initGame() {
  board.innerHTML = '';
  shuffled = symbols.sort(() => 0.5 - Math.random());
  matchedPairs = 0;

  shuffled.forEach(symbol => {
    const card = createCard(symbol);
    board.appendChild(card);
  });
}

document.getElementById('restart').addEventListener('click', initGame);

initGame();
