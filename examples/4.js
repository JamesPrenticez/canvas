//https://codepen.io/jamesprenticez/pen/XWRRgeQ

var canvas = document.getElementById("canvas");
canvas.width = 1024;
canvas.height = 768;
var ctx = canvas.getContext("2d");

function drawPoint(coords) {
  console.log();
  var offsetX = canvas.offsetLeft - window.scrollX;
  var offsetY = canvas.offsetTop - window.scrollY;
  ctx.fillRect(coords.x - offsetX, coords.y - offsetY, 100, 100);
}
function drawLine(from, to) {
  var offsetX = canvas.offsetLeft - window.scrollX;
  var offsetY = canvas.offsetTop - window.scrollY;
  ctx.beginPath();
  ctx.moveTo(from.x - offsetX, from.y - offsetY);
  ctx.lineTo(to.x - offsetX, to.y - offsetY);
  ctx.stroke();
}

function draw(evt) {
  if (evt.buttons !== 1) {
    return; // only proceed with left button
  }
  var thisPoint = {
    x: evt.clientX,
    y: evt.clientY
  };
  if (!evt.shiftKey) {
    drawPoint(thisPoint);
  } else {
    drawLine(previousPoint, thisPoint);
  }
  previousPoint = thisPoint;
}

var previousPoint;
document.addEventListener("mousemove", draw);