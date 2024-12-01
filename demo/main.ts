import '../dist/index.js';

const canvas = document.createElement("canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2dGrid") as CanvasRenderingContext2D;

ctx.drawGrid();
ctx.drawTicks();

