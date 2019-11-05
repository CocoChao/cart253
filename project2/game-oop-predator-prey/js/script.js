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
let elfImage;

let tiger;
let pig;
let bear;
let elf;

// The Food: the Sweets and Fruits
let lollipopImage;
let candyImage;
let cottonImage;
let appleImage;

let lollipop;
let candy;
let cotton;
let apple;

// Add variable for font
let emilysCandy;

// A variable to hold the candy wrap sound we will play everytime a creature
// eats a candy
let crinkleSFX;

// A variable to add the start screen and ending screen
let startGame = false;
let gameOver = false;

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
  tiger = new Creatures(100, 100, 5, color(200, 200, 0), 40, tigerImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16); // press Shift key to sprint);
  pig = new Creatures(100, 100, 15, color(150, 150, 150), 30, pigImage, 87, 83, 65, 68, 70); // press F to sprint);
  bear = new Creatures(100, 100, 20, color(120, 114, 97), 45, bearImage, 73, 75, 74, 76, 72); // press H key to sprint);
  elf = new Trolls(100,100,25, color(100,100,100),35, elfImage);
  lollipop = new Food(100, 100, 10, color(255, 100, 10), 50, lollipopImage);
  candy = new Food(100, 100, 8, color(255, 255, 255), 60, candyImage);
  cotton = new Food(100, 100, 20, color(255, 255, 0), 10, cottonImage);
  apple = new Fruit(100,100,25, color(255,220,225),55, appleImage);
}

// draw()
// Add the ability to start playing when Spacebar is pressed and change screens
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (startGame === true) {
    // Start Screen with game appears
    background(backdrop, 0, 0);
    // Handle input for all the predators
    tiger.handleInput();
    pig.handleInput();
    bear.handleInput();

    // Move all the "animals"
    tiger.move();
    pig.move();
    bear.move();
    elf.move();
    lollipop.move();
    candy.move();
    cotton.move();
    apple.move();

    // Handle the tiger eating any Food
    tiger.handleEating(lollipop);
    tiger.handleEating(candy);
    tiger.handleEating(cotton);
    tiger.handleEating(apple);

    // Handle the pig eating any Food
    pig.handleEating(lollipop);
    pig.handleEating(candy);
    pig.handleEating(cotton);
    pig.handleEating(apple);

    // Handle the bear eating any Food
    bear.handleEating(lollipop);
    bear.handleEating(candy);
    bear.handleEating(cotton);
    bear.handleEating(apple);

    // Handle the Evil Elves eating any Food
    elf.handleEating(lollipop);
    elf.handleEating(candy);
    elf.handleEating(cotton);
    elf.handleEating(apple);

    // Display all the "creatures"
    tiger.display();
    pig.display();
    bear.display();
    elf.display();
    lollipop.display();
    candy.display();
    cotton.display();
    apple.display();
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
    text("Press Spacebar to play.", width / 2, height / 2 + 50);
    text("Use keys Up, Down, Right, Left to move Tiger", width / 2, height / 2 + 100);
    text("Use keys W, A, S, D to move Pig.", width / 2, height / 2 + 150);
    text("Use keys I, J, K, L to move Winnie the Pooh.\n GOOD LUCK!.", width / 2, height / 2 + 200);
  } if (gameOver === true){

    // Display the CandyLand path on the screen with Game Over text
    fill(227, 101, 91);
    textFont(emilysCandy);
    textSize(45);
    textAlign(CENTER, CENTER);
    image(endScreenBackdrop, 0, 0);

    // Set up the text to display
    let gameOverText = "POUF! They dissapeared!\n"; // \n means "new line"
    gameOverText = gameOverText + "You guys ate " + this.score + " candies\n";
    gameOverText = gameOverText + "before you left Candyland."
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
