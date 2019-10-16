"use strict";

// Pong
// by Pippin Barr
// modified by Carole Chao
//
// An improved version Pong with a scoring system and different aesthetic
// with the ability to play the game with the keyboard.
//
// Up, down, left and right keys control the right hand paddle, W,S,A and D
// keys control the left hand paddle

// Whether the game has started
let playing = false;

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  w: 25,
  h: 25,
  size: 25,
  vx: 0,
  vy: 0,
  speed: 5,
}

// PADDLES
//
// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 75,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  leftKey: 37,
  rightKey: 39,
  score: 0,
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 75,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  leftKey: 65,
  rightKey: 68,
  score: 0,
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

// The variables for the image
let backgroundImage;

// preload()
//
// Loads the beep audio for the sound of bouncing
// Load the image of the soccerball
// Load the background image of football/soccer field
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  backgroundImage = loadImage("assets/images/football-field-or-soccer-field-background.jpg");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(866, 519);
  beepSFX.play();
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 115 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - (rightPaddle.w + 115);
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Add background image
  background(backgroundImage, 0, 0);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it

      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  console.log(rightPaddle.score + "RIGHTIES");
  console.log(leftPaddle.score + "LEFTIES");

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// To update the console when player makes a score
function paddleScore() {
  if (ball.x < 0) {
    rightPaddle.score += 1;
  } else if (ball.x > width) {
    leftPaddle.score += 1;
  }
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  } else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
  if (keyIsDown(paddle.leftKey)) {
    // Move left
    paddle.vx = -paddle.speed;
  } else if (keyIsDown(paddle.rightKey)) {
    // Move right
    paddle.vx = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vs = 0;
  }
}

  // updatePositions()
  //
  // Sets the positions of the paddles and ball based on their velocities
  function updatePaddle(paddle) {
    // Update the paddle position based on its velocity
    paddle.y += paddle.vy;
  }

  // updateBall()
  //
  // Sets the position of the ball based on its velocity
  function updateBall() {
    // Update the ball's position based on velocity
    ball.x += ball.vx;
    ball.y += ball.vy;
  }

  // ballIsOutOfBounds()
  //
  // Checks if the ball has gone off the left or right
  // Make the loosing paddle smaller .
  // Returns true if so, false otherwise
  function ballIsOutOfBounds() {
    if (ball.x < 0) {
      rightPaddle.score += 1;
      leftPaddle.h -= 4, constrain(leftPaddle.h,0,75);
      leftPaddle.w -= 2, constrain(leftPaddle.w,0,20);
      return true;
    } else if (ball.x > width) {
      leftPaddle.score += 1;
      rightPaddle.h -= 4, constrain(rightPaddle.h,0,75);
      rightPaddle.w -= 2, constrain(rightPaddle.w,0,20);
      return true;
    } else {
      return false;
      // ball.x = width / 2;
      // ball.y = height / 2;

    }
  }

  // checkBallWallCollision()
  //
  // Check if the ball has hit the top or bottom of the canvas
  // Bounce off if it has by reversing velocity
  // Play a sound
  function checkBallWallCollision() {
    // Check for collisions with top or bottom...
    if (ball.y < 0 || ball.y > height) {
      // It hit so reverse velocity
      ball.vy = -ball.vy;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }

  // checkBallPaddleCollision(paddle)
  //
  // Checks for collisions between the ball and the specified paddle
  function checkBallPaddleCollision(paddle) {
    // VARIABLES FOR CHECKING COLLISIONS

    // We will calculate the top, bottom, left, and right of the
    // paddle and the ball to make our conditionals easier to read...
    let ballTop = ball.y - ball.size / 2;
    let ballBottom = ball.y + ball.size / 2;
    let ballLeft = ball.x - ball.size / 2;
    let ballRight = ball.x + ball.size / 2;

    let paddleTop = paddle.y - paddle.h / 2;
    let paddleBottom = paddle.y + paddle.h / 2;
    let paddleLeft = paddle.x - leftPaddle.w / 2;
    let paddleRight = paddle.x + paddle.w / 2;

    // First check the ball is in the vertical range of the paddle
    if (ballBottom > paddleTop && ballTop < paddleBottom) {
      // Then check if it is touching the paddle horizontally
      if (ballLeft < paddleRight && ballRight > paddleLeft) {
        // Then the ball is touching the paddle
        // Reverse its vx so it starts travelling in the opposite direction
        ball.vx = -ball.vx;
        // Play our bouncing sound effect by rewinding and then playing
        beepSFX.currentTime = 0;
        beepSFX.play();
      }
    }
  }

  // displayPaddle(paddle)
  //
  // Draws the specified paddle
  function displayPaddle(paddle) {
    // Draw the paddles
    rect(paddle.x, paddle.y, paddle.w, paddle.h);

  }

  // displayBall()
  //
  // Draws the ball on screen as a square
  function displayBall() {
    // Draw the ball
    ellipse(ball.x, ball.y, ball.size, ball.size);
  }

  // resetBall()
  //
  // Sets the starting position and velocity of the ball
  function resetBall() {
    // Initialise the ball's position and set random velocity
    ball.x = width / 2;
    ball.y = height / 2;
    ball.vx = random(0,25),constrain(ball.vx,-ball.speed,ball.speed);
    ball.vy = random(0,25),constrain(ball.vy,-ball.speed,ball.speed)
  }

  // displayStartMessage()
  //
  // Shows a message about how to start the game
  function displayStartMessage() {
    push();
    textAlign(CENTER, CENTER);
    textSize(40);
    text("CLICK TO START", width / 2, height / 2);
    pop();
  }

  // mousePressed()
  //
  // Here to require a click to start playing the game
  // Which will help us be allowed to play audio in the browser
  function mousePressed() {
    playing = true;
  }
