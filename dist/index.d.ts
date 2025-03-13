interface CanvasRenderingContext2D {
    drawGrid(): void;
    drawLabels(): void;
    metersToPixels(...meterValues: number[]): number[];
    transformCoordinates(ctx: CanvasRenderingContext2D, x: number, y: number): [number, number];
    pixelMeterRatio: number;
    X_MINMAX: number[];
    Y_MINMAX: number[];
}
declare class GridOptions {
    color: string;
    minAxisLength: number;
}
interface HTMLCanvasElement {
    getContext(contextId: "2dGrid", options?: any): CanvasRenderingContext2D | null;
    getContext(contextId: string, options?: any): RenderingContext | null;
}
declare const originalGetContext: {
    (contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    (contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    (contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    (contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    (contextId: string, options?: any): RenderingContext | null;
    (contextId: "2dGrid", options?: any): CanvasRenderingContext2D | null;
    (contextId: string, options?: any): RenderingContext | null;
};
