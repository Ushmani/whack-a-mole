let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startNewGameButton = document.getElementById("startNewGame");
let pauseGameButton = document.getElementById("pauseGame");
let grid = document.getElementsByClassName("grid")[0];
let squares = document.querySelectorAll(".square");

let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// randomly place mole
function randomMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

function countDown() {
  timeLeft--;
  timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;

  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    grid.style.display = "none";
  }
}
randomMole();

function startGame() {
  score = 0;
  timeLeft = 60;

  scoreH2.innerHTML = "Your Score: 0";
  timeLeft.innerHTML = "Time Left: 60";
  grid.style.display = "flex";
  pauseGameButton.style.display = "inline-block";
  pauseGameButton.innerHTML = "Pause";
  timerId = setInterval(randomMole, 1000);
  randomMoleId = setInterval(countDown, 1000);
}

function pauseResumeGame() {
  if (pauseGameButton.textContent === "Pause") {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    pauseGameButton.textContent = "Resume";
  } else {
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
    pauseGameButton.textContent = "Pause";
  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (square.id === hitPosition) {
        score++;
        scoreH2.innerHTML = `Your Score ${score}`;
        hitPosition = null;
      }
    }
  });
});
startNewGameButton.addEventListener("click", startGame);
pauseGameButton.addEventListener("click", pauseResumeGame);
