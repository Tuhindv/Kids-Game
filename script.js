
let num1, num2, operator;
let score = 0;
let lives = 5;
let timer;
let time = 20;
let correctAnswer = 0;
let gameActive = false;

// 💬 MESSAGE (WOW support)
function showMessage(text, color, big = false) {
  const msg = document.getElementById("message");

  msg.innerText = text;
  msg.style.color = color;

  if (big) {
    msg.classList.add("wow");
  } else {
    msg.classList.remove("wow");
  }

  clearTimeout(msg.clearTimer);

  msg.clearTimer = setTimeout(() => {
    msg.innerText = "";
    msg.classList.remove("wow");
  }, 1200);
}

// ▶ START GAME
function startGame() {
  score = 0;
  lives = 5;
  gameActive = true;

  clearInterval(timer);

  document.getElementById("score").innerText = "⭐ 0";
  document.getElementById("lives").innerText = "❤️ 5";
  document.getElementById("gameOverBox").style.display = "none";
  document.getElementById("message").innerText = "";

  newQuestion();
  startTimer();
}

// ⏱ TIMER (FIXED - NO NEGATIVE BUG)
function startTimer() {
  clearInterval(timer);

  time = 20;
  document.getElementById("timer").innerText = "⏱ " + time;

  timer = setInterval(() => {

    if (!gameActive) {
      clearInterval(timer);
      return;
    }

    time--;

    if (time <= 0) {
      clearInterval(timer);
      time = 0;
      document.getElementById("timer").innerText = "⏱ 0";
      loseLife();
      return;
    }

    document.getElementById("timer").innerText = "⏱ " + time;

  }, 1000);
}

// 🧠 NEW QUESTION
function newQuestion() {

  clearInterval(timer); // IMPORTANT FIX

  document.getElementById("message").innerText = "";

  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;

  const ops = ['+', '-', '*'];
  operator = ops[Math.floor(Math.random() * ops.length)];

  if (operator === '+') correctAnswer = num1 + num2;
  if (operator === '-') correctAnswer = num1 - num2;
  if (operator === '*') correctAnswer = num1 * num2;

  document.getElementById("question").innerText =
    `${num1} ${operator} ${num2}`;

  document.getElementById("answer").value = "";
}

// ❌ LOSE LIFE
function loseLife() {

  lives--;
  document.getElementById("lives").innerText = "❤️ " + lives;

  if (lives <= 0) {
    gameOver();
    return;
  }

  showMessage("❌ Wrong!", "red");

  setTimeout(() => {
    showMessage("✔ Correct: " + correctAnswer, "blue");
  }, 600);

  setTimeout(() => {
    newQuestion();
    startTimer();
  }, 2000);
}

// 🎊 CONFETTI
function launchConfetti() {

  for (let i = 0; i < 30; i++) {

    const c = document.createElement("div");
    c.classList.add("confetti");

    c.style.left = Math.random() * 100 + "vw";
    c.style.backgroundColor =
      ["#ff0","#f0f","#0ff","#0f0","#f00","#00f"][Math.floor(Math.random()*6)];

    c.style.animationDuration = (Math.random() * 2 + 1) + "s";

    document.body.appendChild(c);

    setTimeout(() => c.remove(), 3000);
  }
}

// ✅ CHECK ANSWER
function checkAnswer() {

  if (!gameActive) return;

  const userAns = parseFloat(document.getElementById("answer").value);

  if (userAns === correctAnswer) {

    score++;
    document.getElementById("score").innerText = "⭐ " + score;

    showMessage("🎉 EXCELLENT!", "green", true);
    launchConfetti();

    setTimeout(() => {
      newQuestion();
      startTimer();
    }, 800);

  } else {
    loseLife();
  }
}

// 💔 GAME OVER
function gameOver() {

  gameActive = false;
  clearInterval(timer);

  document.getElementById("question").innerText = "Game Over 💔";
  document.getElementById("gameOverBox").style.display = "block";

  document.getElementById("finalScore").innerText =
    "🏆 FINAL SCORE: " + score;
}

// 🔁 RESTART
function restartGame() {
  startGame();
}