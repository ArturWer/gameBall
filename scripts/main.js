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
	}
}
class Ball extends Square{
	constructor(x, y){
		super(x, y);
		this.speedX = 10;
		this.speedY = 20;
	};
	move(){
		this.x += this.speedX;
		this.y += this.speedY;
		if ((this.x > canvas.width) || (this.x < 0)) this.speedX = -this.speedX;
		if ((this.y > canvas.height) || (this.y < 0)) this.speedY = -this.speedY;
	}
}
class Board {
	constructor(x, y, width, height){
		this.x = x;
		this.width = width;
		this.height = height;
		this.y = canvas.height - this.height*2;
	};
	draw(){
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
let ball = new Ball(600, 20);
let board = new Board (100, 100, 200, 10);
ball.draw();

setInterval (function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.move();
	ball.draw();
	board.draw();
}, 10);
