// Block
//
// A class that represents the Blocks that moves on screen based on a noise() function
// and makes the drivers life more difficult.
// It can move around the screen and be consumed by vehicle (predator) objects.

class Block {

  // constructor
  //
  // Sets the initial values for the Block's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, elementImage) {
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
    this.maxHealth = this.radius;
    this.health = this.maxHealth;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    this.elementImage = elementImage;
  }

  // move
  //
  // Sets velocity based on the noise() function and the block's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
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
  // Checks if the Block has gone off the canvas and
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

  // display
  //
  // Use image as the Block on the canvas
  // with a radius the same size as its current health.
  display() {
    image(this.elementImage, this.x, this.y, this.radius * 2, this.radius * 2);
    push();
    fill(this.fillColor);
    this.radius = this.health;
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}
