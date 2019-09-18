//Ex1: Added shape moving left to right"
//Carole Chao

//preload()
//Add an image of a clown

let exampleImageX = 150;
let exampleImageY = 150;

//preload()
//Add an image of a clown

let exampleImage;

function preload() {

  exampleImage = loadImage ("assets/images/clown.png");

}

//setup()
//set the image size and place in the canvas

let x;
let y;
let speed;

function setup() {
  createCanvas(500,500);
  background(150,150,150);
  frameRate(30);
  image(exampleImage,0,0,150,150);
  x = width / 2;
  y = height;

}

// draw()
// Make the clown move from left to right in the canvas

function draw() {

// Jiggling randomly on the horizontal axis
y = y + random(-1, 1);
exampleImageX += 25 ;

}
