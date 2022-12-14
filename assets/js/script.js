// Constants declaration for DOM elements and player choices:

const moves = document.getElementsByClassName('moves');
const playerScore = document.getElementById('player-score');
const playerImage = document.getElementById('player-image');
const computerScore = document.getElementById('computer-score');
const computerImage = document.getElementById('computer-image');
const message = document.getElementById('display-message');
const countdown = document.getElementById('countdown');
const draw = document.getElementById('draw-event');
const result = document.getElementById('result');
const reloadButton = document.getElementById('reload');
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const outcomes = ['You Won!', 'Computer Won!', 'Draw!'];

// Event listener for buttons representing a player move; runGame function is called:

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

    const computerChoice = Math.floor(Math.random() * 5);

    computerImage.src = `assets/images/${choices[computerChoice]}.webp`;
    computerImage.alt = choices[computerChoice];

    result.innerText = checkWinner(playerImage.alt, computerImage.alt);

    gameManager(result.innerText);
}

/**
 * Check function: it accepts 2 strings as parameters to check who the winner is.
 *
 * Since no data structures have been used, possible choices combinations have been explicitly written down as strings for the sake of readability.
 * An opposite decision was made for 'outcomes', as they are also needed within the gameManager() function.
 * So, to facilitate code maintenance, non-centralized hardcoding of pieces of code used in different places has been willingly avoided.
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
            return outcomes[0];
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
            return outcomes[1];
        case 'rock vs rock':
        case 'paper vs paper':
        case 'scissors vs scissors':
        case 'lizard vs lizard':
        case 'spock vs spock':
            return outcomes[2];
    }
}

/**
 * Manager function: it accepts a string as a parameter to appropriately modify the page after each result.
 *
 * To keep the code concisely cleaner, 'Postfix Decrement/Increment Operator' coercive behavior (string to number) has been leveraged.
 * Likewise, 'Greater Than Operator' implicit coercion (string to number) has been exploited.
 */
function gameManager(resultInnerText) {
    // Counter management logic, necessary to handle an extended tie-break phase without having a countdown going below zero (see Game Over logic):
    if (countdown.innerText > 0) {
        countdown.innerText > 1 ? countdown.innerText-- : (countdown.innerText--, draw.style.display = 'inline');
    }

    // Scores updates logic, acting on the relevant section and based on checkWinner() possible outcomes:
    if (resultInnerText === outcomes[0]) {
        playerScore.innerText++;
    } else if (resultInnerText === outcomes[1]) {
        computerScore.innerText++;
    }

    // Game Over logic, based on the simple, yet dynamic, rule of winning 5 out of (maximum) 9 times:
    if (Math.abs(playerScore.innerText - computerScore.innerText) > countdown.innerText) {
        if (playerScore.innerText > computerScore.innerText) {
            message.firstElementChild.innerText = 'Game Over';
            result.innerText = 'You Won The Match!';
            for (const move of moves) {move.style.display = "none";}
            reloadButton.style.display = 'block';
        } else {
            message.firstElementChild.innerText = 'Game Over';
            result.innerText = 'You Lost The Match!';
            for (const move of moves) {move.style.display = "none";}
            reloadButton.style.display = 'block';
        }
    }

    // Play-again logic, simply based on a page refresh and upon button availability after game over condition is met:
    reloadButton.addEventListener('click', function () {
        window.location.reload();
    });
}