let table = document.getElementById('table');
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let startPosition =  {x: 0, y: 0}
let movingPosition =  {x: 0, y: 0}
let endPosition = {x: 0, y: 0}

let isDrawing = false;

canvas.width = 800;
canvas.height = 600;


//Get mouse position relative to the canvas element on the users screen
function getCursorCoordinates (event, referenceElement) {
    
    const position = {
        x: event.pageX,
        y: event.pageY
    };
    
    const offset = {
        left: referenceElement.offsetLeft,
        top: referenceElement.offsetTop
    };
    
    let reference = referenceElement.offsetParent;
    
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
    console.log(startPosition)
    console.log("hi")
}

function sayHi(){
    console.log("hi")
}

//Event listeners
canvas.addEventListener('mousedown', mouseDownListener);