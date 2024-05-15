function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const username = getQueryParam('username');
const score = getQueryParam('score');
const time = getQueryParam('time');
const cardPairs = getQueryParam('cardPairs');

// Display the data on the page
document.getElementById('userInfo').innerHTML = `Username: ${username} <br><br> Score: ${score} <br><br>Time: ${time}`;

function restart() {
  const url = "game.html?username=" + username + "&cardPairs=" + cardPairs;
  window.location.href = url
}