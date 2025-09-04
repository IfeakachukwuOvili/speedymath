document.addEventListener('DOMContentLoaded', () => {
    // Delete Account button logic
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete all your saved data and reset the game? This cannot be undone!')) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    // --- GAME STATE ---
    let currentQuestion = null;
    
    // Question generator for 6th grade level
    function generateRandomQuestion() {
        const questionTypes = ['addition', 'subtraction', 'multiplication', 'division', 'square_root'];
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        switch (type) {
            case 'addition':
                return generateAddition();
            case 'subtraction':
                return generateSubtraction();
            case 'multiplication':
                return generateMultiplication();
            case 'division':
                return generateDivision();
            case 'square_root':
                return generateSquareRoot();
            default:
                return generateAddition();
        }
    }
    
    function generateAddition() {
        const a = Math.floor(Math.random() * 99) + 1; // 1-99
        const b = Math.floor(Math.random() * 99) + 1; // 1-99
        return {
            question: `${a} + ${b}`,
            answer: a + b
        };
    }
    
    function generateSubtraction() {
        const a = Math.floor(Math.random() * 100) + 10; // 10-109
        const b = Math.floor(Math.random() * (a - 1)) + 1; // 1 to (a-1), ensures positive result
        return {
            question: `${a} - ${b}`,
            answer: a - b
        };
    }
    
    function generateMultiplication() {
        const a = Math.floor(Math.random() * 12) + 1; // 1-12 (times tables)
        const b = Math.floor(Math.random() * 12) + 1; // 1-12
        return {
            question: `${a} × ${b}`,
            answer: a * b
        };
    }
    
    function generateDivision() {
        const divisor = Math.floor(Math.random() * 12) + 1; // 1-12
        const quotient = Math.floor(Math.random() * 12) + 1; // 1-12
        const dividend = divisor * quotient; // Ensures whole number result
        return {
            question: `${dividend} ÷ ${divisor}`,
            answer: quotient
        };
    }
    
    function generateSquareRoot() {
        // Perfect squares suitable for 6th grade: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144
        const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
        const square = perfectSquares[Math.floor(Math.random() * perfectSquares.length)];
        const root = Math.sqrt(square);
        return {
            question: `√${square}`,
            answer: root
        };
    }
    let correctCount = 0;
    let failedCount = 0;
    let score = 0;
    let highScore = 0;
    let timer;
    let stickmanTimer;
    let questionTimer;
    let gameTimeLeft = 60; // seconds
    let questionTimeLeft = 10; // seconds
    let username = '';
    let gameActive = false;

    // --- DOM ELEMENTS ---
    const questionElement = document.querySelector('.maze-question');
    const answerInput = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const correctAnswerElement = document.getElementById('correct-answer');
    const stickman = document.getElementById('stickman');
    const numberButtons = document.querySelectorAll('.num-button');
    const enterButton = document.getElementById('enter-button');
    const deleteButton = document.getElementById('delete-button');
    const gameOverElement = document.getElementById('game-over');
    const dingSound = document.getElementById('ding-sound');
    const buzzSound = document.getElementById('buzz-sound');
    const usernamePanel = document.getElementById('username');
    const scorePanel = document.getElementById('score');
    const highScorePanel = document.getElementById('high-score');
    const correctPanel = document.getElementById('correct');
    const failedPanel = document.getElementById('failed');
    const gameTimerPanel = document.getElementById('game-timer');
    const questionTimerPanel = document.getElementById('question-timer');

    let stickmanPos = { top: 50, left: 50 };

    // --- USERNAME & HIGHSCORE ---
    function loadUser() {
        username = localStorage.getItem('speedymath_username') || '';
        if (!username) {
            username = prompt('Enter your username:') || 'Guest';
            localStorage.setItem('speedymath_username', username);
        }
        usernamePanel.textContent = username;
        highScore = parseInt(localStorage.getItem('speedymath_highscore_' + username)) || 0;
        highScorePanel.textContent = highScore;
    }

    function saveHighScore() {
        if (score > highScore) {
            highScore = score;
            highScorePanel.textContent = highScore;
            localStorage.setItem('speedymath_highscore_' + username, highScore);
        }
    }

    // --- UI UPDATES ---
    function updateStats() {
        scorePanel.textContent = score;
        correctPanel.textContent = correctCount;
        failedPanel.textContent = failedCount;
    }
    function updateTimers() {
        gameTimerPanel.textContent = gameTimeLeft;
        questionTimerPanel.textContent = questionTimeLeft;
    }

    // --- GAME LOGIC ---
    function displayQuestion() {
        currentQuestion = generateRandomQuestion();
        questionElement.textContent = currentQuestion.question;
        answerInput.value = '';
        // Remove focus since input is readonly
        questionTimeLeft = 10;
        updateTimers();
    }

    function showFeedback(message, color) {
        feedbackElement.textContent = message;
        feedbackElement.style.color = color;
        feedbackElement.style.display = 'flex';
        setTimeout(() => {
            feedbackElement.style.display = 'none';
        }, 700);
    }
    function showCorrectAnswer(answer) {
        correctAnswerElement.textContent = `Correct Answer: ${answer}`;
        correctAnswerElement.style.display = 'flex';
        setTimeout(() => {
            correctAnswerElement.style.display = 'none';
        }, 1400);
    }

    function moveStickman() {
        // Randomly move the stickman in the maze area
        const direction = Math.random() > 0.5 ? 1 : -1;
        const axis = Math.random() > 0.5 ? 'top' : 'left';
        stickmanPos[axis] += direction * (5 + Math.random() * 5);
        stickmanPos.top = Math.min(Math.max(stickmanPos.top, 0), 95);
        stickmanPos.left = Math.min(Math.max(stickmanPos.left, 0), 95);
        stickman.style.top = `${stickmanPos.top}%`;
        stickman.style.left = `${stickmanPos.left}%`;
        if (stickmanPos.top <= 0 || stickmanPos.top >= 95 || stickmanPos.left <= 0 || stickmanPos.left >= 95) {
            endGame('Maze crash!');
        }
    }

    function endGame(msg) {
        gameActive = false;
        clearInterval(timer);
        clearInterval(stickmanTimer);
        clearTimeout(questionTimer);
        stickman.textContent = '💀';
        gameOverElement.style.display = 'flex';
        if (msg) gameOverElement.textContent = msg;
        else gameOverElement.textContent = 'Game Over';
        buzzSound.play();
        saveHighScore();
    }

    function checkAnswer(timeout = false) {
        if (!gameActive || !currentQuestion) return;
        const userAnswer = parseInt(answerInput.value);
        const correct = currentQuestion.answer;
        if (!timeout && userAnswer === correct) {
            showFeedback('✔', 'green');
            dingSound.play();
            correctCount++;
            score += 10;
            updateStats();
            displayQuestion(); // Generate new random question
            resetQuestionTimer();
        } else {
            showFeedback('✘', 'red');
            buzzSound.play();
            failedCount++;
            updateStats();
            showCorrectAnswer(correct);
            setTimeout(() => {
                displayQuestion(); // Generate new random question
                resetQuestionTimer();
            }, 1500);
        }
        answerInput.value = '';
    }

    function startGame() {
        loadUser();
        gameActive = true;
        correctCount = 0;
        failedCount = 0;
        score = 0;
        currentQuestion = null;
        gameTimeLeft = 60;
        questionTimeLeft = 10;
        updateStats();
        updateTimers();
        displayQuestion();
        stickman.textContent = '🙂';
        stickmanPos = { top: 50, left: 50 };
        stickman.style.top = '50%';
        stickman.style.left = '50%';
        gameOverElement.style.display = 'none';
        correctAnswerElement.style.display = 'none';
        feedbackElement.style.display = 'none';

        // Start the stickman movement
        stickmanTimer = setInterval(moveStickman, 500);

        // Start the game timer
        timer = setInterval(() => {
            if (!gameActive) return;
            gameTimeLeft--;
            updateTimers();
            if (gameTimeLeft <= 0) {
                endGame('Time Up!');
            }
        }, 1000);

        // Start the question timer
        resetQuestionTimer();
    }

    function resetQuestionTimer() {
        clearTimeout(questionTimer);
        questionTimeLeft = 10;
        updateTimers();
        questionTimer = setInterval(() => {
            if (!gameActive) return;
            questionTimeLeft--;
            updateTimers();
            if (questionTimeLeft <= 0) {
                clearInterval(questionTimer);
                checkAnswer(true); // Timeout
            }
        }, 1000);
    }

    // --- INPUT EVENTS ---
    // Remove keyboard events since input is readonly - only custom keyboard works
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            answerInput.value += button.textContent;
        });
    });
    enterButton.addEventListener('click', () => checkAnswer());
    deleteButton.addEventListener('click', () => {
        answerInput.value = answerInput.value.slice(0, -1);
    });

    // --- START GAME ---
    startGame();
});
