/******************************************************

Game - The Artful Dodger
Carole Chao

Homework 2

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;
let speed = 2 ;
let ax = 0.50; //acceleration

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;
let enemyVY = 0;

// How many dodges the player has made
let dodges = 0;


// Get a random element from an array using the random(Array)
// let r = random(0,50);

// The font
// let myFont;

// setup()
//
// Make the canvas, position the avatar and anemy

// function preload() {
// myFont = loadFont('<link href="https://fonts.googleapis.com/css?family=Mansalva&display=swap" rel="stylesheet"> ')
// }

function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;
  vx = speed; //acceleration

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // Add stroke
  stroke(10);
  strokeWeight(5);
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(255,220,220);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Change velocity based on acceleration
  evnemyVX = enemyVX + ax;
  enemyVX = constrain(enemyVY,0,50);

  // Change position based on velocity
  enemyX = enemyX + avatarVX;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed + 1;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed + 1;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed ;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the enemy's size
    enemySize = 50;
    // Reset the enemy's speed
    enemySpeed = 5;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    enemySize = 50;
    enemySpeed = 5;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = enemySize + 2; //increase enemy size when successfully dodge
    enemySpeed = enemySpeed + 2; //increase enemy speed when successfully dodge
  }
// Change background color according to mouse location
  if (mouseX < width/3) {
    background(100,75,75);
  }
  else if (mouseX < 2 * width/3) {
    background(100,125,100);
  }
  else {
    background(125,125,150);
  }


  if (mouseIsPressed) {
    ellipseMode(CENTER);
    ellipse(250,250,100,100);
  }
  else {
    rectMode(CENTER);
    rect(250,250,100,100);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is black
  fill(0);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);

  // Display successful dodges on the canvas
  textSize(32);
  text(dodges,10,30);
  fill(100,100,153);
  textFont('Georgia');
}
