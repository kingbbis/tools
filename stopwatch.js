let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let interval;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    const totalCentiseconds = Math.floor(elapsedTime / 10);
    const minutes = Math.floor(totalCentiseconds / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    display.textContent = timeString;
}

function startStopwatch() {
    console.log('Stopwatch started');
    if (isRunning) return;
    isRunning = true;
    startTime = performance.now() - elapsedTime;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    interval = setInterval(function() {
        elapsedTime = performance.now() - startTime;
        console.log('Updating stopwatch, elapsed:', elapsedTime);
        updateDisplay();
    }, 10);
}

function stopStopwatch() {
    if (!isRunning) return;
    clearInterval(interval);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initial setup
updateDisplay();
