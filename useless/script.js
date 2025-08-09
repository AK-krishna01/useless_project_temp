let timeLeft = 25 * 60;
let streak = 0;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer-display").textContent =
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
    timeLeft--;

    if (timeLeft % 300 === 0 && timeLeft > 0) {
      streak++;
      document.getElementById("streak").textContent = `Streak: ${streak} 🔥`;
    }

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      alert("Break time! Continue wasting time.");
      timeLeft = 5 * 60;
      startTimer();
    }
  }, 1000);
}

document.getElementById("weather-data").textContent =
  `Weather in ${randomPanchayat()}: ${randomTemp()}°C`;

function randomPanchayat() {
  const names = ["Poonjar", "Mankulam", "Kumily", "Kanjikuzhi", "Gudalur"];
  return names[Math.floor(Math.random() * names.length)];
}

function randomTemp() {
  return (20 + Math.random() * 10).toFixed(1);
}
