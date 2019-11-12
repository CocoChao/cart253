// Project 3 - Prototype 1
// Previous code from Exercise 5
// by Pippin Barr
// Modified by Carole Chao
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
let toolSixImage;
let toolSevenImage;
let toolEightImage;
let toolNineImage;
let barriersImage;

let toolOne;
let toolTwo;
let toolThree;
let toolFour;
let toolFive;
let toolSix;
let toolSeven;
let toolEight;
let toolNine;
let barriers;

// Add variables for font


// A variable for the car sounds & background music and sounds.


// A variable to add the start screen and ending screen.
let startGame = false;
let gamerOver = false;

// Add empty groups arrays for cars and tools
let VehiclesGroup = [];
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
  darkBlueImage = loadImage("assets/images/car-racing-clipart-10.jpg");
  yellowCarImage = loadImage("assets/images/Race-Car-PNG-Clipart.png");
  redCarImage = loadImage("assets/images/Race-Car-PNG-HD.png");
  // Preload tool images
  toolOneImage = loadImage("assets/images/Tool1.png");
  toolTwoImage = loadImages("assets/images/tool2.png");
  toolThreeImage = loadImages("assets/images/tool3.png");
  toolFourImage = loadImage("assets/images/tool4.png");
  toolFiveImage = loadImage("assets/images/tool5.png");
  toolSixImage = loadImage("assets/images/tool6.png");
  toolSevenImage = loadImage("assets/images/tool7.png");
  toolEightImage = loadImage("assets/images/tool8.png");
  toolNineImage = loadImage("assets/images/tool9.png");
  // Preload obstacle images
  barriers = loadImages("assets/images/clip-art-vector-construction.png");
  // Preload Background, font, sounds and music
  backdrop = loadImage("assets/images/");
  startScreenBackdrop = loadImage("assets/images/");
  endScreenBackdrop = loadImage("assets/images/");
  //  = loadFont("assets/images/");
  // new Audio("assets/sounds/")

}

// setup()
//
// Set up a canvas
// Creates objects for the the game (predator and preys)
// Set the text font and sound effects every time a Predator eats Prey

function setup(){
  createCanvas(1280,720);


// put the cars in array groups
  skyBlueCar = new Vehicle(100,100,5,color(200,200,0),50, skyBlueCarImage);
  darkBlueCar = new Vehicle(100,100,15,color(150,150,150), 50, darkBlueImage);
  yellowCar = new Vehicle(100,100,10,color(120,120,97),50, yellowCarImage);
  redCar = new Vehicle(100,100,15,color(175,175,175),50,redCarImage);
// put the tools in array groups
  toolOne = new Instrument(100,100,14, color(255,100,10),40, toolOneImage);
  toolTwo = new Instrument(100,100,10, color(255,255,255),40, toolTwoImage);
  toolThre = new Instrument(100,100,17, color(255,255,0),40, toolThreeImage);
  toolFour = new Instrument(100,100,14, color(255,255,255),40, toolFourImage);
  toolFive = new Instrument(100,100,15, color(255,255,255),40, toolFiveImage);
  toolSix = new Instrument(100,100,13, color(255,255,255),40, toolSixImage);
  toolSeven = new Instrument(100,100,12, color(255,255,255),40, toolSevenImage);
  toolEight = new Instrument(100,100,16, color(255,255,255),40, toolEightImage);
  toolNine = new Instrument(100,100,14,color(255,255,255),40, toolNineImage);
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
redCar.handleInput();

// Move all the cars in the game
skyBlueCar.move();
darkBlueCar.move();
yellowCar.move();
redCar.move();

// Move all the tools and obstacle in the game
toolOne.move();
toolTwo.move();
toolThree.move();
toolFour.move();
toolFive.move();
toolSix.move();
toolSeven.move();
toolNine.move();
toolEight.move();
// barriers.move();

// Handle skyBlueCar to eat any type of tools + obstacle
skyBlueCar.handleEating(toolOne);
skyBlueCar.handleEating(toolTwo);
skyBlueCar.handleEating(toolThree);
skyBlueCar.handleEating(toolFour);
skyBlueCar.handleEating(toolFive);
skyBlueCar.handleEating(toolSix);
skyBlueCar.handleEating(toolSeven);
skyBlueCar.handleEating(toolEight);
skyBlueCar.handleEating(toolNine);
// skyBlueCar.handleEating(barriers);

// Handle darkBlueCar to eat any type of tools + obstacle
darkBlueCar.handleEating(toolOne);
darkBlueCar.handleEating(toolTwo);
darkBlueCar.handleEating(toolThree);
darkBlueCar.handleEating(toolFour);
darkBlueCar.handleEating(toolFive);
darkBlueCar.handleEating(toolSix);
darkBlueCar.handleEating(toolSeven);
darkBlueCar.handleEating(toolEight);
darkBlueCar.handleEating(toolNine);
// darkBlueCar.handleEating(barriers);

// Handle yellowCar to eat any type of tools + obstacle
yellowCar.handleEating(toolOne);
yellowCar.handleEating(toolTwo);
yellowCar.handleEating(toolThree);
yellowCar.handleEating(toolFour);
yellowCar.handleEating(toolFive);
yellowCar.handleEating(toolSix);
yellowCar.handleEating(toolSeven);
yellowCar.handleEating(toolEight);
yellowCar.handleEating(toolNine);
// yellowCar.handleEating(barriers);

// Handle redCar to eat any type of tools + obstacle
redCar.handleEating(toolOne);
redCar.handleEating(toolTwo);
redCar.handleEating(toolThree);
redCar.handleEating(toolFour);
redCar.handleEating(toolFive);
redCar.handleEating(toolSix);
redCar.handleEating(toolSeven);
redCar.handleEating(toolEight);
redCar.handleEating(toolNine);
// redCar.handleEating(barriers);

// Display all the elements on the screen
skyBlueCar.display();
darkBlueCar.display();
redCar.display();
yellowCar.display();
toolOne.display();
toolTwo.display();
toolThree.display();
toolFour.display();
toolFive.display();
toolSix.display();
toolSeven.display();
toolEight.display();
toolNine.display();
// barriers.display();
}
