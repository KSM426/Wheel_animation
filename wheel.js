import { Ground } from "./ground.js";

const PI = Math.PI;
const AC = -PI * 0.025;
const V0 = - PI * 0.01;
const VY0 = -60;

export class Wheel {
    constructor() {
        this.radius;
        this.theta = 0;
        this.v0 = V0;
        this.omega = 0; // - PI * 0.08;
        this.center;
        this.jumpFlag = 0;
        
        this.vy = 0;

        this.ground = new Ground();

        window.addEventListener('click', this.click.bind(this));
    }

    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;

        this.center = {
            x: this.stageWidth / 2,
            y: this.stageHeight / 8 * 5,
        };

        this.centerFix = {
            x: this.stageWidth / 2,
            y: this.stageHeight / 8 * 5,
        };

        this.radius = this.stageHeight < this.stageWidth * 1.5 ? this.stageHeight / 7 : this.stageWidth / 4;
        this.radiusS = this.radius / 12;
        this.width = this.radius / 10;
        this.groundY = this.center.y + this.radius + this.width;

        this.ground.resize(this.stageWidth, this.stageHeight, this.groundY);
    }

    animate(ctx) {
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(this.theta);

        
        ctx.lineWidth = this.width / 2;
        ctx.strokeStyle = 'rgba(88, 40, 16, 1)';
        
        ctx.beginPath();
        ctx.moveTo( - this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.radius * Math.cos(PI / 3 * 2), this.radius * Math.sin(PI / 3 * 2));
        ctx.lineTo(this.radius * Math.cos( - PI / 3), this.radius * Math.sin( - PI / 3));
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.radius * Math.cos( - PI / 3 * 2), this.radius * Math.sin( - PI / 3 * 2));
        ctx.lineTo(this.radius * Math.cos( PI / 3), this.radius * Math.sin(PI / 3));
        ctx.closePath();
        ctx.stroke();
        
        // ctx.beginPath();
        // ctx.moveTo( - this.radius, 0);
        // ctx.lineTo(this.radius * Math.cos( - PI / 3 * 2), this.radius * Math.sin( - PI / 3 * 2));
        // ctx.lineTo(this.radius * Math.cos( - PI / 3), this.radius * Math.sin( - PI / 3));
        // ctx.lineTo(this.radius, 0);
        // ctx.lineTo(this.radius * Math.cos( PI / 3), this.radius * Math.sin(PI / 3));
        // ctx.lineTo(this.radius * Math.cos(PI / 3 * 2), this.radius * Math.sin(PI / 3 * 2));
        // ctx.closePath();
        // ctx.stroke();
        
        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.arc(0, 0, this.radiusS, 0, PI*2);
        ctx.fill();
        ctx.closePath();
        
        ctx.lineWidth = this.width;

        ctx.strokeStyle = 'rgba(149, 83, 27, 1)';        
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius, 0, 0, PI*2);
        ctx.closePath();
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(40, 40, 40, 1)';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius + this.width/2, this.radius + this.width/2, 0, 0, PI*2);
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
        
        this.move();

        this.ground.animate(ctx, this.radius, this.angularV);
    }
    
    move() {
        this.angularV = this.v0 + this.omega;
        this.omega *= 0.985;
        this.theta += this.angularV;

        this.center.y += this.vy;
        if(this.jumpFlag == 1) this.vy += this.vy < 0 ? 5:3;
        if(this.center.y > this.centerFix.y) {
            this.jumpFlag = 0;
            this.vy = 0;
            this.center.y = this.centerFix.y;
        }

    }

    angle() {
        return this.angularV;
    }

    click(e) {
        if(e.y > this.groundY) {
            this.omega += AC;
        } else {
            if(this.jumpFlag == 0) this.jump();
        }
    }

    jump() {
        this.vy = VY0;
        this.jumpFlag = 1;
    }
}