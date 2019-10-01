//Ex1: Added shape moving left to right"
//Carole Chao

//preload()
//Add an image of a clown

let circle = {
  x: 0,
  y: 0,
  size:500
};

function setup() {
  createCanvas(500,500);
}

function draw() {
  ellipse(circle.x, circle.y, circle.size);
}
