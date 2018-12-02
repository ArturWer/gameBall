"use strict"
let canvas = document.querySelector("canvas");

function setSizes() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

};
window.onresize = setSizes;
setSizes();
