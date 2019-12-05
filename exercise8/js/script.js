// Project 3 - Prototype 1
// Previous codes from Exercise 4, 5, 7 and project 2
// by Pippin Barr
// Modified and improved by Carole Chao
//
//
// Creates predators, preys and obstacles (of different sizes and speeds)
// The predator chase the preys using the arrows and keys to consume them.
// The predator loses health over time, so much keep eating to survive.
// Adds music and sounds effects when player plays the game

// Set variable for cars
let skyBlueCarImage;
let yellowCarImage;
let redCarImage;

// Set variables for the car tools and obstacles
let toolOneImage;
let toolTwoImage;
let toolThreeImage;
let toolFourImage;
let toolFiveImage;

// Add variables for font
let wallpoet;

// A variable for the car sounds & background music and sounds.
let carCrashSFX;
let bigCrashSFX;
let carIgnitionSFX;
let carFlyBySFX;
let edmBGM;

// A variable to add the start screen and ending screen.
let gameState = 0; //game is active

// Add empty groups arrays for cars and tools
let vehiclesGroup = [];
let toolsGroup = [];

// preload()
//
// Preload pictures of all the elements, images, background sound, font
// (the cars, the tools, the obstacle), the background pictures
// and background music & soundFX for the Start Screen, Play Screen and Game Over screen.

function preload(){
  //Preload cars Images
  skyBlueCarImage = loadImage("assets/images/Race-Car-PNG-Picture.png");
  yellowCarImage = loadImage("assets/images/Race-Car-PNG-Clipart.png");
  redCarImage = loadImage("assets/images/Race-Car-PNG-HD.png");
  // Preload tool images
  toolOneImage = loadImage("assets/images/Tool1.png");
  toolTwoImage = loadImage("assets/images/tool2.png");
  toolThreeImage = loadImage("assets/images/tool3.png");
  toolFourImage = loadImage("assets/images/tool4.png");
  toolFiveImage = loadImage("assets/images/tool5.png");

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
  vehiclesGroup[0] = new Vehicle(100,100,10,color(200,200,0),50, skyBlueCarImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16);
  vehiclesGroup[1] = new Vehicle(100,100,10,color(120,120,97),50, yellowCarImage, 73, 75, 74, 76, 72);
  vehiclesGroup[2] = new Vehicle(100,100,10,color(175,175,175),50, redCarImage, 87, 83, 65, 68);
// put the tools in array groups
  toolsGroup[0] = new Instrument(100,100,14, color(255,100,10),25, toolOneImage);
  toolsGroup[1] = new Instrument(100,100,10, color(255,255,255),25, toolTwoImage);
  toolsGroup[2]= new Instrument(100,100,17, color(255,255,0),25, toolThreeImage);
  toolsGroup[3] = new Instrument(100,100,14, color(255,255,255),25, toolFourImage);
  toolsGroup[4] = new Instrument(100,100,15, color(255,255,255),25, toolFiveImage);
}

// draw()
// Add the ability to start playing when Spacebar is pressed and change screens
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

if (gameState === 1){
// Add background image
background(backdrop,0,0);

// Handle input for the cars/predators
vehiclesGroup[0].handleInput();
vehiclesGroup[1].handleInput();
vehiclesGroup[2].handleInput();

// Move all the cars in the game
vehiclesGroup[0].move();
vehiclesGroup[1].move();
vehiclesGroup[2].move();

// Move all the tools and obstacle in the game
toolsGroup[0].move();
toolsGroup[1].move();
toolsGroup[2].move();
toolsGroup[3].move();
toolsGroup[4].move();

// Handle skyBlueCar to eat any type of tools + obstacle
vehiclesGroup[0].handleEating(toolsGroup[0]);
vehiclesGroup[0].handleEating(toolsGroup[1]);
vehiclesGroup[0].handleEating(toolsGroup[2]);
vehiclesGroup[0].handleEating(toolsGroup[3]);
vehiclesGroup[0].handleEating(toolsGroup[4]);

// Handle yellowCar to eat any type of tools + obstacle
vehiclesGroup[1].handleEating(toolsGroup[0]);
vehiclesGroup[1].handleEating(toolsGroup[1]);
vehiclesGroup[1].handleEating(toolsGroup[2]);
vehiclesGroup[1].handleEating(toolsGroup[3]);
vehiclesGroup[1].handleEating(toolsGroup[4]);

// Handle redCar to eat any type of tools + obstacle
vehiclesGroup[2].handleEating(toolsGroup[0]);
vehiclesGroup[2].handleEating(toolsGroup[1]);
vehiclesGroup[2].handleEating(toolsGroup[2]);
vehiclesGroup[2].handleEating(toolsGroup[3]);
vehiclesGroup[2].handleEating(toolsGroup[4]);

// Display all the elements on the screen
vehiclesGroup[0].display();
vehiclesGroup[1].display();
vehiclesGroup[2].display();
toolsGroup[0].display();
toolsGroup[1].display();
toolsGroup[2].display();
toolsGroup[3].display();
toolsGroup[4].display();
checkGameOver();
} else {
  // Start Screen image of F1 Themed backgrund with Game instructions and title
  background(startScreenBackdrop,0,0);
  fill(277,101,91);
  textSize(75);
  textAlign(CENTER);
  text("F1 MONTREAL GRAND PRIX", width /2, height/2);
  textSize(30);
  textAlign(CENTER);
  text("Presse SPACEBAR to play.", width /2, height/2 +50);
  text("Use keys Up, Down, Right, Left to move the sky blue car.", width / 2, height / 2 + 100);
  text("Use keys WASD to move the dark blue car.", width / 2, height / 2 + 150);
  text("Use keys IJKL to move the yellow car.\n GOOD LUCK!.", width / 2, height / 2 + 200);
} if (gameState === 2){
  // Display the inside of a garage as background image and Game Over text
  fill(227, 200, 102);
  textFont(wallpoet);
  textSize(45);
  textStyle(BOLD);
  textAlign(CENTER,CENTER);
  image(endScreenBackdrop,0,0,width,height);

  // Set up the text to display with array groups with each player's score
  let gameOverText = "GAME OVER\n";
  gameOverText = gameOverText + "sky blue car upgraded " + vehiclesGroup[0].score + " times\n";
  gameOverText = gameOverText + "dark blue car upgraded " + vehiclesGroup[1].score + " times\n";
  gameOverText = gameOverText + "yellow car upgrated " + vehiclesGroup[2].score + " times\n";
// Display it in the center of the screen
text(gameOverText,width/2,height/2);
  }
}

// Start playing when pressing Spacebar
function keyPressed(){
  if (keyCode == 32){
    gameState = 1;
  }
}

// Show game over screen when predator dies with array groups
function checkGameOver() {
  if(vehiclesGroup[0].health === 0 && vehiclesGroup[1].health === 0 && vehiclesGroup[2].health === 0){
    gameState = 2;
  }
}
// Click anywhere on the screen to restart the game
function mousePressed(){
  gameState=0;
  setup();
}
