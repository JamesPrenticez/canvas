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
    if(isDrawing === false){
        startPosition = getCursorCoordinates(event);
        logToScreen(startPosition)
        isDrawing = true;
    } else {
        endPosition = getCursorCoordinates(event);
        logToScreen(endPosition)
        isDrawing = false;
    }
}

const logToScreen = (position) => {
    //Get the Table
    let table = document.getElementById("table")

    if(isDrawing === false){
        //Create a new row
        let row = table.insertRow(-1)
        //Create 4 new cells inside that row
        let startX = row.insertCell(0)
        let startY = row.insertCell(1)
        let endX = row.insertCell(2)
        let endY = row.insertCell(3)
        //Write coordinates to the cells
        startX.innerHTML = position.x + "s"
        startY.innerHTML = position.y +"s"
        endX.innerHTML = ""
        endY.innerHTML = ""
    } else {
        //Get the last row
        let lastRow = table.rows[ table.rows.length - 1 ];
        //Update the last 2 cells on that row    
        let endX = lastRow.cells[2]
        let endY = lastRow.cells[3]
        //Write coordinates to the cells
        endX.innerHTML = position.x
        endY.innerHTML = position.y
    }
}

//Event listeners
canvas.addEventListener('mousedown', mouseDownListener);
