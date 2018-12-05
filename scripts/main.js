"use strict"
let score = document.querySelector(".score");
let spanScore = document.querySelector(".score span");
let spanLives = document.querySelector(".lives span");
let isGameOver = false;
let scores = 0;
let lives = 3;
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
		this.speedY = 10;
	};
	move(){
		this.x += this.speedX;
		this.y += this.speedY;
		if ((this.x > canvas.width) || (this.x < 0)) this.speedX = -this.speedX;
		if (this.y < 0) this.speedY = -this.speedY;
		if (this.y > canvas.height)  {
			lives--;
			this.y = 0;
			if (lives<0) gameOver();
		}
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
function drawStarScreen(ctx){
	ctx.fillStyle = "green";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.textAlign = "center";
	ctx.font = "5rem sans-serif";
	ctx.fillStyle = "white";
	ctx.fillText ("Press SPACE or F5", canvas.width/2, canvas.height/2);
}
function startNewGame(){
		isGameOver = false;
		loop();
}
function gameOver(){
	isGameOver = true;
	lives = 3;
	score = 0;
	drawStarScreen(ctx);
}
function loop(){
	spanLives.textContent = lives;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	checkColission();
	ball.move();
	ball.draw();
	board.draw();
	if (!isGameOver) window.requestAnimationFrame(loop);
};
function checkColission(){
	if((ball.y + ball.height) >= board.y){
		if ( ((ball.x + ball.width) >= board.x) && ((ball.x + ball.width) <= (board.x + board.width)) ){
			ball.speedY = -ball.speedY;
			//ball.speedX += board.speedX;
		}
	}
}
let ball = new Ball(600, 20);
let board = new Board (100, 100, 200, 10);

canvas.addEventListener("mousemove", function (e) {
	board.x = e.clientX;
});
window.addEventListener("keypress", function(e){
	e.preventDefault();
	if ((e.code === "KeyA") && (board.x > 0)) {
		board.x -= board.speedX;
	} else if ((e.code === "KeyD") && (board.x + board.width < canvas.width)) {
		board.x += board.speedX;
	} else if ((e.code === "F5") || (e.code === "Space")) {
		startNewGame();
	}
	console.log(`e.key ${e.key} e.code ${e.code}`);
});

drawStarScreen(ctx);
