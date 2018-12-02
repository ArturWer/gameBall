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
	constructor (){
		this.width = 10;
		this.height = 10;
	};
	draw(x, y){
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, this.width, this.height);
	}
}
class Ball extends Square{
	constructor(){
		super();
		this.speedX = 3;
		this.speedY = 4;
	}
}
let squarePixel = new Ball;
for (let i = 0; i < 100; i++) {
	setInterval (function(){
		squarePixel.draw(10+i*10,200);
	}, 3000);
}
