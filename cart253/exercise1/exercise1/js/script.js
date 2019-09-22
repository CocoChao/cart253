// Exercise 1 - Movement
// Carole Chao
//
// Starter code for exercise 1.
// Draws a moving image and shapes that intersect
// in the middle of the canvas.
// * = teacher's example

//*The current position and size of the circle
//*let circleX;
//*let circleY;
//*let circleSize = 100;


//*The current position and size of the square
//*let squareX;
//*let squareY;
//*let squareSize = 100;

// Declare variables for the clown image
let exampleImageX = -100;
let exampleImageY = 0;
let exampleImage;
let rectY = -100;
let rectX = 0;
let randomNumber = random(0,50);

// preload()
//
// Preload the clown image

function preload() {
exampleImage = loadImage ("assets/images/clown.png");

}

// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Set my canvas size
  createCanvas(640,640);

  //*Start the circle off screen to the bottom left
  //*We divide the size by two because we're drawing from the center
  //*circleX = -circleSize/2;
  //*circleY = height + circleSize/2;

  //*Start the square off screen to the bottom right
  //*We divide the size by two because we're drawing from the center
  //*squareX = width + squareSize/2;
  //*squareY = height + squareSize/2;

  //*We'll draw rectangles from the center
  //*rectMode(CENTER);
  //*We won't have a stroke in this
  //*noStroke();


// My blue-sky background and the orange square at the top left corner of the canvas

  fill(200,200,200,10);
  stroke(100,0,0);
  background(145,200,639);

// Added image of clown at the top left corner of the canvas
  image(exampleImage,0,0,100,100);
  
// Square starts moving in the middle
  rectX = width/2;
  rectY= height;
}

// draw()
// Change the circle and image positions so they move
// Draw the circle and image on screen

function draw() {
   //*We don't fill the background so we get a drawing effect

  //*Move circle up and to the right
  //*circleX += 1;
  //*circleY -= 1;
  //*Make the circle transparent red
  //*fill(255,0,0,10);
  //*Display the circle
  //*ellipse(circleX,circleY,circleSize,circleSize);

  //*Move square up and to the left
  //*squareX -= 1;
  //*squareY -= 1;
  //*Make the square transparent blue
  //*fill(0,0,255,10);
  //*Display the square
  //*rect(squareX,squareY,squareSize,squareSize);

// Added shape, make the square with the red outline
// transparent to orange follow my mouse
  fill(200,159,80,10);
  rect(mouseX,mouseY,100,100);

// Move the square from down up
  rectX += random(0,50);
  rectY -+ 1;
  rect(rect,rectX,rectY);
  
// Move the clown image jiggling from left to right
  exampleImageX += random(0,50);
  exampleImageY += random(0,50);
  image(exampleImage,exampleImageX,exampleImageY);
}
