const gridContainer = document.querySelector(".grid-container");
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
const pairsNum = getParameterByName('cardPairs');

console.log(username, pairsNum)

document.getElementById('welcomeMessage').innerText = 'Welcome, ' + username + '!';
document.getElementById('cardPairsMessage').innerText = 'You have chosen ' + pairsNum + ' pairs of cards.';

  const cards = [
    {
        "image": "images/chili.png",
        "name": "chili"
    },
    {
        "image": "images/grapes.png",
        "name": "grapes"
    }
    //,
    // {
    //     "image": "images/lemon.png",
    //     "name": "lemon"
    // },
    // {
    //     "image": "images/orange.png",
    //     "name": "orange"
    // },
    // {
    //     "image": "images/pineapple.png",
    //     "name": "pineapple"
    // },
    // {
    //     "image": "images/strawberry.png",
    //     "name": "strawberry"
    // },
    // {
    //     "image": "images/tomato.png",
    //     "name": "tomato"
    // },
    // {
    //     "image": "images/watermelon.png",
    //     "name": "watermelon"
    // },
    // {
    //     "image": "images/cherries.png",
    //     "name": "cherries"
    // }
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
  for (let card of cards.concat(cards)) { // Duplicate the cards
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
  
  pairsNum -= 1;
  if (pairsNum == 0) {
    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    setTimeout(gameOver(username, score, formattedTime), 1000);
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
  updateTimer(); // Reset timer display
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
  console.log("hi")
  // Base URL of the game over page
  const baseUrl = 'gameOver.html';

  // Encode data to be included in the URL
  const encodedUsername = encodeURIComponent(username);
  const encodedScore = encodeURIComponent(score);
  const encodedTime = encodeURIComponent(time);

  // Construct the full URL with query parameters
  const fullUrl = `${baseUrl}?username=${encodedUsername}&score=${encodedScore}&time=${encodedTime}`;

  // Redirect to the game over page with user data
  window.location.href = fullUrl;


}