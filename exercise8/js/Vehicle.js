// Vehicule
//
// A class that represents a simple vehicule
// controlled by the arrow keys. It can move around
// the screen and sonsume Instrument (Prey) objects to maintain its health.

class Vehicle {

// Constructor
//
// Sets the initial values for the Vehicle's properties
// Either sets default values or uses the arguments provided
// Vehicles are skyBlueCar, darkBlueCar, yellowCar and redCar
constructor(x, y, speed, fillColor, radius, elementImage, up, down, left, right, sprint) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth;
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    // Input properties
    this.upKey = up;
    this.downKey = down;
    this.leftKey = left;
    this.rightKey = right;
    this.shiftKey = sprint;
    this.score = 0;
    this.elementImage = elementImage;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    // Add the ability to "sprint" when the player holds down the shift key
    if (keyIsDown(this.shiftKey)) {
      this.speed = this.speed * 1.5;
    } else {
      this.speed = this.speed;
    carFlyBySFX.play // play sound effects when speeding
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(instrument) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, instrument.x, instrument.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + instrument.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      instrument.health -= this.healthGainPerEat;
      // Add sound effect when instrument/prey is eaten
      carIgnitionSFX.play();
      // Check if the prey died, reset it if so and play sound effects
      if (instrument.health < 0) {
        instrument.reset();
        this.score++;
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    if (this.health === 0){
      return;
    }
    image(this.elementImage, this.x, this.y, this.radius * 2, this.radius * 2);
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    pop();
    // Add the score on top of the predators
    textSize(30);
    fill(71, 71, 71);
    text("Score: " + this.score, this.x, this.y);
}
}
