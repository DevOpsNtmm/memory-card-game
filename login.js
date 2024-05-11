function validateForm() {
    var username = document.forms["loginForm"]["username"].value;
    var cardPairs = document.forms["loginForm"]["cardPairs"].value;

    if (username == "") {
        alert("Please enter your name");
        return false;
    }

    if (typeof username !== 'string') {
        alert('Username should be a string');
        return false;
    }

    if (isNaN(cardPairs) || cardPairs < 1 || cardPairs > 30) {
        alert("Please enter a valid number of card pairs between 1 and 30");
        return false;
    }

    window.location = "game.html?username=" + encodeURIComponent(username) + "&cardPairs=" + encodeURIComponent(cardPairs);
    return false;
}