// Selecionando os elementos do jogo
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const restartButton = document.querySelector(".restart-button");
const overScreen = document.querySelector(".game-over-screen");
const gameBoard = document.querySelector(".game-board");
const startScreen = document.querySelector(".game-start-screen");
const startButton = document.querySelector(".start-button");
const scoreDisplay = document.querySelector(".score");
const currentScoreDisplay = document.querySelector(".current-score");
const topScoreDisplay = document.querySelector(".top-score");
const miado = document.getElementById("miado");
const scoreAudio = document.getElementById("score");

// Variáveis do jogo
let isJumping = false;
let isGameStart = false;
let isGameOver = false;
let gameLoop = null;
let pipePosition = 0;
let cloudsAnimation = null;
let pipeAnimation = null;
let score = 0;
let currentScore = 0;
let pipeSpeed = (window.innerWidth * 0.7) / 100;

// Exibindo a tela inicial do jogo
startScreen.style.display = "flex";

// Função para iniciar o jogo
const startGame = () => {
  isGameStart = true;
  resetPipe();
  resetMario();
  resetClouds();
  resetScore();
  startScreen.style.display = "none";
  startGameLoop();
};

// Evento de clique no botão de iniciar
startButton.addEventListener("click", startGame);

// Função para fazer o Mario pular
const jump = () => {
  if (!isGameOver && !isJumping) {
    isJumping = true;
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
      isJumping = false;
    }, 700);
  }
};

// Inicia o loop do jogo
const startGameLoop = () => {
  gameLoop = setInterval(() => {
    if (!isGameOver) {
      checkCollision();
      gameBoard.addEventListener("touchstart", jump);
      incrementCurrentScore();
      checkScore();
      updateCurrentScoreDisplay(); // Atualiza o score exibido
    }
  }, 10);
};

// Verifica a colisão entre o Mario e o cano
const checkCollision = () => {
  const pipeHeight = pipe.clientHeight;
  const pipeWidht = +window.getComputedStyle(pipe).width.replace("px", "");
  const collisionPosition = mario.clientLeft + mario.width + pipe.width;
  const marioPositionHeight = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  if (
    pipePosition <= collisionPosition &&
    pipePosition > pipeWidht &&
    marioPositionHeight < pipeHeight
  ) {
    stopGame();

    miado.play();
  }
};

// Função para parar o jogo
const stopGame = () => {
  isGameOver = true;
  mario.src = "/assets/images/game-over.png";
  mario.style.bottom = `${+window
    .getComputedStyle(mario)
    .bottom.replace("px", "")}px`;
  pipe.style.animation = "none";
  topScoreDisplay.classList.add("top-score-game-over");
  gameBoard.classList.add("game-over");
  mario.classList.add("game-over");
  clouds.classList.add("game-over");
  pipe.classList.add("game-over");
  updateScore();
  showOverScreen();
  clearInterval(gameLoop);
};

// Função para reiniciar o jogo
const restartGame = () => {
  resetGame();
  resetPipe();
  resetMario();
  resetClouds();
  resetOverScreen();
  resetScore();
  startGameLoop();
};

// Exibe a tela de fim de jogo
const showOverScreen = () => {
  overScreen.style.display = "flex";
  restartButton.addEventListener("click", restartGame);
};

const resetGame = () => {
  isGameOver = false;
  gameBoard.classList.remove("game-over");
  topScoreDisplay.classList.remove("top-score-game-over");
};

const resetOverScreen = () => {
  overScreen.style.display = "none";
};

// Reposiciona as nuvens no início do jogo
const resetClouds = () => {
  clearInterval(cloudsAnimation);
  clouds.classList.remove("game-over");
  clouds.style.left = "100%";
  cloudsPosition = gameBoard.offsetWidth;
  cloudsAnimation = setInterval(() => {
    if (isGameOver) {
      cloudsPosition -= 0;
    } else {
      cloudsPosition -= 2;
    }
    if (cloudsPosition <= -clouds.offsetWidth) {
      cloudsPosition = gameBoard.offsetWidth;
    }
    clouds.style.left = `${cloudsPosition}px`;
  }, 10);
};

// Reposiciona o cano no início do jogo
const resetPipe = () => {
  clearInterval(pipeAnimation);
  pipe.classList.remove("game-over");
  pipe.style.animation = "pipe-animation 2s infinite linear";
  pipe.style.left = "100vw";
  pipe.style.height = "8vw";
  pipe.style.width = "6vw";
  pipePosition = gameBoard.offsetWidth;

  pipeAnimation = setInterval(() => {
    if (isGameOver) {
      pipePosition -= 0;
    } else {
      pipePosition -= pipeSpeed;
    }
    if (pipePosition <= -pipe.offsetWidth) {
      pipePosition = gameBoard.offsetWidth;
    }
    pipe.style.left = `${pipePosition}px`;
  }, 10);
};

// Reposiciona o Mario no início do jogo
const resetMario = () => {
  mario.src = "/assets/images/mario.webp";
  mario.style.width = "12vw";
  mario.style.left = "12vw";
  mario.style.bottom = "0";
  mario.classList.remove("game-over");
};

// Incrementa o score quando o cano passa pelo Mario
const checkScore = () => {
  updateScore();
  if (currentScore >= 0 && currentScore <= 1000) {
    pipeSpeed = (window.innerWidth * 0.6) / 100;
    if (currentScore == 1000) {
      scoreAudio.play();
    }
  } else if (currentScore > 1000 && currentScore <= 2000) {
    pipeSpeed = (window.innerWidth * 0.9) / 100;
    if (currentScore == 2000) {
      scoreAudio.play();
    }
  } else if (currentScore > 2000 && currentScore <= 5000) {
    pipe.style.height = "12vw";
    pipe.style.width = "8vw";
    if (currentScore == 5000) {
      scoreAudio.play();
    }
  } else if (currentScore > 5000 && currentScore <= 10000) {
    pipeSpeed = (window.innerWidth * 1.2) / 100;
    if (currentScore == 10000) {
      scoreAudio.play();
    }
  } else if (currentScore > 10000 && currentScore <= 100000) {
    pipeSpeed = (window.innerWidth * 1.5) / 100;
    if (currentScore == 100000) {
      scoreAudio.play();
    }
  } else if (currentScore > 100000 && currentScore <= 1000000) {
    pipeSpeed = (window.innerWidth * 1.8) / 100;
    if (currentScore == 1000000) {
      scoreAudio.play();
    }
  } else if (currentScore > 1000000) {
    pipeSpeed = (window.innerWidth * 2.1) / 100;
    if (currentScore == 1000000) {
      scoreAudio.play();
    }
  }
};

updateScore = () => {
  if (currentScore > score) {
    score = currentScore;
  }
  scoreDisplay.textContent = `${score}`;
};

incrementCurrentScore = () => {
  currentScore++;
};
// Reseta o score
const resetScore = () => {
  currentScore = 0;
};

// Atualiza o display do score atual
const updateCurrentScoreDisplay = () => {
  topScoreDisplay.textContent = `${currentScore}`;
  currentScoreDisplay.textContent = `${currentScore}`;
};

// Evento de tecla pressionada (para desktop)
document.addEventListener("keydown", (event) => {
  if (isGameOver) {
    restartGame();
  } else if (isGameStart == true) {
    jump();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && isGameStart == false) {
    startGame();
  }
});
