let num1, num2, operator;
let score = 0;
let lives = 5;
let timer;
let time = 20;
let correctAnswer = 0;

// 💬 message
function showMessage(text, color) {
  const msg = document.getElementById("message");
  msg.innerText = text;
  msg.style.color = color;

  setTimeout(() => msg.innerText = "", 1500);
}

// ▶️ start game
function startGame() {
  showMessage("🚀 Game Started!", "blue");
  newQuestion();
  startTimer();
}

// ⏱ timer
function startTimer() {
  clearInterval(timer);
  time = 20;

  document.getElementById("timer").innerText = "⏱ " + time;

  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = "⏱ " + time;

    if (time === 0) loseLife();
  }, 1000);
}

// 🧠 new question
function newQuestion() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;

  const ops = ['+', '-', '*', '/'];
  operator = ops[Math.floor(Math.random() * ops.length)];

  if (operator === '+') correctAnswer = num1 + num2;
  if (operator === '-') correctAnswer = num1 - num2;
  if (operator === '*') correctAnswer = num1 * num2;

  if (operator === '/') {
    correctAnswer = Math.floor((num1 / num2) * 10) / 10; // 0.2 style
  }

  document.getElementById("question").innerText =
    `${num1} ${operator} ${num2} = ?`;

  document.getElementById("answer").value = "";
}

// ✅ check answer
function checkAnswer() {
  const userAns = parseFloat(document.getElementById("answer").value);

  if (userAns === correctAnswer) {
    score++;
    document.getElementById("score").innerText = "⭐ " + score;

    showMessage("🎉 Excellent!", "green");

    launchConfetti();

    newQuestion();
    startTimer();
  } else {
    loseLife();
  }
}

// ❌ lose life
function loseLife() {
  lives--;
  document.getElementById("lives").innerText = "❤️ " + lives;

  if (lives === 0) {
    gameOver();
    return;
  }

  showMessage("❌ Wrong!", "red");

  newQuestion();
  startTimer();
}

// 💔 game over (BIG SCORE)
function gameOver() {
  clearInterval(timer);

  document.getElementById("question").innerText = "Game Over 💔";

  document.getElementById("gameOverBox").style.display = "block";

  document.getElementById("finalScore").innerHTML =
    "🏆 FINAL SCORE<br><span style='font-size:40px;color:green'>" + score + "</span>";
}

// 🔁 restart
function restartGame() {
  score = 0;
  lives = 5;

  document.getElementById("score").innerText = "⭐ 0";
  document.getElementById("lives").innerText = "❤️ 5";
  document.getElementById("gameOverBox").style.display = "none";

  showMessage("🔁 New Game!", "blue");

  newQuestion();
  startTimer();
}

// 🎉 confetti
function launchConfetti() {
  for (let i = 0; i < 25; i++) {
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