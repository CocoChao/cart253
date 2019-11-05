class Trolls {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  // Make the Elf eat the candies wherever he goes, steal if from the creatures
  constructor(x, y, speed, fillColor, radius, animalImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000);
    this.ty = random(0, 1000);
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth;
    this.healthGainPerEat = 5;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    this.animalImage = animalImage;
  }
  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update health
    this.health = constrain(this.health, 0, this.maxHealth);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
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
  // Takes a food object as an argument and checks if the predator
  // overlaps it. If so, reduces the food's health and increases
  // the predator's. If the food dies, it gets reset.
  handleEating(food) {
    // Calculate distance from this predator to the food
    let d = dist(this.x, this.y, food.x, food.y);
    // Check if the distance is less than their two radius (an overlap)
    if (d < this.radius + food.radius) {
      // Predator keeps constant health
      // this.health = this.healthGainPerEat;
      // Play our crinkle sound effect by rewinding and then playing
      crinkleSFX.currentTime = 0;
      crinkleSFX.play();
      // Decrease food health by the same amount
      food.health -= this.healthGainPerEat;
      // Check if the food dissapears and reset it if so
      if (food.health < 0) {
        food.reset();
      }
    }
  }
  display() {
    if (this.health === 0){
      return;
    }
    image(this.animalImage, this.x, this.y, this.radius * 2, this.radius * 2);
    push();
    noStroke();
    fill(this.fillColor);
    // this.radius = this.health;
    pop();
  }

}
