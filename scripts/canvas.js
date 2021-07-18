$(document).ready(function() {  

var canvas=document.getElementById("canvasPlans");
var context=canvas.getContext('2d');
var image=new Image();

image.onload=function(){
context.drawImage(image,0,0,canvas.width,canvas.height);
};
image.src="./plans/james.png";

});