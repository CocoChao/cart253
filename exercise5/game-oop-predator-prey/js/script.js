// Predator-Prey Simulation
// by Pippin Barr
// Modified by Carole Chao
//
// Creates three predators and three preys (of different sizes and speeds)
// The predators chases the prey using the arrow keys and consumes them.
// The predators loses health over time, so must keep eating to survive.

// Our predators
let tiger;
let leopard;
let bear;

// The three prey
let antelope;
let zebra;
let bee;

// Add a variable to keep score
let score = 0;
// Add variable for the font
let quicksand;


// preload()
//
// Preload pictures of the predators (the tiger, the leopard and the bear)
// and background picture.

function preload() {
 tigerPredator = loadImage("assets/images/tiger_emoji.jpg");
 leopardPredator = loadImage("assets/images/leopard_emoji.png");
 bearPredator = loadImage("assets/images/teddy_bear_emoji.png");
 backdrop = loadImage("assets/images/background_image_bedtop.jpg");
 quicksand = loadFont("assets/quicksand/static/Quicksand-Medium.ttf");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1008,1008);
  textFont(quicksand);
  tiger = new firstPredator(100, 100, 5, color(204, 159, 69), 40);
  leopard = new secondPredator(100, 100, 15, color(200, 175, 175), 35);
  bear = new thirdPredator(100, 100, 25, color(120, 114, 97), 45);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(backdrop,0,0);

  // Handle input for the predators
  tiger.handleInput();
  leopard.handleInput();
  bear.handleInput();


  // Move all the "animals"
  tiger.move();
  leopard.move();
  bear.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Handle the leopard eating any of the prey
  leopard.handleEating(antelope);
  leopard.handleEating(zebra);
  leopard.handleEating(bee);

  // Handle the bear eating any of the prey
  bear.handleEating(antelope);
  bear.handleEating(zebra);
  bear.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  leopard.display();
  bear.display();
  antelope.display();
  zebra.display();
  bee.display();
}
