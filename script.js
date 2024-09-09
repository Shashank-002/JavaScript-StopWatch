let startTime;             
let updatedTime;             
let savedTime = 0;
let timeUpdateIntervalId;           
let isRunning = false;
let lapTimes = [];  
let lastLapTime = 0;  
let isLapVisible = false; 

const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const lapButton = document.getElementById('lapButton');  
const resetButton = document.getElementById('resetButton');  
const lapTableBody = document.getElementById('lapTableBody');  
let lapDisplay = document.querySelector('.lap-display');


startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLapTime);

toggleButtonVisibility({ start: true, stop: false, lap: false, reset: false });
lapButton.disabled = true;

function toggleButtonVisibility({ start, stop, lap, reset  }) {
    startButton.style.display = start ? 'inline-block' : 'none';
    stopButton.style.display = stop ? 'inline-block' : 'none';
    lapButton.style.display = lap ? 'inline-block' : 'none';
    resetButton.style.display = reset ? 'inline-block' : 'none';
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - savedTime;  
        timeUpdateIntervalId = setInterval(refreshStopwatchDisplay, 10);  
        isRunning = true;
        toggleButtonVisibility({ stop: true, lap: true, reset: true });
        lapButton.disabled = false;  
    }
}

function stopStopwatch() {
    if (isRunning) {
        savedTime = Date.now() - startTime;  
        clearInterval(timeUpdateIntervalId);  
        isRunning = false;
        toggleButtonVisibility({ start: true, lap: true, reset: true });
        lapButton.disabled = true; 
    }
}

function resetStopwatch() {
    clearInterval(timeUpdateIntervalId);  
    isRunning = false;
    savedTime = 0;  
    timeDisplay.textContent = formatMainDisplayTime(0);  
    lapTimes = [];  
    lapTableBody.innerHTML = '';  
    lastLapTime = 0;  
    toggleButtonVisibility({ start: true });
    lapButton.disabled = true;
    lapDisplay.style.display = 'none';
    isLapVisible = false;
}

function recordLapTime() {
    if (isRunning) {
        refreshStopwatchDisplay(); 

        const totalLapTime = currentTime; 
        lapTimes.push(totalLapTime);  
        const lapDuration = totalLapTime - lastLapTime;  
        lastLapTime = totalLapTime;  

        const lapSerialNumber = lapTimes.length;
        const formattedLapTime = formatMainDisplayTime(totalLapTime);  
        const formattedLapDuration = formatMainDisplayTime(lapDuration);  

        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${lapSerialNumber}</td><td>${formattedLapDuration}</td><td>${formattedLapTime}</td>`;
        lapTableBody.insertBefore(newRow, lapTableBody.firstChild);

        if (!isLapVisible) {
            lapDisplay.style.display = 'block';
            isLapVisible = true;
        }
    }
}


function refreshStopwatchDisplay() {
    currentTime = Date.now() - startTime;  
    timeDisplay.textContent = formatMainDisplayTime(currentTime); 
}

function formatMainDisplayTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millis = Math.floor(date.getUTCMilliseconds() / 10); 

    return hours > 0 
        ? `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`
        : `${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`;
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}
