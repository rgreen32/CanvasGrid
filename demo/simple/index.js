
const canvas = document.createElement("canvas");
canvas.style.border = "1px solid black";


canvas.width = window.outerWidth * .9;
canvas.height = window.outerHeight * .9;

document.body.appendChild(canvas);
const context = canvas.getContext("2dGrid");
context.drawGrid();

context.fillStyle = "red";
context.fillRect(10, 10, 5, 5); // Draws a red rectangle centered at (10, 10) with width 5 and height 5 meters
