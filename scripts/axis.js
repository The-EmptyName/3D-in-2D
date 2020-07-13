var axis = /** @class */ (function () {
    function axis(cnvs, rotation) {
        if (cnvs === void 0) { cnvs = new canvas(document.getElementsByTagName("canvas")[0]); }
        if (rotation === void 0) { rotation = [20, 270, 110]; }
        this.center = [2550 / 2, 1440 / 2];
        this.cnvs = cnvs;
        this.rotation = rotation;
        this.draw_axes();
        /*
         *        DEMONSTRATIONS
         *    Run only one at the time.
         */
        //this.spin(); // drawing lines
        //this.spin_2(); // translating 3d coordinates to 2d coordinates
        this.spin_3(1); // 3d object test A
        //this.spin_3(2); // 3d object test B
    }
    axis.prototype.draw_axes = function () {
        this.draw_axis(this.rotation[0], this.center, "red"); // x
        this.draw_axis(this.rotation[1], this.center, "green"); // y
        this.draw_axis(this.rotation[2], this.center, "blue"); // z
    };
    axis.prototype.draw_axis = function (rotate, center, color) {
        if (center === void 0) { center = this.center; }
        if (color === void 0) { color = "black"; }
        var a = 2550;
        if (rotate != 270 && rotate != 90) { // cos 270 and 90 is 0; c would be infinite
            var c = a / Math.cos(rotate * Math.PI / 180);
        }
        else if (rotate == 90) {
            var c = a / -0.001; // c will never be perfect at 90 and 270 degrees but this should be close enough
        }
        else {
            var c = a / 0.001;
        }
        var b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        if (rotate <= 90) {
            this.cnvs.line(center[0], center[1], 2550 + center[0], center[1] + b, color);
            //this.cnvs.line(center[0], center[1], -2550 + center[0], center[1] - b, color);
        }
        else if (rotate > 90 && rotate <= 180) {
            this.cnvs.line(center[0], center[1], -2550 + center[0], center[1] + b, color);
            //this.cnvs.line(center[0], center[1], 2550 + center[0], center[1] - b, color);
        }
        else if (rotate > 180 && rotate <= 270) {
            this.cnvs.line(center[0], center[1], -2550 + center[0], center[1] - b, color);
        }
        else {
            this.cnvs.line(center[0], center[1], 2550 + center[0], center[1] - b, color);
        }
    };
    axis.prototype.draw_figure = function (points, stroke, fill) {
        if (stroke === void 0) { stroke = "black"; }
        if (fill === void 0) { fill = "rgba(0,0,0,0)"; }
        var temp = [];
        for (var i = 0; i < points.length; i++) {
            var temp_2 = [this.center[0] + this.translate(points[i][0], this.rotation[0])[0] + this.translate(points[i][1], this.rotation[1])[0] + this.translate(points[i][2], this.rotation[2])[0], this.center[1] + this.translate(points[i][0], this.rotation[0])[1] + this.translate(points[i][1], this.rotation[1])[1] + this.translate(points[i][2], this.rotation[2])[1]];
            temp.push(temp_2);
        }
        this.cnvs.figure(temp, stroke, fill);
    };
    axis.prototype.spin = function () {
        var _this = this;
        var r = 0;
        var step = 25;
        var center = [Math.floor(Math.random() * 2550), Math.floor(Math.random() * 1440)];
        var inter = setInterval(function () {
            var rgb = [String(Math.floor(Math.random() * 255)), String(Math.floor(Math.random() * 255)), String(Math.floor(Math.random() * 255))];
            _this.draw_axis(r, center, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.5)");
            r += step;
            if (r > 360) {
                r = 0;
                step /= 2;
                if (step < 0.5) {
                    step = 25;
                    center = [Math.floor(Math.random() * 2550), Math.floor(Math.random() * 1440)];
                }
            }
        }, 1000 / 720);
    };
    axis.prototype.spin_2 = function () {
        var _this = this;
        this.cnvs.clear();
        var r = 0;
        var r2 = 270;
        var r3 = 135;
        var step = 1;
        var inter = setInterval(function () {
            _this.cnvs.clear();
            _this.cnvs.line(0, 1440 / 2, 2550, 1440 / 2, "white");
            _this.draw_axis(r, _this.center, "red");
            _this.cnvs.line(_this.center[0] + 100, _this.center[1], _this.center[0] + _this.translate(100, r)[0], _this.center[1] + _this.translate(100, r)[1]);
            _this.cnvs.line(_this.center[0] - 100, _this.center[1], _this.center[0] + _this.translate(100, r)[0], _this.center[1] + _this.translate(100, r)[1]);
            _this.cnvs.line(2550 / 2, 1440, 2550 / 2, 0, "white");
            _this.draw_axis(r2, _this.center, "green");
            _this.cnvs.line(_this.center[0], _this.center[1] + 200, _this.center[0] + _this.translate(200, r2)[0], _this.center[1] + _this.translate(200, r2)[1]);
            _this.cnvs.line(_this.center[0], _this.center[1] - 200, _this.center[0] + _this.translate(200, r2)[0], _this.center[1] + _this.translate(200, r2)[1]);
            _this.draw_axis(135, _this.center, "white");
            _this.draw_axis(315, _this.center, "white");
            _this.draw_axis(r3, _this.center, "blue");
            _this.cnvs.line(_this.center[0] + _this.translate(200, 135)[0], _this.center[1] + _this.translate(200, 135)[1], _this.center[0] + _this.translate(300, r3)[0], _this.center[1] + _this.translate(300, r3)[1]);
            _this.cnvs.line(_this.center[0] + _this.translate(-200, 135)[0], _this.center[1] + _this.translate(-200, 135)[1], _this.center[0] + _this.translate(300, r3)[0], _this.center[1] + _this.translate(300, r3)[1]);
            r += step;
            r2 += step;
            r3 += step;
            if (r > 360) {
                r = 0;
            }
            if (r2 > 360) {
                r2 = 0;
            }
            if (r3 > 360) {
                r3 = 0;
            }
        }, 1000 / 720);
    };
    axis.prototype.spin_3 = function (iteration) {
        var _this = this;
        if (iteration === void 0) { iteration = 1; }
        var step = 0.2;
        var step2 = 0;
        var step3 = 0.2;
        var inter = setInterval(function () {
            _this.cnvs.clear();
            if (iteration == 1) {
                _this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, 100, 100], [-100, 100, 100]], "black", "rgba(255,0,0,0.1)"); // front
                _this.draw_figure([[-100, -100, -100], [100, -100, -100], [100, 100, -100], [-100, 100, -100]], "black", "rgba(0,255,0,0.1)"); // back
                _this.draw_figure([[-100, 100, 100], [100, 100, 100], [100, 100, -100], [-100, 100, -100]], "black", "rgba(0,0,255,0.1)"); // ceiling
                _this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, -100, -100], [-100, -100, -100]], "black", "rgba(255,255,255,0.1)"); // floor
            }
            else if (iteration == 2) {
                _this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, -100, -100], [-100, -100, -100]], "black", "rgba(255,255,255,0.5)");
                _this.draw_figure([[-100, -100, 100], [100, -100, 100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                _this.draw_figure([[100, -100, -100], [-100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                _this.draw_figure([[100, -100, 100], [100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                _this.draw_figure([[-100, -100, 100], [-100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
            }
            _this.draw_figure([[-20, -20, 20], [20, -20, 20], [20, 20, 20], [-20, 20, 20]], "black");
            _this.draw_figure([[-20, -20, -20], [20, -20, -20], [20, 20, -20], [-20, 20, -20]], "black");
            _this.draw_figure([[-20, 20, 20], [20, 20, 20], [20, 20, -20], [-20, 20, -20]], "black");
            _this.draw_figure([[-20, -20, 20], [20, -20, 20], [20, -20, -20], [-20, -20, -20]], "black");
            _this.draw_axis(_this.rotation[0], _this.center, "red");
            _this.draw_axis(_this.rotation[1], _this.center, "green");
            _this.draw_axis(_this.rotation[2], _this.center, "blue");
            _this.rotation[0] += step;
            _this.rotation[1] += step2;
            _this.rotation[2] += step3;
            if (_this.rotation[0] > 360) {
                _this.rotation[0] = 0;
            }
            if (_this.rotation[1] > 360) {
                _this.rotation[1] = 0;
            }
            if (_this.rotation[2] > 360) {
                _this.rotation[2] = 0;
            }
            if (_this.rotation[0] < 0) {
                _this.rotation[0] = 359;
            }
            if (_this.rotation[1] < 0) {
                _this.rotation[1] = 359;
            }
            if (_this.rotation[2] < 0) {
                _this.rotation[2] = 359;
            }
        }, 1000 / 60);
        var press = function (event) {
            var key = event.keyCode;
            console.log(key);
            if (key == 65) { // a
                _this.rotation[0] += 1;
                _this.rotation[2] += 1;
            }
            if (key == 68) { // d
                _this.rotation[0] -= 1;
                _this.rotation[2] -= 1;
            }
            if (key == 81) { // q <-- not recommended
                _this.rotation[0] -= 1;
                _this.rotation[1] -= 1;
                _this.rotation[2] -= 0;
            }
            if (key == 87) { // w <-- not recommended
                _this.rotation[0] -= 1;
                _this.rotation[1] += 1;
                _this.rotation[2] += 1;
            }
            if (key == 83) { // s <-- not recommended
                _this.rotation[0] += 0;
                _this.rotation[1] -= 1;
                _this.rotation[2] -= 1;
            }
        };
        document.addEventListener("keydown", press);
    };
    axis.prototype.translate = function (x, rotate, center) {
        if (center === void 0) { center = this.center; }
        var minus = false;
        if (x < 0) {
            x = Math.abs(x);
            minus = true;
        }
        var c = x;
        var a = c * Math.sin(rotate * Math.PI / 180);
        var b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        if (minus) {
            b = -b;
            a = -a;
        }
        if (rotate <= 90) {
            return [b, a];
            //this.cnvs.line(center[0], center[1], center[0] + b, center[1] + a, "black");
        }
        else if (rotate > 90 && rotate <= 180) {
            return [-b, a];
        }
        else if (rotate > 180 && rotate <= 270) {
            return [-b, a];
        }
        else if (rotate > 270) {
            return [b, a];
        }
    };
    return axis;
}());
//this.cnvs.line(2550/2, 1440, 2550/2, 0, "white");
//this.cnvs.line(0, 1440/2, 2550, 1440/2, "white");
