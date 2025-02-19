let scores = [0, 0, 0];
let currentPlayer = 0;
let playerNames = ["Player 1", "Player 2", "Player 3"];

// Start game button
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('rollDice').addEventListener('click', rollDice);

// Function to start the game
function startGame() {
    // Get player names from inputs
    const name1 = document.getElementById('player1Name').value.trim();
    const name2 = document.getElementById('player2Name').value.trim();
    const name3 = document.getElementById('player3Name').value.trim();
s
    if (!name1 || !name2 || !name3) {
        alert('Please enter names for all three players!');
        return;
    }

    // Set player names
    playerNames = [name1, name2, name3];
    scores = [0, 0, 0];
    currentPlayer = 0;

    // Update dice name displays
    document.getElementById('dice1Name').innerText = playerNames[0];
    document.getElementById('dice2Name').innerText = playerNames[1];
    document.getElementById('dice3Name').innerText = playerNames[2];

    // Display game area
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('winner').innerText = '';
    document.getElementById('rollDice').disabled = false;

    // Render initial scores
    renderScores();
    updateCurrentPlayerDisplay();
}

// Function to roll the dice
function rollDice() {
    // Roll the dice (1-6)
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Update current player's score
    scores[currentPlayer] += diceRoll;

    // Update dice image for the current player
    document.querySelectorAll('.dice-container img')[currentPlayer].src = `${diceRoll}.png`;
    renderScores();

    // Check if the current player won
    if (scores[currentPlayer] >= 50) {
        document.getElementById('winner').innerText = `🎉 ${playerNames[currentPlayer]} wins with ${scores[currentPlayer]} points! 🎉`;
        document.getElementById('rollDice').disabled = true; // Disable rolling after win
        return;
    }

    // Move to the next player
    currentPlayer = (currentPlayer + 1) % 3;
    updateCurrentPlayerDisplay();
}

// Function to render the scores
function renderScores() {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.innerHTML = '';

    scores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${playerNames[index]}: ${score} points`;
        scoreBoard.appendChild(listItem);
    });
}

// Function to update the current player display
function updateCurrentPlayerDisplay() {
    document.getElementById('currentPlayer').innerText = playerNames[currentPlayer];

    // Highlight the active player’s dice
    document.querySelectorAll('.dice-container').forEach((container, index) => {
        container.classList.toggle('active', index === currentPlayer);
    });
}
