// Game Variables
let randomNumber, guessLimit, attempts, score = 0;
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const feedback = document.getElementById('feedback');
const hint = document.getElementById('hint');
const nextRoundButton = document.getElementById('next-round');
const playAgainButton = document.getElementById('play-again');
const scoreDisplay = document.getElementById('score-display');

// Function to generate the hint based on the number
function generateHint(number) {
    return number % 2 === 0 ? "The number is even." : "The number is odd.";
}

// Function to reset the game for a new round
function resetGame() {
    const difficulty = document.getElementById('difficulty').value;
    if (difficulty === 'easy') {
        randomNumber = Math.floor(Math.random() * 10) + 1;
        guessLimit = 2; // Reduced attempts
        hint.textContent = `Hint: The number is between 1 and 10. ${generateHint(randomNumber)}`;
    } else if (difficulty === 'medium') {
        randomNumber = Math.floor(Math.random() * 20) + 1;
        guessLimit = 2; // Reduced attempts
        hint.textContent = `Hint: The number is between 1 and 20. ${generateHint(randomNumber)}`;
    } else {
        randomNumber = Math.floor(Math.random() * 50) + 1;
        guessLimit = 1; // Reduced attempts
        hint.textContent = `Hint: The number is between 1 and 50. ${generateHint(randomNumber)}`;
    }

    attempts = 0;
    feedback.textContent = '';
    document.getElementById('guess').value = '';
    nextRoundButton.style.display = 'none'; // Hide Next button initially
    playAgainButton.style.display = 'none'; // Hide Play Again button
    document.getElementById('submit-guess').style.display = 'block'; // Show Submit button
    document.getElementById('guess').style.display = 'block'; // Show Guess input
}

// Function to start the game
function startGame() {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert('Please enter your name');
        return;
    }
    
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    resetGame();
}

// Function to display game elements
function playGame() {
    document.getElementById('difficulty-text').style.display = 'none'; // Hide Difficulty text
    document.getElementById('difficulty').style.display = 'none'; // Hide Difficulty dropdown
    document.getElementById('play-game').style.display = 'none'; // Hide Play Game button
    document.getElementById('guess-section').style.display = 'flex'; // Show Guess section
}

// Function to handle the guess submission
function submitGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    if (isNaN(guess)) {
        alert('Please enter a valid number');
        return;
    }

    attempts++;
    guessLimit--;
    if (guess === randomNumber) {
        score += 3; // Add 3 points to the score
        correctSound.play();
        feedback.textContent = `Congratulations! You guessed right in ${attempts} attempt(s)! Your score is ${score}`;
        feedback.style.color = '#32cd32'; // Lime green
        document.getElementById('submit-guess').style.display = 'none'; // Hide Submit button
        document.getElementById('guess').style.display = 'none'; // Hide Guess input
        nextRoundButton.style.display = 'block'; // Show Next button
    } else if (guessLimit <= 0) {
        feedback.textContent = `Game Over! The number was ${randomNumber}. Your score is ${score}`;
        feedback.style.color = '#ff6347'; // Tomato color
        wrongSound.play();
        document.getElementById('submit-guess').style.display = 'none'; // Hide Submit button
        document.getElementById('guess').style.display = 'none'; // Hide Guess input
        playAgainButton.style.display = 'block'; // Show Play Again button
    } else {
        feedback.textContent = `Wrong guess! You have ${guessLimit} guess(es) left. Attempts: ${attempts}`;
        feedback.style.color = '#ff6347'; // Tomato color
    }

    // Update the score display
    scoreDisplay.textContent = `Score: ${score}`;
}

// Event Listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('play-game').addEventListener('click', playGame);
document.getElementById('submit-guess').addEventListener('click', submitGuess);
document.getElementById('play-again').addEventListener('click', () => {
    document.getElementById('game').style.display = 'none';
    document.getElementById('start-section').style.display = 'block';
    score = 0; // Reset the score for the next session
    scoreDisplay.textContent = `Score: ${score}`;
});
document.getElementById('next-round').addEventListener('click', () => {
    resetGame();
});
