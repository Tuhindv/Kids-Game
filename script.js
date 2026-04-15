
let num1, num2, operator;
let score = 0;
let lives = 5;
let timer;
let time = 20;
let correctAnswer = 0;
let gameActive = true;

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
  }, 2500);
}

// ▶ START GAME
function startGame() {
  score = 0;
  lives = 5;
  gameActive = true;

  document.getElementById("score").innerText = "⭐ 0";
  document.getElementById("lives").innerText = "❤️ 5";
  document.getElementById("gameOverBox").style.display = "none";

  nextQuestion();
}

// 🔁 NEXT QUESTION
function nextQuestion() {
  if (!gameActive) return;
  newQuestion();
  startTimer();
}

// ⏱ TIMER
function startTimer() {
  if (!gameActive) return;

  clearInterval(timer);
  time = 20;

  document.getElementById("timer").innerText = "⏱ " + time;

  timer = setInterval(() => {
    if (!gameActive) return;

    time--;
    document.getElementById("timer").innerText = "⏱ " + time;

    if (time === 0) loseLife();
  }, 1000);
}

// 🧠 QUESTION
function newQuestion() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;

  const ops = ['+', '-', '*', '/'];
  operator = ops[Math.floor(Math.random() * ops.length)];

  if (operator === '+') correctAnswer = num1 + num2;
  if (operator === '-') correctAnswer = num1 - num2;
  if (operator === '*') correctAnswer = num1 * num2;

  if (operator === '/') {
    correctAnswer = Math.floor((num1 / num2) * 10) / 10;
  }

  document.getElementById("question").innerText =
    `${num1} ${operator} ${num2}`;

  document.getElementById("answer").value = "";
}

// 🎊 CONFETTI
function launchConfetti() {
  for (let i = 0; i < 35; i++) {
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

    setTimeout(() => nextQuestion(), 800);

  } else {
    lives--;
    document.getElementById("lives").innerText = "❤️ " + lives;

    showMessage("❌ Wrong!", "red");

    setTimeout(() => {
      showMessage("✔ Correct Answer: " + correctAnswer, "blue");
    }, 600);

    setTimeout(() => nextQuestion(), 2500);

    if (lives === 0) gameOver();
  }
}

// 💔 GAME OVER (FULL STOP FIX)
function gameOver() {
  gameActive = false;
  clearInterval(timer);

  document.getElementById("question").innerText = "Game Over 💔";
  document.getElementById("gameOverBox").style.display = "block";

  document.getElementById("finalScore").innerText =
    "🏆 FINAL SCORE: " + score;
}