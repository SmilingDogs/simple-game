const startBtn = document.getElementById("start");
const screens = document.querySelectorAll(".screen");
const selectTime = document.getElementById("time-list");
const timeIndicator = document.getElementById("time");
const board = document.getElementById("board");

let time = 0;
let score = 0;
let interval;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

selectTime.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = +e.target.dataset.time;
    screens[1].classList.add("up");
    startGame()
  } else if (e.target.classList.contains("set")) {
    time = +prompt("Введите время игры в секундах")
    screens[1].classList.add("up");
    startGame()
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    e.target.remove();
    score++;
    creatCircle();
  }
});

const randomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

// startGame();

function startGame() {
  timeIndicator.innerHTML = `00 : ${time}`;
  interval = setInterval(decreaseTime, 1000);
  creatCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    time = time - 1;
    if (time < 10) {
      timeIndicator.innerHTML = `00 : 0${time}`;
    } else timeIndicator.innerHTML = `00 : ${time}`;
  }
}

function finishGame() {
  clearInterval(interval)
  timeIndicator.parentNode.classList.add("hide")
  board.innerHTML = `<h1> Your Score: <span class="primary">${score}</span></h1>`;

}

function creatCircle() {
  const circle = document.createElement("div");
  circle.className = "circle";
  let size = randomNumber(8, 50);
  const { width, height } = board.getBoundingClientRect();
  let circleCoordinateX = randomNumber(0, width - size);
  let circleCoordinateY = randomNumber(0, height - size);
  let circleColor = "#" + Math.round(0xffffff * Math.random()).toString(16);
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.backgroundColor = circleColor;
  circle.style.top = circleCoordinateY + "px";
  circle.style.left = circleCoordinateX + "px";
  board.append(circle);
}
