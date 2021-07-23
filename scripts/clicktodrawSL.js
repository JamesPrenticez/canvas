const dimGroups = document.getElementById('dimensionGroups');
const canvasEle = document.getElementById('canvas');
const context = canvasEle.getContext('2d');
let startPosition = {x: 0, y: 0};
let lineCoordinates = {x: 0, y: 0};
let isDrawStart = false;

const getClientOffset = (event) => {
    const {pageX, pageY} = event.touches ? event.touches[0] : event;
    const x = pageX - canvasEle.offsetLeft;
    const y = pageY - canvasEle.offsetTop;

    return {
       x,
       y
    } 
}

const drawLine = () => {
   context.beginPath();
   context.moveTo(startPosition.x, startPosition.y);
   context.lineTo(lineCoordinates.x, lineCoordinates.y);
   context.stroke();
}

const mouseDownListener = (event) => {
   startPosition = getClientOffset(event);
   isDrawStart = true;
   console.log(startPosition)
}

const mouseMoveListener = (event) => {
  if(!isDrawStart) return;
  lineCoordinates = getClientOffset(event);
  
  clearCanvas();
  //Can you mock this?
  drawLine();
  //wait untill the end
  console.log(lineCoordinates)
  //only want to log the last number
  logToScreen()
}

const logToScreen = () => {
   let table = document.getElementById("dimensionGroups")
   let row = table.insertRow(2)
   let cellX = row.insertCell(0)
   let cellY = row.insertCell(1)
   cellX.innerHTML = lineCoordinates.x
   cellY.innerHTML = lineCoordinates.y
   console.log(cellX)
}

const mouseupListener = (event) => {
  isDrawStart = false;
}

const clearCanvas = () => {
   context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}

canvasEle.addEventListener('mousedown', mouseDownListener);
canvasEle.addEventListener('mousemove', mouseMoveListener);
canvasEle.addEventListener('mouseup', mouseupListener);

canvasEle.addEventListener('touchstart', mouseDownListener);
canvasEle.addEventListener('touchmove', mouseMoveListener);
canvasEle.addEventListener('touchend', mouseupListener);