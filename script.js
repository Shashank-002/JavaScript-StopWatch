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
const lapDisplay = document.getElementById('lapDisplay');  

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLapTime);  

// Initially hide the stop button
stopButton.style.display = 'none';

// Function to start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - savedTime;  
        timeUpdateIntervalId = setInterval(updateTimeDisplay, 10);  
        isRunning = true;
        
        // Hide the start button and show the stop button
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
    }
}

function stopStopwatch() {
    if (isRunning) {
        savedTime = Date.now() - startTime;  
        clearInterval(timeUpdateIntervalId);  
        isRunning = false;

        // Hide the stop button and show the start button
        stopButton.style.display = 'none';
        startButton.style.display = 'inline-block';
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timeUpdateIntervalId);  
    isRunning = false;
    savedTime = 0;  
    timeDisplay.textContent = formatMainDisplayTime(0);  
    lapTimes = [];  
    lapDisplay.innerHTML = '';  
    lastLapTime = 0;  

    // Show start button and hide stop button after reset
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
}

// Function to record lap time
function recordLapTime() {
    if (isRunning) {
        const currentLapTime = updatedTime;
        lapTimes.push(currentLapTime);  
        const lapGap = currentLapTime - lastLapTime;  
        lastLapTime = currentLapTime;  

        const lapNumber = lapTimes.length;
        const lapText = `Lap ${lapNumber}: ${formatLapTime(lapGap)}`;
        const lapElement = document.createElement('div');
        lapElement.textContent = lapText;
        lapDisplay.appendChild(lapElement);
    }
}

// Function to update the time display
function updateTimeDisplay() {
    updatedTime = Date.now() - startTime;  
    timeDisplay.textContent = formatMainDisplayTime(updatedTime); 
}

// Helper function to format time for main display (hh:mm:ss:ms hidden until needed)
function formatMainDisplayTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);  
    const hours = Math.floor(totalSeconds / 3600);  // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60);  // Calculate remaining minutes
    const seconds = totalSeconds % 60;  
    const millis = Math.floor((milliseconds % 1000)/10); 

    // Format time as mm:ss:ms if hours are 0, else as hh:mm:ss:ms
    return hours > 0 
        ? `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`
        : `${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`;
}

// Helper function to format time for lap display (always show hours)
function formatLapTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);  
    const hours = Math.floor(totalSeconds / 3600);  // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60);  // Calculate remaining minutes
    const seconds = totalSeconds % 60;  
    const millis = Math.floor((milliseconds % 1000)/10); 

    // Always show hours
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(millis)}`;
}

// Helper function to pad time with leading zero if needed
function padTime(time) {
    return time.toString().padStart(2, '0');
}
