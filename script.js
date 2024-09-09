let startTime;             
let updatedTime;             
let savedTime = 0;
let timeUpdateIntervalId;           
let isRunning = false;
let lapTimes = [];  
let lastLapTime = 0;  

const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');  
const lapTableBody = document.getElementById('lapTableBody');  

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLapTime);  

// Initially hide the stop, reset, and lap buttons
stopButton.style.display = 'none';
resetButton.style.display = 'none';
lapButton.style.display = 'none';
lapButton.disabled = true; 

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - savedTime;  
        timeUpdateIntervalId = setInterval(updateTimeDisplay, 10);  
        isRunning = true;
        
        // Show the stop, reset, and lap buttons, hide start button
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';
        lapButton.style.display = 'inline-block';
        lapButton.disabled = false;
    }
}

function stopStopwatch() {
    if (isRunning) {
        savedTime = Date.now() - startTime;  
        clearInterval(timeUpdateIntervalId);  
        isRunning = false;

        // Hide stop button and show start button
        stopButton.style.display = 'none';
        startButton.style.display = 'inline-block';
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

    // Hide reset and lap buttons, show start button, hide stop button
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    resetButton.style.display = 'none';
    lapButton.style.display = 'none';
    lapButton.disabled = true;
}

let lapDisplay = document.querySelector('.lap-display');
let isLapVisible = false; 

// Lap button logic
document.querySelector('#lapButton').addEventListener('click', function() {
    if (!isLapVisible) {
        lapDisplay.style.display = 'block';
        isLapVisible = true;
    }

});

// Reset button logic
document.querySelector('#resetButton').addEventListener('click', function() {
    lapDisplay.style.display = 'none';
    isLapVisible = false; 

});


function recordLapTime() {
    if (isRunning) {
        const currentLapTime = updatedTime;
        lapTimes.push(currentLapTime);  
        const lapGap = currentLapTime - lastLapTime;  
        lastLapTime = currentLapTime;  

        const lapNumber = lapTimes.length;
        const lapText = formatMainDisplayTime(currentLapTime);
        const lapDiff = formatMainDisplayTime(lapGap);

        // Add a new row at the top of the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${lapNumber}</td><td>${lapDiff}</td><td>${lapText}</td>`;
        lapTableBody.insertBefore(newRow, lapTableBody.firstChild);
    }
}


function updateTimeDisplay() {
    updatedTime = Date.now() - startTime;  
    timeDisplay.textContent = formatMainDisplayTime(updatedTime); 
}

// Helper function to format time for main display
function formatMainDisplayTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);  
    const hours = Math.floor(totalSeconds / 3600);  
    const minutes = Math.floor((totalSeconds % 3600) / 60);  
    const seconds = totalSeconds % 60;  
    const millis = Math.floor((milliseconds % 1000) / 10); 

    return hours > 0 
        ? `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`
        : `${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`;
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}
