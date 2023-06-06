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

// Variáveis do jogo
let isJumping = false;
let isGameOver = false;
let gameLoop = null;
let pipePosition = 0;
let cloudsAnimation = null;
let pipeAnimation = null;
let score = 0;
let currentScore = 0;
let level = 1;

// Exibindo a tela inicial do jogo
startScreen.style.display = "flex";

// Função para iniciar o jogo
const startGame = () => {
  isGameOver = false;
  gameBoard.classList.remove("game-over");
  mario.style.opacity = "100";
  mario.classList.remove("game-over");
  clouds.classList.remove("game-over");
  pipe.classList.remove("game-over");
  resetPipePosition((window.innerWidth * 0.5) / 100);
  resetMarioPosition();
  resetCloudsPosition();
  startScreen.style.display = "none";
  pipe.style.animation = "pipe-animation 2s infinite linear"; // Inicia a animação do cano
  startGameLoop();
  resetScore();
  updateScoreDisplay(); // Atualiza o score exibido
};

// Evento de clique no botão de iniciar
startButton.addEventListener("click", startGame);

// Função para fazer o Mario pular
const jump = () => {
  if (isGameOver) {
    return; // Não permite o pulo se o jogo já acabou
  }
  if (!isJumping) {
    isJumping = true;
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
      isJumping = false;
    }, 500);
  }
};

// Verifica a colisão entre o Mario e o cano
const checkCollision = () => {
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  if (
    pipePosition <= (window.innerWidth * 20) / 100 &&
    pipePosition > (window.innerWidth * 8) / 100 &&
    marioPosition < (window.innerWidth * 8) / 100
  ) {
    isGameOver = true;
    stopGame();
  }
};

// Função para parar o jogo
const stopGame = () => {
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  mario.style.bottom = `${marioPosition}px`;
  mario.src = "./images/catdead.gif";
  mario.style.width = "6w";
  pipe.style.animation = "none";
  showOverScreen();
  clearInterval(gameLoop);
  isGameOver = true;
  gameBoard.classList.add("game-over");
  mario.classList.add("game-over");
  clouds.classList.add("game-over");
  pipe.classList.add("game-over");
};

// Função para reiniciar o jogo
const restartGame = () => {
  isGameOver = false;
  gameBoard.classList.remove("game-over");
  mario.classList.remove("game-over");
  clouds.classList.remove("game-over");
  pipe.classList.remove("game-over");
  resetPipePosition((window.innerWidth * 0.5) / 100);
  resetMarioPosition();
  resetCloudsPosition();
  overScreen.style.display = "none";
  pipe.style.animation = "pipe-animation 2s infinite linear"; // Reinicia a animação do cano
  startGameLoop();
  resetScore();
};

// Exibe a tela de fim de jogo
const showOverScreen = () => {
  overScreen.style.display = "flex";
  restartButton.addEventListener("click", restartGame);
};

// Reposiciona as nuvens no início do jogo
const resetCloudsPosition = () => {
  clearInterval(cloudsAnimation);
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
const resetPipePosition = (pipeSpeed) => {
  clearInterval(pipeAnimation);
  pipe.style.left = "100vw";
  pipePosition = gameBoard.offsetWidth;

  pipeAnimation = setInterval(() => {
    if (isGameOver) {
      pipePosition -= 0;
    } else {
      pipePosition -= pipeSpeed;
      pipeSpeed *= 1.001; // Aumenta a velocidade gradualmente
    }
    if (pipePosition <= -pipe.offsetWidth) {
      pipePosition = gameBoard.offsetWidth;
      pipeSpeed = (window.innerWidth * 0.5) / 100 * level; // Ajusta a velocidade com base no nível
    }
    pipe.style.left = `${pipePosition}px`;
  }, 10);
};

// Reposiciona o Mario no início do jogo
const resetMarioPosition = () => {
  mario.src = "./images/binladen8fps.gif";
  mario.style.width = "12vw";
  mario.style.marginLeft = "12vw";
  mario.style.bottom = "0";
};

// Inicia o loop do jogo
const startGameLoop = () => {
  gameLoop = setInterval(() => {
    if (!isGameOver) {
      gameBoard.addEventListener("click", jump);
      checkCollision();
      pipePosition = pipe.offsetLeft;
      countScore();
      updateScoreDisplay();
      updateCurrentScoreDisplay(); // Atualiza o score exibido
    }
  }, 10);
};

// Incrementa o score quando o cano passa pelo Mario
const countScore = () => {
  if (
    pipePosition <= (window.innerWidth * 4) / 100 &&
    pipePosition > (window.innerWidth * 3) / 100
  ) {
    currentScore += 1; // Incrementa a pontuação
  }
  if (currentScore > score) {
    score = currentScore;
    if (score % 10 === 0) { // Aumenta o nível a cada múltiplo de 10
      level++;
      const newPipeSpeed = (window.innerWidth * 0.5) / 100 * level; // Aumenta a velocidade proporcionalmente ao nível
      resetPipePosition(newPipeSpeed);
    }
  }
};

// Reseta o score
const resetScore = () => {
  currentScore = 0;
  level = 1;
};

// Atualiza o display do score
const updateScoreDisplay = () => {
  scoreDisplay.textContent = `${score}`;
};

// Atualiza o display do score atual
const updateCurrentScoreDisplay = () => {
  currentScoreDisplay.textContent = `${currentScore}`;
  document.querySelector(".top-score").innerHTML = `${currentScore}`; 
};

// Evento de tecla pressionada (para desktop)
document.addEventListener("keydown", (event) => {
  if (isGameOver != true) {
    jump();
  }
});
