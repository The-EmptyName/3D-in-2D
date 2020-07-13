var canvas = /** @class */ (function () {
    function canvas(element) {
        this.element = element;
        this.context = element.getContext("2d");
    }
    canvas.prototype.line = function (x1, y1, x2, y2, color) {
        if (color === void 0) { color = "black"; }
        this.context.resetTransform();
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    };
    canvas.prototype.figure = function (points, stroke, fill) {
        if (stroke === void 0) { stroke = "black"; }
        if (fill === void 0) { fill = "rgba(0,0,0,0)"; }
        this.context.resetTransform();
        this.context.fillStyle = fill;
        this.context.strokeStyle = stroke;
        this.context.beginPath();
        this.context.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; i++) {
            this.context.lineTo(points[i][0], points[i][1]);
            this.context.stroke();
        }
        this.context.lineTo(points[0][0], points[0][1]);
        this.context.stroke();
        this.context.fill();
    };
    canvas.prototype.clear = function () {
        this.context.clearRect(0, 0, 2550, 1440);
    };
    return canvas;
}());
//beginPath
//moveTo
//lineTo
//rotate
//resetTransform
//stroke
//fill
//fillStyle
