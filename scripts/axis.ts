class axis {
    public rotation: number[]; // [x, y, z]
    private cnvs: canvas;
    private center: number[] = [2550/2, 1440/2];
    constructor(cnvs: canvas = new canvas(document.getElementsByTagName("canvas")[0]), rotation: number[] = [20, 270, 110]) { // dimetric: [0, 270, 135], isometric [30, 270, 150], default [20, 270, 110]
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
        //this.spin_3(2); // static 3d object

    }
    private draw_axes(): void {
        this.draw_axis(this.rotation[0], this.center, "red"); // x
        this.draw_axis(this.rotation[1], this.center, "green"); // y
        this.draw_axis(this.rotation[2], this.center, "blue"); // z
    }
    private draw_axis(rotate: number, center: number[] = this.center, color: string = "black"): void {
        var a = 2550;
        if ( rotate != 270 && rotate != 90 ) { // cos 270 and 90 is 0; c would be infinite
            var c = a / Math.cos(rotate * Math.PI/180);
        } else if ( rotate == 90 ) {
            var c = a / -0.001; // c will never be perfect at 90 and 270 degrees but this should be close enough
        } else {
            var c = a / 0.001;
        }
        var b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        if ( rotate <= 90 ) {
            this.cnvs.line(center[0], center[1], 2550 + center[0], center[1] + b, color);
            //this.cnvs.line(center[0], center[1], -2550 + center[0], center[1] - b, color);
        } else if ( rotate > 90 && rotate <= 180 ) {
            this.cnvs.line(center[0], center[1], -2550 + center[0], center[1] + b, color);
            //this.cnvs.line(center[0], center[1], 2550 + center[0], center[1] - b, color);
        } else if ( rotate > 180 && rotate <= 270 ) {
            this.cnvs.line(center[0], center[1], -2550 + center[0], center[1] - b, color);
        } else {
            this.cnvs.line(center[0], center[1], 2550 + center[0], center[1] - b, color);
        }
    }
    public draw_figure(points: number[][], stroke: string = "black", fill: string = "rgba(0,0,0,0)"): void { // ex.: points = [[100, 100, 100], ...]; ([[x, y, z], ...])
        var temp: number[][] = [];
        for ( var i = 0; i < points.length; i ++ ) {
            var temp_2 = [ this.center[0] + this.translate(points[i][0], this.rotation[0])[0] + this.translate(points[i][1], this.rotation[1])[0] + this.translate(points[i][2], this.rotation[2])[0], this.center[1] + this.translate(points[i][0], this.rotation[0])[1] + this.translate(points[i][1], this.rotation[1])[1] + this.translate(points[i][2], this.rotation[2])[1] ];
            temp.push(temp_2);
        }
        this.cnvs.figure(temp, stroke, fill);
    }
    public spin(): void { // tests adding axes
        var r = 0;
        var step = 25;
        var center = [Math.floor(Math.random()*2550), Math.floor(Math.random()*1440)];
        var inter = setInterval(()=>{
            var rgb: string[] = [String(Math.floor(Math.random()*255)), String(Math.floor(Math.random()*255)), String(Math.floor(Math.random()*255))];
            this.draw_axis(r, center, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.5)");
            r += step;
            if ( r > 360 ) {
                r = 0;
                step /= 2;
                if ( step < 0.5 ) {
                    step = 25;
                    center = [Math.floor(Math.random()*2550), Math.floor(Math.random()*1440)];
                }
            }
        },1000/720);
    }
    public spin_2(): void { // tests translation
        this.cnvs.clear();
        var r = 0;
        var r2 = 270;
        var r3 = 135;
        var step = 1;
        var inter = setInterval(()=>{
            this.cnvs.clear();
            this.cnvs.line(0, 1440/2, 2550, 1440/2, "white");
            this.draw_axis(r, this.center, "red");
            this.cnvs.line(this.center[0] + 100, this.center[1], this.center[0] + this.translate(100, r)[0], this.center[1] + this.translate(100, r)[1]);
            this.cnvs.line(this.center[0] - 100, this.center[1], this.center[0] + this.translate(100, r)[0], this.center[1] + this.translate(100, r)[1]);

            this.cnvs.line(2550/2, 1440, 2550/2, 0, "white");
            this.draw_axis(r2, this.center, "green");
            this.cnvs.line(this.center[0], this.center[1] + 200, this.center[0] + this.translate(200, r2)[0], this.center[1] + this.translate(200, r2)[1]);
            this.cnvs.line(this.center[0], this.center[1] - 200, this.center[0] + this.translate(200, r2)[0], this.center[1] + this.translate(200, r2)[1]);

            this.draw_axis(135, this.center, "white");
            this.draw_axis(315, this.center, "white");
            this.draw_axis(r3, this.center, "blue");
            this.cnvs.line(this.center[0] + this.translate(200, 135)[0], this.center[1] + this.translate(200, 135)[1], this.center[0] + this.translate(300, r3)[0], this.center[1] + this.translate(300, r3)[1]);
            this.cnvs.line(this.center[0] + this.translate(-200, 135)[0], this.center[1] + this.translate(-200, 135)[1], this.center[0] + this.translate(300, r3)[0], this.center[1] + this.translate(300, r3)[1]);
            r += step;
            r2 += step;
            r3 += step;
            if ( r > 360 ) {
                r = 0;
            }
            if ( r2 > 360 ) {
                r2 = 0;
            }
            if ( r3 > 360 ) {
                r3 = 0;
            }
        },1000/720);
    }
    public spin_3(iteration: number = 1): void { // tests adding figures and rotation
        // change following variables to adjust spinnig
        var step = 0.2; // x
        var step2 = 0; // y
        var step3 = 0.2; // z
        var inter = setInterval(()=>{
            this.cnvs.clear();
            if ( iteration == 1 ) {
                this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, 100, 100], [-100, 100, 100]], "black", "rgba(255,0,0,0.1)"); // front
                this.draw_figure([[-100, -100, -100], [100, -100, -100], [100, 100, -100], [-100, 100, -100]], "black", "rgba(0,255,0,0.1)"); // back
                this.draw_figure([[-100, 100, 100], [100, 100, 100], [100, 100, -100], [-100, 100, -100]], "black", "rgba(0,0,255,0.1)"); // ceiling
                this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, -100, -100], [-100, -100, -100]], "black", "rgba(255,255,255,0.1)"); // floor
            } else if ( iteration == 2 ) {
                this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, -100, -100], [-100, -100, -100]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[-100, -100, 100], [100, -100, 100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[100, -100, -100], [-100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[100, -100, 100], [100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[-100, -100, 100], [-100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
            } else if ( iteration == 3 ) {
                this.draw_figure([[-100, -100, 100], [100, -100, 100], [100, -100, -100], [-100, -100, -100]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[-100, -100, 100], [100, -100, 100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[100, -100, -100], [-100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[100, -100, 100], [100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                this.draw_figure([[-100, -100, 100], [-100, -100, -100], [0, 100, 0]], "black", "rgba(255,255,255,0.5)");
                step = 0, step2 = 0, step3 = 0;
            }
            this.draw_figure([[-20, -20, 20], [20, -20, 20], [20, 20, 20], [-20, 20, 20]], "black");
            this.draw_figure([[-20, -20, -20], [20, -20, -20], [20, 20, -20], [-20, 20, -20]], "black");
            this.draw_figure([[-20, 20, 20], [20, 20, 20], [20, 20, -20], [-20, 20, -20]], "black");
            this.draw_figure([[-20, -20, 20], [20, -20, 20], [20, -20, -20], [-20, -20, -20]], "black");

            this.draw_axis(this.rotation[0], this.center, "red");

            this.draw_axis(this.rotation[1], this.center, "green");

            this.draw_axis(this.rotation[2], this.center, "blue");
            this.rotation[0] += step;
            this.rotation[1] += step2;
            this.rotation[2] += step3;
            if ( this.rotation[0] > 360 ) {
                this.rotation[0] = 0;
            }
            if ( this.rotation[1] > 360 ) {
                this.rotation[1] = 0;
            }
            if ( this.rotation[2] > 360 ) {
                this.rotation[2] = 0;
            }
            if ( this.rotation[0] < 0 ) {
                this.rotation[0] = 359;
            }
            if ( this.rotation[1] < 0 ) {
                this.rotation[1] = 359;
            }
            if ( this.rotation[2] < 0 ) {
                this.rotation[2] = 359;
            }
        },1000/60);
        var press = (event):void => {
            var key = event.keyCode;
            console.log(key);
            if ( key == 65 ) { // a
                this.rotation[0] += 1;
                this.rotation[2] += 1; 
            }
            if ( key == 68 ) { // d
                this.rotation[0] -= 1;
                this.rotation[2] -= 1; 
            }
            if ( key == 81 ) { // q <-- not recommended
                this.rotation[0] -= 1;
                this.rotation[1] -= 1;
                this.rotation[2] -= 0; 
            }
            if ( key == 87 ) { // w <-- not recommended
                this.rotation[0] -= 1;
                this.rotation[1] += 1;
                this.rotation[2] += 1; 
            }
            if ( key == 83 ) { // s <-- not recommended
                this.rotation[0] += 0;
                this.rotation[1] -= 1;
                this.rotation[2] -= 1; 
            }
        }
        document.addEventListener("keydown", press);
    }
    public translate(x: number, rotate: number, center: number[] = this.center): number[] {
        var minus = false;
        if ( x < 0 ) {
            x = Math.abs(x);
            minus = true;
        }
        var c = x;
        var a = c * Math.sin(rotate * Math.PI/180);
        var b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        if ( minus ) {
            b = -b;
            a = -a;
        }
        if ( rotate <= 90 ) {
            return [b, a];
        } else if ( rotate > 90 && rotate <= 180 ) {
            return [-b, a];
        } else if ( rotate > 180 && rotate <= 270 ) {
            return [-b, a];
        } else if ( rotate > 270 ) {
            return [b, a];
        }
    }
}