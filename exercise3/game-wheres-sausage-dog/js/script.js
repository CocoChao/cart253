"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr
Modified by Carole Chao

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let targetImageSize;
let targetImageSpeed = 5
let targetImageVX;
let targetImageVY;
let speed = 2;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {

  // The targetImage velocity
  targetImageVX = 5;
  targetImageVY = 5;

  createCanvas(windowWidth, windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0, width);
    let y = random(0, height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1, x, y);
    } else if (r < 0.2) {
      image(decoyImage2, x, y);
    } else if (r < 0.3) {
      image(decoyImage3, x, y);
    } else if (r < 0.4) {
      image(decoyImage4, x, y);
    } else if (r < 0.5) {
      image(decoyImage5, x, y);
    } else if (r < 0.6) {
      image(decoyImage6, x, y);
    } else if (r < 0.7) {
      image(decoyImage7, x, y);
    } else if (r < 0.8) {
      image(decoyImage8, x, y);
    } else if (r < 0.9) {
      image(decoyImage9, x, y);
    } else if (r < 1.0) {
      image(decoyImage10, x, y);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0, width);
  targetY = random(0, height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage, targetX, targetY);
  targetImageSize = targetImage.width;
}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  // Display the target image at the top right of the canvas with
  // a colored backgroud
  fill(255, 207, 207);
  rect(0, 0, 250, 175);
  strokeWeight(3);
  image(targetImage, 125, 100);


  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(75);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255));

    // Make the sausage dog move on the screen when you've won
    if (targetX > width) {
      targetImageVX = targetImageVX * -1;
    }
    if (targetX < 0) {
      targetImageVX = targetImageVX * -1;
    }
    if (targetY > height) {
      targetImageVY = targetImageVY * -1;
    }
    if (targetY < 0) {
      targetImageVY = targetImageVY * -1;
    }


    targetX = targetX + targetImageVX;
    targetY = targetY + targetImageVY;
    image(targetImage, targetX, targetY);

    // Tell them they won!
    text("HERE'S A TREAT!", width / 2, height / 2);

    // Make the targetImage bigger on the screen and the text box when they win
    noFill();
    noStroke();
    ellipse(targetX, targetY, targetImage.width, targetImage.height);

  }
  // Add the text caption to the image
  textAlign(LEFT, TOP);
  textSize(30);
  fill(255, 0, 0);
  text('I AM LOST :(', 30, 10);
  textAlign(LEFT)
  textSize(20);
  text('Press Crtl+R to restart', 30, 130);
  text('the game', 30, 150);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {

  if (gameOver) {
    // Make the targetImage size smaller each time we find the dog
    targetImageSize = targetImageSize * 0.75;
    console.log(targetImageSize);
    // Reset the screen (stops the moving targetImage) to continue the game
    // and find the targetImage
    targetImage.resize(targetImageSize, targetImageSize)
    gameOver = false;
    background("#ffff00");
    imageMode(CENTER);

    // Copy the
    // Use a for loop to draw as many decoys as we need
    for (let i = 0; i < numDecoys; i++) {
      // Choose a random location on the canvas for this decoy
      let x = random(0, width);
      let y = random(0, height);
      // Generate a random number we can use for probability
      let r = random();
      // Use the random number to display one of the ten decoy
      // images, each with a 10% chance of being shown
      // We'll talk more about this nice quality of random soon enough.
      // But basically each "if" and "else if" has a 10% chance of being true
      if (r < 0.1) {
        image(decoyImage1, x, y);
      } else if (r < 0.2) {
        image(decoyImage2, x, y);
      } else if (r < 0.3) {
        image(decoyImage3, x, y);
      } else if (r < 0.4) {
        image(decoyImage4, x, y);
      } else if (r < 0.5) {
        image(decoyImage5, x, y);
      } else if (r < 0.6) {
        image(decoyImage6, x, y);
      } else if (r < 0.7) {
        image(decoyImage7, x, y);
      } else if (r < 0.8) {
        image(decoyImage8, x, y);
      } else if (r < 0.9) {
        image(decoyImage9, x, y);
      } else if (r < 1.0) {
        image(decoyImage10, x, y);
      }
    }

    // Once we've displayed all decoys, we choose a random location for the target
    targetX = random(0, width);
    targetY = random(0, height);

    // And draw it (because it's the last thing drawn, it will always be on top)
    image(targetImage, targetX, targetY);
    console.log(targetX);

  } else {
    // The mouse was clicked!
    // Check if the cursor is in the x range of the target
    // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
    // the key is we want to determine the left and right edges of the image.)
    if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
      // Check if the cursor is also in the y range of the target
      // i.e. check if it's within the top and bottom of the image
      if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
        gameOver = true;
        // Resize the targetImage on the "I AM LOST" square
        targetImage.resize(250, 200);
      }
    }
  }
}
