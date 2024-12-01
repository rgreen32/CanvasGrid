interface CanvasRenderingContext2D  {
    drawGrid(): void;
    drawTicks(): void;
    drawLabels(): void;
    metersToPixels(...meterValues: number[]): number[]
    transformCoordinates(ctx: CanvasRenderingContext2D, x: number, y: number): [number, number]
    pixelMeterRatio: number
    X_MINMAX: number[]
    Y_MINMAX: number[]
}
interface HTMLCanvasElement {
    getContext(contextId: "2dGrid", options?: any): CanvasRenderingContext2D | null;
    getContext(contextId: string, options?: any): RenderingContext | null;
}

const originalGetContext = HTMLCanvasElement.prototype.getContext;
// @ts-ignore
HTMLCanvasElement.prototype.getContext = function (contextId, options) {
    if (contextId === "2dGrid") {
        let context = originalGetContext.call(this, "2d", options) as CanvasRenderingContext2D
        let shorterSide = Math.min(this.width, this.height);
        let pixelMeterRatio = shorterSide / 200;
        context.pixelMeterRatio = pixelMeterRatio
        if (this.width >= this.height) {
            context.X_MINMAX = [-(context.canvas.width / 2) / pixelMeterRatio, (context.canvas.width / 2) / pixelMeterRatio];
            context.Y_MINMAX = [-100, 100];
        }else {
            context.X_MINMAX = [-100, 100];
            context.Y_MINMAX = [-(context.canvas.height/ 2) / pixelMeterRatio, (context.canvas.height/ 2) / pixelMeterRatio];
            
        }

        return context;
    } else {
        return originalGetContext.call(this, contextId, options);
    }
}


CanvasRenderingContext2D.prototype.metersToPixels = function (...meterValues: number[]) {
    return meterValues.map((meterValue) => { return meterValue * this.pixelMeterRatio })
}

// Utility function to transform Cartesian coordinates
CanvasRenderingContext2D.prototype.transformCoordinates = function(ctx: CanvasRenderingContext2D, x: number, y: number): [number, number] {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    [x, y] = this.metersToPixels(x, y)
    return [centerX + x, centerY - y]; 
}



//function that draws a cartesian grid on the canvas
CanvasRenderingContext2D.prototype.drawGrid = function(){

    this.beginPath();
    for (let y = this.Y_MINMAX[0]; y < this.Y_MINMAX[1]; y += 10) {
        this.moveTo(this.X_MINMAX[0], y);
        this.lineTo(this.X_MINMAX[1], y);
    }

    for (let x = 0; x > this.X_MINMAX[0]; x -= 10) {
        this.moveTo(x, this.Y_MINMAX[0]);
        this.lineTo(x, this.Y_MINMAX[1]);
    }
    for (let x = 0; x < this.X_MINMAX[1]; x += 10) {
        this.moveTo(x, this.Y_MINMAX[0]);
        this.lineTo(x, this.Y_MINMAX[1]);
    }
    this.strokeStyle = "rgba(0, 0, 0, 0.3)"
    this.stroke();


    this.beginPath();    
    this.moveTo(this.X_MINMAX[0], 0);
    this.lineTo(this.X_MINMAX[1], 0);
    this.moveTo(0, this.Y_MINMAX[0]);
    this.lineTo(0, this.Y_MINMAX[1]);
    this.strokeStyle = "rgba(0, 0, 0, 1)"
    this.stroke();

    
    this.drawLabels();

}

//function that adds numerical labels to grid on the canvas
CanvasRenderingContext2D.prototype.drawLabels = function(){

    // this.font = "12px Arial";
    this.fillStyle = "black";
    this.textAlign = "center";
    this.textBaseline = "middle";

    for (let y = 10; y < this.Y_MINMAX[1]; y += 10) {
        this.fillText(y.toString(), 0+2, y-1.4);
    }

    for (let y = -10; y > this.Y_MINMAX[0]; y -= 10) {
        this.fillText(y.toString(), 0+2, y-1.4);
    }

    for (let x = 0; x < this.X_MINMAX[1]; x += 10) {
        this.fillText(x.toString(), x+2, 0-1.4);
    }

    for (let x = -10; x > this.X_MINMAX[0]; x -= 10) {
        this.fillText(x.toString(), x+2, 0-1.4);
    }
}

//function that draws a ticks on the canvas
CanvasRenderingContext2D.prototype.drawTicks = function(){


    this.moveTo(this.X_MINMAX[0], 0);
    this.lineTo(this.X_MINMAX[1], 0);
    this.moveTo(0, this.Y_MINMAX[0]);
    this.lineTo(0, this.Y_MINMAX[1]);


    this.stroke();
    
}

// Override `rect`
const originalRect = CanvasRenderingContext2D.prototype.rect;
CanvasRenderingContext2D.prototype.rect = function (x: number, y: number, width: number, height: number) {
    const [newX, newY] = this.transformCoordinates(this, x, y);
    [width, height] = this.metersToPixels(width, height)
    return originalRect.call(this, newX - (width/2), newY - (height/2), width, height);
};

// Override `moveTo`
const originalMoveTo = CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.moveTo = function (x: number, y: number) {
    const [newX, newY] = this.transformCoordinates(this, x, y);
    return originalMoveTo.call(this, newX, newY);
};

// Override `lineTo`
const originalLineTo = CanvasRenderingContext2D.prototype.lineTo;
CanvasRenderingContext2D.prototype.lineTo = function (x: number, y: number) {
    const [newX, newY] = this.transformCoordinates(this, x, y);
    return originalLineTo.call(this, newX, newY);
};

// Override `arc`
const originalArc = CanvasRenderingContext2D.prototype.arc;
CanvasRenderingContext2D.prototype.arc = function (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
) {
    const [newX, newY] = this.transformCoordinates(this, x, y);
    return originalArc.call(this, newX, newY, radius, startAngle, endAngle, anticlockwise);
};

// Override `fillText`
const originalFillText = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function (text: string, x: number, y: number, maxWidth?: number) {
    const [newX, newY] = this.transformCoordinates(this, x, y);
    maxWidth = maxWidth ? this.metersToPixels(maxWidth)[0] : maxWidth
    return originalFillText.call(this, text, newX, newY, maxWidth);
};


