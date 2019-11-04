// Predator-Prey Simulation
// by Pippin Barr
// Modified by Carole Chao
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our Creatures
let tigerImage;
let pigImage;
let bearImage;

let tiger;
let pig;
let bear;

// The three sweets
let lollipopImage;
let candyImage;
let cottonImage;

let lollipop;
let candy;
let cotton;

// Add variable for font
let emilysCandy;

// A variable to hold the candy wrap sound we will play everytime a creature
// eats a candy
let crinkleSFX;

// preload()
//
// Preload pictures of the creatures (the tiger, the pig and the bear),
// the sweets (the lollipop, the candy and the cotton) and the background picture.

function preload() {
 tigerImage = loadImage("assets/images/tiger-Disney-tsum-tsum.png");
 pigImage = loadImage("assets/images/disney-tsum-tsum-piglet.png");
 bearImage = loadImage("assets/images/disney-tsum-tsum-clipart-winnie-the-pooh.png");
 lollipopImage = loadImage("assets/images/candy-lollipop.png");
 candyImage = loadImage("assets/images/clipart-candy-dulce-vector-png.png");
 cottonImage = loadImage("assets/images/cotton-candy-clipart.png");
 backdrop = loadImage("assets/images/gumball-machine.jpg");
 emilysCandy = loadFont("assets/images/Emilys_Candy/EmilysCandy-Regular.ttf");
 crinkleSFX = new Audio("assets/sounds/candy-wrapper-crinkle.wav");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1033,1200);
  textFont(emilysCandy);
  crinkleSFX.play();
  tiger = new Creatures(100, 100, 5, color(200, 200, 0), 40, tigerImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16); // press Shift key to sprint);
  pig = new Creatures(100,100,15, color(150,150,150),30, pigImage, 87, 83, 65, 68, 70); // press F to sprint);
  bear = new Creatures(100,100,20, color(120, 114, 97),45, bearImage, 73, 75, 74, 76, 72); // press H key to sprint);
  lollipop = new Sweets(100, 100, 10, color(255, 100, 10), 50, lollipopImage);
  candy = new Sweets(100, 100, 8, color(255, 255, 255), 60, candyImage);
  cotton = new Sweets(100, 100, 20, color(255, 255, 0), 10, cottonImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Add background image of gumball machine
  background(backdrop,0,0);

  // Handle input for the tiger
  tiger.handleInput();
  pig.handleInput();
  bear.handleInput();

  // Move all the "animals"
  tiger.move();
  pig.move();
  bear.move();
  lollipop.move();
  candy.move();
  cotton.move();

  // Handle the tiger eating any of the Sweets
  tiger.handleEating(lollipop);
  tiger.handleEating(candy);
  tiger.handleEating(cotton);

  // Handle the pig eating any of the Sweets
  pig.handleEating(lollipop);
  pig.handleEating(candy);
  pig.handleEating(cotton);

  // Handle the bear eating any of the Sweets
  bear.handleEating(lollipop);
  bear.handleEating(candy);
  bear.handleEating(cotton);

  // Display all the "animals"
  tiger.display();
  pig.display();
  bear.display();
  lollipop.display();
  candy.display();
  cotton.display();
}
