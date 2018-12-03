"use strict"
let score = document.querySelector(".score");
let spanScore = document.querySelector(".score span");
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
		this.speedX = 50;
		this.y = canvas.height - this.height*2;
	};
	draw(){
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
function loop(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.move();
	ball.draw();
	board.draw();
	window.requestAnimationFrame(loop);
};

let ball = new Ball(600, 20);
let board = new Board (100, 100, 200, 10);
ball.draw();

canvas.addEventListener("mousemove", function (e) {
	board.x = e.clientX;
});
window.addEventListener("keypress", function(e){
	e.preventDefault();
	if ((e.code === "KeyA") && (board.x > 0)) {
		board.x -= board.speedX;
	} else if ((e.code === "KeyD") && (board.x + board.width < canvas.width)) {
		board.x += board.speedX;
	}
	console.log(`e.key ${e.key} e.code ${e.code}`);
});
loop();
