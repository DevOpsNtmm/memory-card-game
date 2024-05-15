const gridContainer = document.querySelector(".grid-container");
const duplicatedCards = [];
// cards
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
// Timer
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Get the username, cardPairs value from the URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const username = getParameterByName('username');
const cardPairs = getParameterByName('cardPairs');
let numCards = (cardPairs)

document.getElementById('welcomeMessage').innerText = 'Welcome, ' + username + '!';
document.getElementById('cardPairsMessage').innerText = 'You have chosen ' + cardPairs;

const cards = [
  {
      "image": "images/dog-1.png",
      "name": "dog-1"
  },
  {
      "image": "images/dog-2.png",
      "name": "dog-2"
  }
  ,
  {
      "image": "images/dog-3.png",
      "name": "dog-3"
  },
  {
      "image": "images/dog-4.png",
      "name": "dog-4"
  },
  {
      "image": "images/dog-5.png",
      "name": "dog-5"
  },
  {
      "image": "images/dog-6.png",
      "name": "dog-6"
  },
  {
      "image": "images/dog-7.png",
      "name": "dog-7"
  },
  {
      "image": "images/dog-8.png",
      "name": "dog-8"
  },
  {
      "image": "images/dog-9.png",
      "name": "dog-9"
  },
  {
      "image": "images/dog-10.png",
      "name": "dog-10"
  },
  {
      "image": "images/dog-11.png",
      "name": "dog-11"
  },
  {
      "image": "images/dog-12.png",
      "name": "dog-12"
  },
  {
      "image": "images/dog-13.png",
      "name": "dog-13"
  },
  {
      "image": "images/dog-14.png",
      "name": "dog-14"
  },
  {
      "image": "images/dog-15.png",
      "name": "dog-15"
  },
  {
      "image": "images/dog-16.png",
      "name": "dog-16"
  },
  {
      "image": "images/dog-17.png",
      "name": "dog-17"
  },
  {
      "image": "images/dog-18.png",
      "name": "dog-18"
  },
  {
      "image": "images/dog-19.png",
      "name": "dog-19"
  },
  {
      "image": "images/dog-20.gif",
      "name": "dog-20"
  },
  {
      "image": "images/dog-21.png",
      "name": "dog-21"
  },
  {
      "image": "images/dog-22.png",
      "name": "dog-22"
  },
  {
      "image": "images/dog-23.png",
      "name": "dog-23"
  },
  {
      "image": "images/dog-24.png",
      "name": "dog-24"
  },
  {
      "image": "images/dog-25.png",
      "name": "dog-25"
  },
  {
      "image": "images/dog-26.png",
      "name": "dog-26"
  },
  {
      "image": "images/dog-27.png",
      "name": "dog-27"
  },
  {
      "image": "images/dog-28.png",
      "name": "dog-28"
  },
  {
      "image": "images/dog-29.png",
      "name": "dog-29"
  },
  {
      "image": "images/dog-30.png",
      "name": "dog-30"
  }
];

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let i = 0; i < cardPairs; i++) {
    duplicatedCards.push(cards[i])
    duplicatedCards.push(cards[i])
  }
  for (let card of duplicatedCards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  
  numCards--;
  if (numCards == 0) {
    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    setTimeout(gameOver(username, score, formattedTime), 2000);
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
  stopTimer();
  startTimer();
}
 // Timer functions
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimer();
}

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
  }
  const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("timer").innerText = formattedTime;
}

function pad(num) {
    return (num < 10) ? ("0" + num) : num;
}

function gameOver(username, score, time){
  const baseUrl = 'gameOver.html';

  const encodedUsername = encodeURIComponent(username);
  const encodedScore = encodeURIComponent(score);
  const encodedTime = encodeURIComponent(time);
  const encodedcardPairs = encodeURIComponent(cardPairs);

  // const fullUrl = `${baseUrl}?username=${encodedUsername}&score=${encodedScore}&time=${encodedTime}`;
  const fullUrl = `${baseUrl}?username=${encodedUsername}&score=${encodedScore}&time=${encodedTime}&cardPairs=${encodedcardPairs}`;
  window.location.href = fullUrl;
}