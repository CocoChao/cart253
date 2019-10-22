// Predator-Prey Simulation
// by Pippin Barr
// Modified by Carole Chao
//
// Creates three predators and three preys (of different sizes and speeds)
// The predators chases the prey using the arrow keys and consumes them.
// The predators loses health over time, so must keep eating to survive.

// Our predators
let tigerImage;
let leopardImage;
let bearImage;

let tiger;
let leopard;
let bear;

// The three prey
let antelopeImage;
let zebraImage;
let beeImage;

let antelope;
let zebra;
let bee;

// Add variable for the font
let quicksand;


// preload()
//
// Preload pictures of the predators (the tiger, the leopard and the bear),
// the preys (the antelope, the zebra and the bee) and the background picture.

function preload() {
 tigerImage = loadImage("assets/images/tiger_emoji.png");
 leopardImage = loadImage("assets/images/leopard_emoji.png");
 bearImage = loadImage("assets/images/teddy_bear_emoji.png");
 antelopeImage = loadImage("assets/images/antelope_toy.png");
 zebraImage = loadImage("assets/images/zebra_toy.png");
 beeImage = loadImage("assets/images/bee_toy.png");
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
  tiger = new firstPredator(100, 100, 5, color(204, 159, 69), 40, tigerImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16); // press Shift key to sprint
  leopard = new firstPredator(100, 100, 15, color(200, 175, 175), 35, leopardImage, 87, 83, 65, 68, 70); // press F to sprint
  bear = new firstPredator(100, 100, 25, color(120, 114, 97), 45, bearImage, 73, 75, 74, 76, 72); // press H key to sprint
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50, antelopeImage);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60, zebraImage);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10, beeImage);
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
