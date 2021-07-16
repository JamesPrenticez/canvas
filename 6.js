//https://codepen.io/innocuo/pen/Npvymy

var snap;
var mouseFollower;

var mouseX, mouseY;

$(function () {
  snap = Snap("#main-svg");
  snap.attr({
    viewBox: "0 0 600 600",
    width: "100%",
    height: "100%"
  });

  var mainColor = "#aa9944";

  var bigCircle = snap.circle(300, 300, 2);
  bigCircle.attr({
    fill: mainColor
  });

  var drawingLine = snap.polyline(300, 300);
  drawingLine.attr({
    fill: "none",
    stroke: mainColor,
    strokeWidth: "1"
  });
  
  mouseFollower = snap.node.createSVGPoint();
  mouseFollower.x = 300;
  mouseFollower.y = 300;
  drawingLine.node.points.appendItem(mouseFollower);

  var count = 0;
  $("#main-svg").on("click", function (e) {
    var circle_width = $(bigCircle.node).width();
    var scale = circle_width / 4;
    var page_width_scaled = $(snap.node).width() / scale;
    var pageX_scaled = e.pageX / scale - (-300 + page_width_scaled / 2);

    var page_height_scaled = $(snap.node).height() / scale;
    var pageY_scaled = e.pageY / scale - (-300 + page_height_scaled / 2);
    console.log(pageX_scaled);

    var ratio = $(snap.node).width() / 300;

    mouseFollower = snap.node.createSVGPoint();
    mouseFollower.x = pageX_scaled;
    mouseFollower.y = pageY_scaled;
    drawingLine.node.points.appendItem(mouseFollower);
    var circle = snap.circle(pageX_scaled, pageY_scaled, 2);
    circle.attr({
      fill: mainColor
    });
  });

  $(document).mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  function step(timestamp) {
    if (!mouseFollower) return;
    var circle_width = $(bigCircle.node).width();

    var scale = circle_width / 4;
    var page_width_scaled = $(snap.node).width() / scale;
    var pageX_scaled = mouseX / scale - (-300 + page_width_scaled / 2);

    var page_height_scaled = $(snap.node).height() / scale;
    var pageY_scaled = mouseY / scale - (-300 + page_height_scaled / 2);

    mouseFollower.x = pageX_scaled;
    mouseFollower.y = pageY_scaled;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
});
