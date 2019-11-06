// Predator-Prey Simulation
// by Pippin Barr
// Improved by Carole Chao
//
// Creates predators, preys and a stealer (of different sizes and speeds)
// The predators chase the preys using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Set variables for Creatures and elf images
let tigerImage;
let pigImage;
let bearImage;
let elfImage;

// Set variables for the Food and Fruit images
let lollipopImage;
let candyImage;
let cottonImage;
let appleImage;

// Add variable for font
let emilysCandy;

// A variable to hold the candy wrap sound we will play everytime a creature
// eats a candy
let crinkleSFX;

// A variable to add the start screen and ending screen
let startGame = false;
let gameOver = false;

// Add empty groups arrays for predators and preys
let creaturesGroup = [];
let elfGroup = [];
let foodGroup = [];
let fruitGroup = [];

// preload()
//
// Preload pictures of the creatures (the tiger, the pig and the bear),
// the Food (the lollipop, the candy and the cotton) and the background pictures
// for the Start Screen and Play Screen.

function preload() {
//Preload Predators Image
  tigerImage = loadImage("assets/images/tiger-Disney-tsum-tsum.png");
  pigImage = loadImage("assets/images/disney-tsum-tsum-piglet.png");
  bearImage = loadImage("assets/images/disney-tsum-tsum-clipart-winnie-the-pooh.png");
  elfImage = loadImage("assets/images/Christmas_Elf_with_Santa_Bag_Clipart.png");
//Preload Preys Image
  lollipopImage = loadImage("assets/images/candy-lollipop.png");
  candyImage = loadImage("assets/images/clipart-candy-dulce-vector-png.png");
  cottonImage = loadImage("assets/images/cotton-candy-clipart.png");
  appleImage = loadImage("assets/images/Red-Apple-PNG-Photo.png");
//Preload Background, font and sound
  backdrop = loadImage("assets/images/candyland_background.png");
  startScreenBackdrop = loadImage("assets/images/start_screen-candy-background.jpg");
  endScreenBackdrop = loadImage("assets/images/candyland-wallpapers.png");
  emilysCandy = loadFont("assets/images/Emilys_Candy/EmilysCandy-Regular.ttf");
  crinkleSFX = new Audio("assets/sounds/candy-wrapper-crinkle.wav");
}

// setup()
//
// Set up a canvas
// Creates objects for the predators and preys
// Set the text font and sound effects every time a Predator eats Prey

function setup() {
  createCanvas(1300, 1000);
  textFont(emilysCandy);
  crinkleSFX.play();

// put the creatures and elf in array groups
  creaturesGroup[0] = new Creatures(100, 100, 5, color(200, 200, 0), 50, tigerImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16); // press Shift key to sprint);
  creaturesGroup[1] = new Creatures(100, 100, 15, color(150, 150, 150), 50, pigImage, 87, 83, 65, 68, 70); // press F to sprint);
  creaturesGroup[2] = new Creatures(100, 100, 20, color(120, 114, 97), 50, bearImage, 73, 75, 74, 76, 72); // press H key to sprint);
  elfGroup[0] = new Trolls(100,100,25, color(100,100,100),40, elfImage);
// put the food+fruit in array groups
  foodGroup[0] = new Food(100, 100, 10, color(255, 100, 10), 40, lollipopImage);
  foodGroup[1] = new Food(100, 100, 8, color(255, 255, 255), 40, candyImage);
  foodGroup[2] = new Food(100, 100, 20, color(255, 255, 0), 40, cottonImage);
  fruitGroup[0] = new Fruit(100,100,25, color(255,220,225),40, appleImage);

}

// draw()
// Add the ability to start playing when Spacebar is pressed and change screens
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (startGame === true) {
    // Start Screen with game appears
    background(backdrop, 0, 0);
    // Handle input for all the predators
    creaturesGroup[0].handleInput();
    creaturesGroup[1].handleInput();
    creaturesGroup[2].handleInput();

    // Move all the "animals"
    creaturesGroup[0].move();
    creaturesGroup[1].move();
    creaturesGroup[2].move();
    elfGroup[0].move();
    foodGroup[0].move();
    foodGroup[1].move();
    foodGroup[2].move();
    fruitGroup[0].move();

    // Handle the tiger eating any Food
    creaturesGroup[0].handleEating(foodGroup[0]);
    creaturesGroup[0].handleEating(foodGroup[1]);
    creaturesGroup[0].handleEating(foodGroup[2]);
    creaturesGroup[0].handleEating(fruitGroup[0]);

    // Handle the pig eating any Food
    creaturesGroup[1].handleEating(foodGroup[0]);
    creaturesGroup[1].handleEating(foodGroup[1]);
    creaturesGroup[1].handleEating(foodGroup[2]);
    creaturesGroup[1].handleEating(fruitGroup[0]);

    // Handle the bear eating any Food
    creaturesGroup[2].handleEating(foodGroup[0]);
    creaturesGroup[2].handleEating(foodGroup[1]);
    creaturesGroup[2].handleEating(foodGroup[2]);
    creaturesGroup[2].handleEating(fruitGroup[0]);

    // Handle the Evil Elves eating any Food
    elfGroup[0].handleEating(foodGroup[0]);
    elfGroup[0].handleEating(foodGroup[1]);
    elfGroup[0].handleEating(foodGroup[2]);
    elfGroup[0].handleEating(fruitGroup[0]);

    // Display all the "creatures"
    creaturesGroup[0].display();
    creaturesGroup[1].display();
    creaturesGroup[2].display();
    elfGroup[0].display();
    foodGroup[0].display();
    foodGroup[1].display();
    foodGroup[2].display();
    fruitGroup[0].display();
    checkGameOver();
  } else {
    // Start Screen image of Candy themed background with Game instructions
    // and title.
    background(startScreenBackdrop, 0, 0);
    fill(227, 101, 91);
    textSize(75);
    textAlign(CENTER);
    text("SWEET SUGAR CANDYLAND", width / 2, height / 2);
    textSize(30);
    textAlign(CENTER);
    text("Press SPACEBAR to play.", width / 2, height / 2 + 50);
    text("Use keys Up, Down, Right, Left to move Tiger", width / 2, height / 2 + 100);
    text("Use keys W, A, S, D to move Pig.", width / 2, height / 2 + 150);
    text("Use keys I, J, K, L to move Winnie the Pooh.\n GOOD LUCK!.", width / 2, height / 2 + 200);
  } if (gameOver === true){

    // Display the CandyLand path on the screen with Game Over text
    fill(93, 62, 120);
    textFont(emilysCandy);
    textSize(45);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    image(endScreenBackdrop, 0, 0);

    // Set up the text to display
    let gameOverText = "POUF!\n"; // \n means "new line"
    gameOverText = gameOverText + "Tiger ate " + tiger.score + " candies\n";
    gameOverText = gameOverText + "Pig ate " + pig.score + " candies\n";
    gameOverText = gameOverText + "Bear ate " + bear.score + " candies\n";
    gameOverText = gameOverText + "before leaving Candyland."
    // Display it in the centre of the screen
    text(gameOverText, width / 2, height / 2);
  }
}

// Start playing when pressing Spacebar
function keyPressed() {
  if (keyCode == 32) {
    startGame = true;
  }
}
  // Show game over screen when predator dies
  function checkGameOver() {
    if (tiger.health === 0 && pig.health === 0 && bear.health === 0) {
      gameOver = true;
    }
  }
