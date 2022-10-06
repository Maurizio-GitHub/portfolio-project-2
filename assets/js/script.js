// Constants declaration for DOM elements and player choices:

const moves = document.getElementsByClassName('moves');
const playerScore = document.getElementById('player-score');
const playerImage = document.getElementById('player-image');
const computerScore = document.getElementById('computer-score');
const computerImage = document.getElementById('computer-image');
const result = document.getElementById('result');
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

// Event listener for buttons representing a player move; runGame function is called after user choice:

for (const move of moves) {
    move.addEventListener('click', function () {
        const playerChoice = this.getAttribute('data-choice');
        runGame(playerChoice);
    });
}

/**
 * Game function: it accepts a single parameter, which is the data-choice value of the clicked button.
 * After determining computer choice, it calls checkWinner and gameManager functions.
 */
function runGame(playerChoice) {

    playerImage.src = `assets/images/${choices[playerChoice]}.webp`;
    playerImage.alt = choices[playerChoice];

    const computerChoice = Math.floor(Math.random() * 3);

    computerImage.src = `assets/images/${choices[computerChoice]}.webp`;
    computerImage.alt = choices[computerChoice];

    result.innerText = checkWinner(playerImage.alt, computerImage.alt);

    gameManager(result.innerText);
}

/**
 * Check function: it accepts 2 strings as parameters to check who the winner is.
 */
function checkWinner(playerImageAlt, computerImageAlt) {
    switch (playerImageAlt + ' vs ' + computerImageAlt) {
        case 'rock vs scissors':
        case 'rock vs lizard':
        case 'paper vs rock':
        case 'paper vs spock':
        case 'scissors vs paper':
        case 'scissors vs lizard':
        case 'lizard vs paper':
        case 'lizard vs spock':
        case 'spock vs scissors':
        case 'spock vs rock':
            return 'You Won!'
        case 'scissors vs rock':
        case 'lizard vs rock':
        case 'rock vs paper':
        case 'spock vs paper':
        case 'paper vs scissors':
        case 'lizard vs scissors':
        case 'paper vs lizard':
        case 'spock vs lizard':
        case 'scissors vs spock':
        case 'rock vs spock':
            return 'Computer Won!'
        case 'rock vs scissors':
        case 'rock vs lizard':
        case 'paper vs rock':
        case 'paper vs spock':
        case 'scissors vs paper':
        case 'scissors vs lizard':
        case 'lizard vs paper':
        case 'lizard vs spock':
        case 'spock vs scissors':
        case 'spock vs rock':
            return 'Draw!'
    }
}
