"use strict"
/* set sizes for canvas and change they when user resized them */
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
function setSizes() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};
window.onresize = setSizes;
setSizes();
/* square-pixel */
class Square {
	constructor (x, y){
		this.width = 10;
		this.height = 10;
		this.x = x;
		this.y = y;
	};
	draw(){
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		console.log(`Экземпляр объекта ${this} перемещен`);
	}
}
class Ball extends Square{
	constructor(x, y){
		super(x, y);
		this.speedX = 30;
		this.speedY = 40;
	};
	move(){
		this.x += this.speedX;
		this.y += this.speedY;
		if ((this.x > canvas.width) || (this.x < 0)) this.speedX = -this.speedX;
		if ((this.y > canvas.height) || (this.y < 0)) this.speedY = -this.speedY;
	}
}
let ball = new Ball(600, 20);
let square = new Square(100, 100);
ball.draw();
square.draw();



setInterval (function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.move();
	ball.draw();
}, 10);
