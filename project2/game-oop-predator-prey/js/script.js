// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tigerImage;
let pigImage;
let bearImage;

let tiger;
let pig;
let bear;

// The three prey
let lollipopImage;
let candyImage;
let cottonImage;

let lollipop;
let candy;
let cotton;

// Add variable for font
let emilysCandy;

// preload()
//
// Preload pictures of the predators (the tiger, the pig and the bear),
// the preys (the lollipop, the candy and the cotton) and the background picture.

function preload() {
 tigerImage = loadImage("assets/images/tiger-Disney-tsum-tsum.png");
 pigImage = loadImage("assets/images/disney-tsum-tsum-piglet.png");
 bearImage = loadImage("assets/images/disney-tsum-tsum-clipart-winnie-the-pooh.png");
 lollipopImage = loadImage("assets/images/candy-lollipop.png");
 candyImage = loadImage("assets/images/clipart-candy-dulce-vector-png.png");
 cottonImage = loadImage("assets/images/cotton-candy-clipart.png");
 backdrop = loadImage("assets/images/gumball-machine.jpg");
 emilysCandy = loadFont("assets/images/Emilys_Candy/EmilysCandy-Regular.ttf");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1550,1800);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  pig = new Predator(100,100,15, color(150,150,150),30);
  bear = new Predator(100,100,20, color(120, 114, 97),45);
  lollipop = new Prey(100, 100, 10, color(255, 100, 10), 50);
  candy = new Prey(100, 100, 8, color(255, 255, 255), 60);
  cotton = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

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

  // Handle the tiger eating any of the prey
  tiger.handleEating(lollipop);
  tiger.handleEating(candy);
  tiger.handleEating(cotton);

  // Handle the pig eating any of the prey
  pig.handleEating(lollipop);
  pig.handleEating(candy);
  pig.handleEating(cotton);

  // Handle the bear eating any of the prey
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
