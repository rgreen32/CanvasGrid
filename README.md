

# CanvasGrid  

CanvasGrid is a lightweight JavaScript library that extends the functionality of the HTML `<canvas>` element by introducing a new rendering context, `"2dGrid"`. This context enables intuitive drawing in a **2D Cartesian coordinate system**, where the origin `(0,0)` is centered on the canvas.  

## Features  

- **Cartesian Grid System** – Draw using coordinates with the origin at the center.  
- **Automatic Scaling** – Adapts to different canvas sizes while maintaining proportional units.  
- **Grid Rendering** – Easily draw a labeled Cartesian grid.  
- **Coordinate Transformation** – Convert between meters and pixels seamlessly.  
- **Enhanced Drawing Methods** – Standard canvas methods like `moveTo`, `lineTo`, `arc`, and `fillText` automatically adjust to the Cartesian coordinate system.  

## Installation  

You can install CanvasGrid via npm:  

```sh
npm install canvas-grid
```



## Usage  

### Setting Up a Canvas with the 2D Grid Context  

<div style="display: flex; align-items: center; gap: 5px">
  <div>
  
  ```js
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2dGrid");

  ctx.drawGrid(); // Draws the Cartesian grid
  ```

  </div>
  <div>
    <img src="https://i.imgur.com/mq5B9dd.png" alt="Canvas Grid Example" height=200 >
  </div>
</div>


### Drawing with the Cartesian Coordinate System  

<div style="display: flex; align-items: center; gap: 5px">
  <div>
  
```js
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 5, 5); // Draws a red rectangle centered at (10, 10)
```

  </div>
  <div>
    <img src="https://i.imgur.com/N7mQWwQ.png" alt="Canvas Grid Example" height=200 >
  </div>
</div>




## API  

### `ctx.drawGrid()`  
Draws a Cartesian grid with labeled axes.  

### `ctx.drawLabels()`  
Adds numerical labels to the grid for reference.  

### `ctx.metersToPixels(...meterValues: number[]): number[]`  
Converts meter values to pixel values based on the current scaling ratio.  

### `ctx.transformCoordinates(ctx, x, y): [number, number]`  
Transforms Cartesian coordinates `(x, y)` into pixel positions relative to the canvas.  

### Overridden Canvas Methods  
- `moveTo(x, y)`  
- `lineTo(x, y)`  
- `rect(x, y, width, height)`  
- `fillRect(x, y, width, height)`  
- `fillText(text, x, y, maxWidth?)`  
- `arc(x, y, radius, startAngle, endAngle, anticlockwise?)`  

These methods now use the Cartesian coordinate system, making it easier to draw objects in a math-friendly way.  

