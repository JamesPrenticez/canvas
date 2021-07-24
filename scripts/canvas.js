let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d');
let table = document.getElementById('table');

let startPosition =  {x: 0, y: 0}
let movingPosition =  {x: 0, y: 0}
let endPosition = {x: 0, y: 0}

let isDrawing = false;

// Resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

//Main Function to Run
resizeCanvas();

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        /**
         * Your drawings need to be inside this function otherwise they will be reset when 
         * you resize the browser window and the canvas goes will be cleared.
         */
        // drawStuff(); 
}

//Get mouse position relative to the canvas element on the users screen
function getCursorCoordinates (event) {
    
    const position = {
        x: event.pageX,
        y: event.pageY
    };
    
    const offset = {
        left: canvas.offsetLeft,
        top: canvas.offsetTop
    };
    
    let reference = canvas.offsetParent;
    
    while(reference){
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
    }
    
    return { 
        x: position.x - offset.left,
        y: position.y - offset.top,
    }; 
    
}

const mouseDownListener = (event) => {
    startPosition = getCursorCoordinates(event);
    logToScreen(startPosition)
}

const logToScreen = (startPosition, endPosition) => {
    let table = document.getElementById("table")
    let row = table.insertRow(2)
    let cellX = row.insertCell(0)
    let cellY = row.insertCell(1)
    cellX.innerHTML = startPosition.x
    cellY.innerHTML = startPosition.y
 }

//Event listeners
canvas.addEventListener('mousedown', mouseDownListener);
