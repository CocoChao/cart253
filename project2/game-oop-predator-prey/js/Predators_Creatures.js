// Predator
//
// A class that represents all the predators
// controlled by the arrow keys. It can move around
// the screen and consume food objects to maintain its health.

class Creatures {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, animalImage, up, down, left, right, run) {
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
    this.healthLossPerMove = 0.05;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    // Input properties
    this.upKey = up;
    this.downKey = down;
    this.leftKey = left;
    this.rightKey = right;
    this.shiftKey = run;
    this.score = 0;
    this.animalImage = animalImage;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
    // Add the ability to "sprint" when the player holds down the shift key
    if (keyIsDown(this.shiftKey)) {
      this.speed = this.speed * 1.5;
    } else {
      this.speed = this.speed;
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
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a food object as an argument and checks if the predator
  // overlaps it. If so, reduces the food's health and increases
  // the predator's. If the food dies, it gets reset.
  handleEating(food) {
    // Calculate distance from this predator to the food
    let d = dist(this.x, this.y, food.x, food.y);
    // Check if the distance is less than their two radius (an overlap)
    if (d < this.radius + food.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Play our crinkle sound effect by rewinding and then playing
      crinkleSFX.currentTime = 0;
      crinkleSFX.play();
      // Decrease food health by the same amount
      food.health -= this.healthGainPerEat;
      // Check if the food died and reset it if so
      if (food.health < 0) {
        food.reset();
        this.score++;
      }
    }
    // If creatures eats the poinsonous apple, they dissapear except the elf
    if (fruitGroup[0].health < 0){
      this.health = this.health + this.healthLossPerMove * 100 ;}
  }
//
handleHealth(food){
  // Check if the predator dies
  // if (this.health === 0){
  //   predator.reset();
  //////////////////
}

  // display
  //
  // with a radius the same size as its current health.
  // When a predator reaches 0 health, it stays intact
  display() {
    if (this.health === 0){
      return;
    // gameOver = true ?
    }
    image(this.animalImage, this.x, this.y, this.radius * 2, this.radius * 2);
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
