"use strict";

/******************************************************

Game - Chaser
Pippin Barr
Modified by: Carole Chao

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 35;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 3;
// Player health
let playerHealth;
let playerMaxHealth = 300;
// Player fill color
let playerFill = 255;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 30;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 255;
// Prey fill green color
let preyFill = (35, 204, 77);

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
// Change variables from random to noise
let preyTX = 0;
let preyTY = 0;

// The variables for the images
let img;
let img2;
// Change text font
let myFont;
// Add background sound
let mySound;
let y = 0;

//preload()
//Add background image of Space
function preload() {
  img = loadImage('assets/images/Space-Horizon-Edited.jpg');
  img2 = loadImage('assets/images/tv-glitch-png.png');
  myFont = loadFont('assets/Turret_Road/TurretRoad-Regular.ttf');
  mySound = loadSound('assets/sounds/Spaceship_Takeoff-Richard-902554369.wav');
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(1136, 760);
  mySound.play();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(img, 0, 0);
  preyTX += 0.01;
  preyTY += 0.01;

  // Draw the moving yellow line from top to bottom of the canvas
  stroke(226, 204, 0);
  line(0, y, width, y);

  y = y + 1;
  if (y > height) {
    y = 0;
  }

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else {
    playerVY = 0;
  }
  // Add the ability to "sprint" when the player holds down the shift key
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = 7;
  } else {
    playerMaxSpeed = 2;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);

  // Reduce player's health faster when Shift key is Pressed
  if (keyIsDown(SHIFT)) {
    playerHealth = playerHealth - 5;
  } else {
    playerHealth = playerHealth - 0.5;
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  }
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Increase the player radius
    playerRadius = playerRadius + 0.5;
    // Decrease the prey radius
    preyRadius = preyRadius - 0.1;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on the moment we want a values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  }

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(35, 204, 77, preyHealth);
  ellipse(preyX, preyY, preyRadius * 2);
  stroke(255, 204, 0);
  strokeWeight(2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  ellipse(playerX, playerY, playerRadius * 2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textFont(myFont);
  textSize(45);
  textAlign(CENTER, CENTER);
  fill(255);
  // Display the glitched TV screen image on the screen
  image(img2, 0, 0);

  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You killed " + preyEaten + " aliens\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
