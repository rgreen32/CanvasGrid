import '../dist/index.js';

const button = document.createElement("button");
button.innerText = "Add 10 to canvas width";

const canvas = document.createElement("canvas");
canvas.style.border = "1px solid black";

button.onclick = () => {
    console.log("clicked")
    canvas.width = canvas.width + 100;
    console.log("canvas.width", canvas.width)
}

canvas.width = window.outerWidth * .9;
canvas.height = window.outerHeight * .9;
document.body.appendChild(button);  

document.body.appendChild(canvas);
const context = canvas.getContext("2dGrid", {minAxisLength: 100, color: "pink"}) as CanvasRenderingContext2D;

context.drawGrid();
let start;
let dots: any[] = []
for (let i = 0; i < 10; i++) {
    let dot = {
        position: [0, 0],
        velocity: [Math.floor(Math.random() * 30) - 15, Math.floor(Math.random() * 40) ],
        acceleration: [0, -9.81],
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    }
    dots.push(dot)
}
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    let elapsed = (timestamp - start) * 2;
    start = timestamp
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawGrid();

    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.velocity[0] += dot.acceleration[0] * (elapsed * 0.001)
        dot.position[0] += dot.velocity[0] *  (elapsed * 0.001)

        dot.velocity[1] += dot.acceleration[1] * (elapsed * 0.001) // elapsed
        dot.position[1] += dot.velocity[1] *  (elapsed * 0.001)

        if (dot.position[1] <= -40) {
            dot.velocity[1] *= -1
            dot.position[1] = -40
        }
        if (dot.position[0] <= -40 || dot.position[0] >= 40) {
            dot.velocity[0] *= -1
        }
        context.fillStyle = dot.color;
        context.fillRect(dot.position[0], dot.position[1], 2, 2)
    }
    

    requestAnimationFrame(step);
}
requestAnimationFrame(step);