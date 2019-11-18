// Project 3 - Prototype 1
// Previous codes from Exercise 4, 5 and 7
// by Pippin Barr
// Modified and improved by Carole Chao
//
//
// Creates predators, preys and obstacles (of different sizes and speeds)
// The predator chase the preys using the arrows and keys to consume them.
// The predator loses health over time, so much keep eating to survive.

// Set variable for cars
let skyBlueCarImage;
let darkBlueImage;
let yellowCarImage;
let redCarImage;

let skyBlueCar;
let darkBlueCar;
let yellowCar;
let redCar;

// Set variables for the car tools and obstacles
let toolOneImage;
let toolTwoImage;
let toolThreeImage;
let toolFourImage;
let toolFiveImage;
let barriersImage;

let toolOne;
let toolTwo;
let toolThree;
let toolFour;
let toolFive;
let barriers;

// Add variables for font
let wallpoet;

// A variable for the car sounds & background music and sounds.
let carCrashSFX;
let bigCrashSFX;
let carIgnitionSFX;
let carFlyBySFX;
let edmBGM;

// A variable to add the start screen and ending screen.
let startGame = false;
let gamerOver = false;

// Add empty groups arrays for cars and tools
let vehiclesGroup = [];
let toolsGroups = [];
let obstacles = [];
let soundEffects = [];

// preload()
//
// Preload pictures of all the elements, images, background sound, font
// (the cars, the tools, the obstacle), the background pictures
// and background music & soundFX for the Start Screen, Play Screen and Game Over screen.

function preload(){
  //Preload cars Images
  skyBlueCarImage = loadImage("assets/images/Race-Car-PNG-Picture.png");
  darkBlueImage = loadImage("assets/images/car-racing-clipart-10.jpg.png");
  yellowCarImage = loadImage("assets/images/Race-Car-PNG-Clipart.png");
  redCarImage = loadImage("assets/images/Race-Car-PNG-HD.png");
  // Preload tool images
  toolOneImage = loadImage("assets/images/Tool1.png");
  toolTwoImage = loadImage("assets/images/tool2.png");
  toolThreeImage = loadImage("assets/images/tool3.png");
  toolFourImage = loadImage("assets/images/tool4.png");
  toolFiveImage = loadImage("assets/images/tool5.png");

  // Preload obstacle images
  barriers = loadImage("assets/images/clip-art-vector-construction.png");
  // Preload Background, font, sounds and music
  backdrop = loadImage("assets/images/F1-Track_backgroundimage.jpg");
  startScreenBackdrop = loadImage("assets/images/F1-Track_backgroundimage.jpg");
  endScreenBackdrop = loadImage("assets/images/Game-over-screen.jpg");
  wallpoet = loadFont("assets/images/Wallpoet/Wallpoet-Regular.ttf");
  // new Audio("assets/sounds/")
  carCrashSFX = new Audio("assets/sounds/car-crash1SFX.wav");
  bigCrashSFX = new Audio("assets/sounds/big-crash2SFX.wav");
  carIgnitionSFX = new Audio("assets/sounds/car-ignition-1SFX.wav");
  carFlyBySFX = new Audio("assets/sounds/v8-supercar-fly-bySFX.wav");
  edmBGM = new Audio("assets/sounds/generic-edm-loopBGM.wav");
}

// setup()
//
// Set up a canvas
// Creates objects for the the game (predator and preys)
// Set the text font and sound effects every time a Predator eats Prey

function setup(){
  createCanvas(1280,720);
// put the sound effects and the background music
  edmBGM.play();
  carCrashSFX.play();
  bigCrashSFX.play();
  carIgnitionSFX.play();
  carFlyBySFX.play();
  background(backdrop,0,0);
  textFont(wallpoet);
// put the cars in array groups
  skyBlueCar = new Vehicle(100,100,5,color(200,200,0),50, skyBlueCarImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16);
  darkBlueCar = new Vehicle(100,100,15,color(150,150,150), 50, darkBlueImage, 87, 83, 65, 68, 70);
  yellowCar = new Vehicle(100,100,10,color(120,120,97),50, yellowCarImage, 73, 75, 74, 76, 72);
  redCar = new Instrument(100,100,15,color(175,175,175),50,redCarImage);
// put the tools in array groups
  toolOne = new Instrument(100,100,14, color(255,100,10),25, toolOneImage);
  toolTwo = new Instrument(100,100,10, color(255,255,255),25, toolTwoImage);
  toolThre = new Instrument(100,100,17, color(255,255,0),25, toolThreeImage);
  toolFour = new Instrument(100,100,14, color(255,255,255),25, toolFourImage);
  toolFive = new Instrument(100,100,15, color(255,255,255),25, toolFiveImage);
  // barriers = new Obstacle(100,100,15,color(255,255,255),40, barriersImage);

}

// draw()
// Add the ability to start playing when Spacebar is pressed and change screens
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
// Add background image
background(backdrop,0,0);

// Handle input for the cars/predators
skyBlueCar.handleInput();
darkBlueCar.handleInput();
yellowCar.handleInput();
// redCar.handleInput();

// Move all the cars in the game
skyBlueCar.move();
darkBlueCar.move();
yellowCar.move();
redCar.move();

// Move all the tools and obstacle in the game
toolOne.move();
toolTwo.move();
// toolThree.move();
toolFour.move();
toolFive.move();
// barriers.move();


// Handle skyBlueCar to eat any type of tools + obstacle
skyBlueCar.handleEating(toolOne);
skyBlueCar.handleEating(toolTwo);
// skyBlueCar.handleEating(toolThree);
skyBlueCar.handleEating(toolFour);
skyBlueCar.handleEating(toolFive);

// skyBlueCar.handleEating(barriers);

// Handle darkBlueCar to eat any type of tools + obstacle
darkBlueCar.handleEating(toolOne);
darkBlueCar.handleEating(toolTwo);
// darkBlueCar.handleEating(toolThree);
darkBlueCar.handleEating(toolFour);
darkBlueCar.handleEating(toolFive);

// darkBlueCar.handleEating(barriers);

// Handle yellowCar to eat any type of tools + obstacle
yellowCar.handleEating(toolOne);
yellowCar.handleEating(toolTwo);
// yellowCar.handleEating(toolThree);
yellowCar.handleEating(toolFour);
yellowCar.handleEating(toolFive);

// yellowCar.handleEating(barriers);

// // Handle redCar to eat any type of tools + obstacle
// redCar.handleEating(toolOne);
// redCar.handleEating(toolTwo);
// // redCar.handleEating(toolThree);
// redCar.handleEating(toolFour);
// redCar.handleEating(toolFive);

// redCar.handleEating(barriers);

// Display all the elements on the screen
skyBlueCar.display();
darkBlueCar.display();
redCar.display();
yellowCar.display();
toolOne.display();
toolTwo.display();
// toolThree.display();
toolFour.display();
toolFive.display();
// barriers.display();
}
