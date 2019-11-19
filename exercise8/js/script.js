// Project 3 - Prototype 1
// Previous codes from Exercise 4, 5, 7 and project 2
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

// Set variables for the car tools and obstacles
let toolOneImage;
let toolTwoImage;
let toolThreeImage;
let toolFourImage;
let toolFiveImage;
let barriersImage;


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
  barriersImage = loadImage("assets/images/clip-art-vector-construction.png");
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
  vehiclesGroup[0] = new Vehicle(100,100,5,color(200,200,0),50, skyBlueCarImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16);
  vehiclesGroup[1] = new Vehicle(100,100,15,color(150,150,150), 50, darkBlueImage, 87, 83, 65, 68, 70);
  vehiclesGroup[2] = new Vehicle(100,100,10,color(120,120,97),50, yellowCarImage, 73, 75, 74, 76, 72);
  vehiclesGroup[3] = new Instrument(100,100,15,color(175,175,175),50, redCarImage);
// put the tools in array groups
  toolsGroups[0] = new Instrument(100,100,14, color(255,100,10),25, toolOneImage);
  toolsGroups[1] = new Instrument(100,100,10, color(255,255,255),25, toolTwoImage);
  toolsGroups[2]= new Instrument(100,100,17, color(255,255,0),25, toolThreeImage);
  toolsGroups[3] = new Instrument(100,100,14, color(255,255,255),25, toolFourImage);
  toolsGroups[4] = new Instrument(100,100,15, color(255,255,255),25, toolFiveImage);
  // barriers = new Obstacle(100,100,15,color(255,255,255),40, barriersImage);

}

// draw()
// Add the ability to start playing when Spacebar is pressed and change screens
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

if (startGame === true){
// Add background image
background(backdrop,0,0);

// Handle input for the cars/predators
vehiclesGroup[0].handleInput();
vehiclesGroup[1].handleInput();
vehiclesGroup[2].handleInput();
// vehiclesGroup[3].handleInput();

// Move all the cars in the game
vehiclesGroup[0].move();
vehiclesGroup[1].move();
vehiclesGroup[2].move();
vehiclesGroup[3].move();

// Move all the tools and obstacle in the game
toolOne.move();
toolTwo.move();
// toolThree.move();
toolFour.move();
toolFive.move();
// barriers.move();


// Handle skyBlueCar to eat any type of tools + obstacle
vehiclesGroup[0].handleEating(toolOne);
vehiclesGroup[0].handleEating(toolTwo);
// skyBlueCar.handleEating(toolThree);
vehiclesGroup[0].handleEating(toolFour);
vehiclesGroup[0].handleEating(toolFive);

// skyBlueCar.handleEating(barriers);

// Handle darkBlueCar to eat any type of tools + obstacle
vehiclesGroup[1].handleEating(toolOne);
vehiclesGroup[1].handleEating(toolTwo);
// darkBlueCar.handleEating(toolThree);
vehiclesGroup[1].handleEating(toolFour);
vehiclesGroup[1].handleEating(toolFive);

// vehiclesGroup[1].handleEating(barriers);

// Handle yellowCar to eat any type of tools + obstacle
vehiclesGroup[2].handleEating(toolOne);
vehiclesGroup[2].handleEating(toolTwo);
// yellowCar.handleEating(toolThree);
vehiclesGroup[2].handleEating(toolFour);
vehiclesGroup[2].handleEating(toolFive);

// yellowCar.handleEating(barriers);

// Handle redCar to eat any type of tools + obstacle
// vehiclesGroup[3].handleEating(toolOne);
// vehiclesGroup[3].handleEating(toolTwo);
// vehiclesGroup[3].handleEating(toolThree);
// vehiclesGroup[3].handleEating(toolFour);
// vehiclesGroup[3].handleEating(toolFive);

// vehiclesGroup[3].handleEating(barriers);

// Display all the elements on the screen
vehiclesGroup[0].display();
vehiclesGroup[1].display();
vehiclesGroup[3].display();
vehiclesGroup[2].display();
toolOne.display();
toolTwo.display();
// toolThree.display();
toolFour.display();
toolFive.display();
// barriers.display();
} else {
  // STart Screen image of F1 Themed backgrund with Game instructions and title
  background(startScreenBackdrop,0,0);
  fill(277,101,91);
  textSize(75);
  textAlign(CENTER);
  text("F1 MONTREAL GRAND PRIX", width /2, height/2);
  textSize(30);
  textAlign(CENTER);
  text("Presse SPACEBAR to play.", width /2, height/2 +50);
  text("Use keys Up, Down, Right, Left to move the sky blue car.", width / 2, height / 2 + 100);
  text("Use keys W, A, S, D to move the dark blue car.", width / 2, height / 2 + 150);
  text("Use keys I, J, K, L to move the yellow car.\n GOOD LUCK!.", width / 2, height / 2 + 200);
  } if (gameOver === true){
  // Display the inside of a garage as background image and Game Over text
  fill(93,62,120);
  textFont(wallpoet);
  textSize(45);
  textStyle(BOLD);
  textAlign(CENTER,CENTER);
  image(endScreenBackdrop,0,0);

  // Set up the text to display with array groups with each player's score
  let gameOverText = "GAME OVER\n";
  gameOverText = gameOverText + "sky blue car upgraded" + vehiclesGroup[0].score + "times\n";
  gameOverText = gameOverText + "dark blue car upgraded" + vehiclesGroup[1].score + "times\n";
  gameOverText = gameOverText + "yellow car upgrated" + vehiclesGroup[2].score + "times\n";
// Display it in the center of the screen
text(gameOverText,width/2,height/2);
  }
}

// Start playing when pressing Spacebar
function keyPressed(){;
  if (keyCode == 32){
    startGame = true;
  }
}

// Show game over screen when predator dies with array groups
function checkGameOver() {
  if(vehiclesGroup[0].health === 0 && vehiclesGroup[1].health === 0 && vehiclesGroup[2].health === 0){
    gameOver = true;
  }
}
