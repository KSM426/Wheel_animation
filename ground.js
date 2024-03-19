const DENSITY = 40;

export class Ground{
    constructor() {
        this.wheel;
        this.length;
        this.y;
    }

    resize(w, h, y) {
        this.stageWidth = w;
        this.stageHeight = h;
        this.y = y;
        this.length = this.stageWidth * 2;
        this.left = - this.length / 4;
        this.right = this.length / 4 * 3;

        this.points = [];
        this.dis = this.length / (DENSITY+1);
        for(let i=0; i<DENSITY; i++) {
            this.points[i] = {
                x: this.left + this.dis * (i+1),
                y: this.y + Math.random() * 3 - 1.5,
            };
        }
    }

    animate(ctx, r, a) {
        ctx.save();

        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.left, this.y);
        for(let i=0; i<DENSITY; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.lineTo(this.right, this.y);
        ctx.stroke();

        ctx.restore();

        this.move(r, a);
    }

    move(radius, angle) {
        for(let i=DENSITY-1; i>=0; i--) {
            this.points[i].x -= radius * angle;
            if(this.points[i].x > this.right) {
                let tmp = this.points.pop();
                tmp.x -= this.length;
                this.points.unshift(tmp);
            }
            console.log(this.points);
        }
    }
}