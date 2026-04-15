let num1, num2, operator;
let score = 0;
let lives = 7;
let timer;
let time = 30;
let correctAnswer = 0;
let gameActive = false;

// ⭐ ADD THIS (NEW)
let level = 1;

// 💬 MESSAGE
function showMessage(text, color, big = false) {
  const msg = document.getElementById("message");

  msg.innerText = text;
  msg.style.color = color;

  if (big) msg.classList.add("wow");
  else msg.classList.remove("wow");

  clearTimeout(msg.clearTimer);

  msg.clearTimer = setTimeout(() => {
    msg.innerText = "";
    msg.classList.remove("wow");
  }, 1200);
}

// ▶ START GAME
function startGame() {
  score = 0;
  lives = 7;
  level = 1; // ⭐ RESET LEVEL
  gameActive = true;

  clearInterval(timer);

  document.getElementById("score").innerText = "⭐ 0";
  document.getElementById("lives").innerText = "❤️ 7";
  document.getElementById("level").innerText = "🏆 L1"; // ⭐ RESET UI

  document.getElementById("gameOverBox").style.display = "none";
  document.getElementById("message").innerText = "";

  newQuestion();
  startTimer();
}

// ⏱ TIMER (SAFE)
function startTimer() {

  clearInterval(timer);

  time = 30;
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

// 🧠 QUESTION
function newQuestion() {

  clearInterval(timer);

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

// 🎉 CONFETTI
function launchConfetti() {

  for (let i = 0; i < 50; i++) {

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

    // ⭐ LEVEL SYSTEM (ADD ONLY)
    if (score % 5 === 0) {
      level++;
      document.getElementById("level").innerText = "🏆 L" + level;
    }

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

// ❌ LOSE LIFE
function loseLife() {

  lives--;
  document.getElementById("lives").innerText = "❤️ " + lives;

  if (lives <= 0) {
    gameOver();
    return;
  }

  showMessage("❌ Wrong! Try again 😊", "red");

  setTimeout(() => {
    showMessage("✔ Correct: " + correctAnswer, "blue");
  }, 600);

  setTimeout(() => {
    newQuestion();
    startTimer();
  }, 2000);
}

// 💔 GAME OVER
function gameOver() {

  gameActive = false;
  clearInterval(timer);

  document.getElementById("question").innerText = "Game Over 💔";
  document.getElementById("gameOverBox").style.display = "block";

  document.getElementById("finalScore").innerText =
    "🏆 WOW! You got " + score + " stars ⭐";
}