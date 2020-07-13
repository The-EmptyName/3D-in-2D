class canvas {
    private element: HTMLElement;
    public context: CanvasRenderingContext2D;
    constructor(element) {
        this.element = element;
        this.context = element.getContext("2d");
    }
    public line(x1: number, y1: number, x2: number, y2: number, color: string = "black"): void {
        this.context.resetTransform();
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
    public figure(points: number[][], stroke = "black", fill = "rgba(0,0,0,0)"): void {
        this.context.resetTransform();
        this.context.fillStyle = fill;
        this.context.strokeStyle = stroke;
        this.context.beginPath();
        this.context.moveTo(points[0][0], points[0][1]);
        for ( var i = 1; i < points.length; i ++ ) {
            this.context.lineTo(points[i][0], points[i][1]);
            this.context.stroke();
        }
        this.context.lineTo(points[0][0], points[0][1]);
        this.context.stroke();
        this.context.fill();
    }
    public clear(): void {
        this.context.clearRect(0, 0, 2550, 1440);
    }
}

interface canvas {
    context: CanvasRenderingContext2D;
    line(x1, y1, x2, y2, color): void;
}

//beginPath
//moveTo
//lineTo
//rotate
//resetTransform
//stroke
//fill
//fillStyle