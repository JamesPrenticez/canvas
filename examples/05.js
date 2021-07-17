$(document).ready(function() {



//5.js

//https://codepen.io/NiallJoeMaher/pen/MaWGOa

    var color = $(".selected").css("background-color");
    var $canvas = $("canvas");
    var context = $canvas[0].getContext("2d");
    var lastEvent;
    var mouseDown = false;
    
    //When clicking on control list items
    $(".controls").on("click", "li", function(){
      //Deselect sibling elements
      $(this).siblings().removeClass("selected");
      //Select clicked element
      $(this).addClass("selected");
      //cache current color
      color = $(this).css("background-color");
    });
      
    //When "New Color" is pressed
    $("#revealColorSelect").click(function(){
      //Show color select or hide the color select
      changeColor();
      $("#colorSelect").toggle();
    });
    
    //update the new color span
    function changeColor() {
      var r = $("#red").val();
      var g = $("#green").val();
      var b = $("#blue").val();
      $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
    }
    
    //When color sliders change
    $("input[type=range]").change(changeColor);
    
    //When "Add Color" is pressed
    $("#addNewColor").click(function(){
      //Append the color to the controls ul
      var $newColor = $("<li></li>");
      $newColor.css("background-color", $("#newColor").css("background-color"));
      $(".controls ul").append($newColor);
      //Select the new color
      $newColor.click();
    });
    
    //On mouse events on the canvas
    $canvas.mousedown(function(e){
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function(e){
      //Draw lines
      if(mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
      }
    }).mouseup(function(){
      mouseDown = false;
    }).mouseleave(function(){
      $canvas.mouseup();
    
    }).mouseleave(function(){
      $canvas.mouseup();
    });
    
    var clicks = 0;
    var lastClick = [0, 0];
    
    document.getElementById('canvas').addEventListener('click', drawLine, false);
    
    function getCursorPosition(e) {
        var x;
        var y;
    
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        
        return [x, y];
    }
    
    function drawLine(e) {
        context = this.getContext('2d');
    
        x = getCursorPosition(e)[0] - this.offsetLeft;
        y = getCursorPosition(e)[1] - this.offsetTop;
        
        if (clicks != 1) {
            clicks++;
        } else {
            context.beginPath();
            context.moveTo(lastClick[0], lastClick[1]);
            context.lineTo(x, y, 6);
            
            context.strokeStyle = '#000000';
            context.stroke();
            
            clicks = 0;
        }
        
        lastClick = [x, y];
    };



    });