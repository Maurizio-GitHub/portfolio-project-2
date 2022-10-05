// Constants declaration for DOM elements and player choices:

const moves = document.getElementsByClassName('moves');
const playerScore = document.getElementById('player-score');
const playerImage = document.getElementById('player-image');
const computerScore = document.getElementById('computer-score');
const computerImage = document.getElementById('computer-image');
const result = document.getElementById('result');
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

// Event listener for buttons representing a player move:

for (const move of moves) {
    move.addEventListener('click', function () {
        const playerChoice = this.getAttribute('data-choice');
        runGame(playerChoice);
    });
}
