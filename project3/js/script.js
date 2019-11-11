// Project 3 - Prototype 1
// by Carole Chao
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
let toolSixImage;
let toolSevenImage;
let toolEightImage;
let toolNineImage;
let barrier;

// Add variables for font


// A variable for the car sounds & background music and sounds.

// A variable to add the start screen and ending screen.
let startGame = false;
let gamerOver = false;

// Add empty groups arrays for cars and tools
let vehiculesGroup = [];
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
  barrier = loadImages("assets/images/clip-art-vector-construction.png");
}

// setup()
//
// Set up a canvas
// Creates objects for the the game (predator and preys)
// Set the text font and sound effects every time a Predator eats Prey

function setup(){
  createCanvas(1280,720);


// put the cars and tools in array groups
  vehiculesGroup[0] = new Vehicule(100,100,5,color(200,200,0),50, skyBlueCarImage)
  vehiculesGroup[1] = new Vehicule(100,100,15,color(150,150,150)))
}
]
