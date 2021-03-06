const startBtn = document.getElementById("start");
const screens = document.querySelectorAll(".screen");
const selectTime = document.getElementById("time-list");
const timeIndicator = document.getElementById("time");
const board = document.getElementById("board");
const result = document.querySelector(".result");
const reset = document.getElementById("reset")
const timeLeft = document.querySelector(".time-left")


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
    if (time) {
      screens[1].classList.add("up");
      startGame()
    } else {
      screens[1].classList.add("up");
      result.classList.add("hide")
      timeLeft.classList.add("hide")
      board.innerHTML = `<h1>See you next time:)</h1>`;
      return //* дальше код не должен работать.
    }

  }
});

board.addEventListener("click", runGame);

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
  board.removeEventListener("click", runGame)
  clearInterval(interval)
  result.innerHTML = ``
  timeIndicator.parentNode.classList.add("hide")
  board.innerHTML = `<h1> Final Score: <span class="primary">${score}</span></h1>`;
  reset.classList.remove("hidden")

}
reset.addEventListener("click", () => {
  window.location.reload()
})

function creatCircle() {
  const circle = document.createElement("div");
  circle.className = "circle";
  let size = randomNumber(8, 50);
  const { width, height } = board.getBoundingClientRect();
  let circleCoordinateX = randomNumber(0, width - size);
  let circleCoordinateY = randomNumber(0, height - size);
//*   let circleColor = "#" + Math.floor(0xffffff * Math.random()).toString(16); Unstable, buggy
  let circleColor =  "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.backgroundColor = circleColor;
  circle.style.top = circleCoordinateY + "px";
  circle.style.left = circleCoordinateX + "px";
  board.append(circle);
}

function runGame(e){
  if (e.target.classList.contains("circle")) {
    e.target.remove();
    score++;
    result.innerHTML = `<h3 class="result"> Bingo! <span>Current Score: ${score}</span></h3>`
    creatCircle();
  } else {
    score--;
    result.innerHTML = `<h3 class="result"> Miss! <span>Current Score: ${score}</span></h3>`
  }
}
