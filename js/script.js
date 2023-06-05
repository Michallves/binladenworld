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

let isJumping = false;
let isGameOver = false;
let gameLoop = null;
let pipePosition = 0;
let cloudsAnimation = null;
let pipeAnimation = null;
let score = 0;
let currentScore = 0;
startScreen.style.display = "flex";

const startGame = () => {
  isGameOver = false;
  gameBoard.classList.remove("game-over");
  mario.style.opacity = "100";
  mario.classList.remove("game-over");
  clouds.classList.remove("game-over");
  pipe.classList.remove("game-over");
  resetPipePosition();
  resetMarioPosition();
  resetCloudsPosition();
  startScreen.style.display = "none";
  pipe.style.animation = "pipe-animation 2s infinite linear"; // Reinicia a animação do cano
  startGameLoop();
  score = 0; // Reseta o score
  updateScoreDisplay(); // Atualiza o score exibido
};

startButton.addEventListener("click", startGame);

const jump = (event) => {
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

const checkCollision = () => {
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  if (pipePosition <= (window.innerWidth * 20) / 100 && pipePosition > (window.innerWidth * 8) / 100 && marioPosition < (window.innerWidth * 8) / 100) {
    isGameOver = true;
    stopGame();
  }
};

const stopGame = () => {
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  mario.style.bottom = `${marioPosition}px`;
  isGameOver = true;
  gameBoard.classList.add("game-over");
  mario.classList.add("game-over");
  clouds.classList.add("game-over");
  pipe.classList.add("game-over");
  clearInterval(gameLoop);
  mario.src = "./images/game-over.png";
  mario.style.width = "6vw";
  pipe.style.animation = "none"; // Pausa a animação do cano
  showOverScreen();
};

const restartGame = () => {
  isGameOver = false;
  gameBoard.classList.remove("game-over");
  mario.classList.remove("game-over");
  clouds.classList.remove("game-over");
  pipe.classList.remove("game-over");
  resetPipePosition();
  resetMarioPosition();
  resetCloudsPosition();
  overScreen.style.display = "none";
  pipe.style.animation = "pipe-animation 2s infinite linear"; // Reinicia a animação do cano
  startGameLoop();
  resetScore();

};

const showOverScreen = () => {
  overScreen.style.display = "flex";
  restartButton.addEventListener("click", restartGame);
};

const resetCloudsPosition = () => {
  clearInterval(cloudsAnimation);
  clouds.style.left = "100%";
  cloudsPosition = gameBoard.offsetWidth;
  cloudsAnimation = setInterval(() => {
    if (isGameOver == true) {
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

const resetPipePosition = () => {
  clearInterval(pipeAnimation);
  pipe.style.left = "100vw";
  pipePosition = gameBoard.offsetWidth;
  let pipeSpeed = (window.innerWidth * 0.5) / 100;
   
  pipeAnimation = setInterval(() => {
    if (isGameOver) {
      pipePosition -= 0;
    } else {
      pipePosition -= pipeSpeed;
      pipeSpeed *= 1.001; // Aumenta a velocidade gradualmente
    }
    if (pipePosition <= -pipe.offsetWidth) {
      pipePosition = gameBoard.offsetWidth;
      pipeSpeed = (window.innerWidth * 0.5) / 100;
    }
    pipe.style.left = `${pipePosition}px`;
  }, 10);
};

const resetMarioPosition = () => {
  mario.src = "./images/mario.webp";
  mario.style.width = "12vw";
  mario.style.marginLeft = "12vw";
  mario.style.bottom = "0";
};

const startGameLoop = () => {
  gameLoop = setInterval(() => {
    if (!isGameOver) {
      checkCollision();
      pipePosition = pipe.offsetLeft;
      countScore();
      updateScoreDisplay();
      updateCurrentScoreDisplay(); // Atualiza o score exibido
    }
  }, 10);
};

const countScore = () => {
    if (pipePosition <= (window.innerWidth * 4) / 100 && pipePosition > (window.innerWidth * 3.4) / 100) {
        currentScore += 1; // Incrementa a pontuação
       }
       if(currentScore > score){
        score = currentScore;
       }
}

const resetScore = () => {
        currentScore = 0; 
}


const updateScoreDisplay = () => {
  scoreDisplay.textContent = `${score}`;
};

const updateCurrentScoreDisplay = () => {
    currentScoreDisplay.textContent = `${currentScore}`;
    document.querySelector(".top-score").innerHTML = `${currentScore}`; 
};




document.addEventListener("click", (event) => {if(isGameOver === true){ }else{jump();}});

document.addEventListener("keydown", (event) => {if(isGameOver === true){ }else{jump();}});


