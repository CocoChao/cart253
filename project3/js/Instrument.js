// Instrument
//
// A class that represents a simple instrument that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by vehicle (predator) objects.

class Instrument {

  // constructor
  //
  // Sets the initial values for the instrument's properties
  // Either sets default values or uses the arguments provided

  constructor(x, y, speed, fillColor, radius, toolsAniGroup) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.radius = radius;
    // Time properties for noise() function
    this.tx = random(0, 1000);
    this.ty = random(0, 1000);
    // Health properties
    this.maxHealth = this.radius;

    this.health = this.maxHealth;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    //this.elementImage = elementImage;
    this.currentAnimationFrame=0;
    this.toolsAnimationGroup=toolsAniGroup;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Instrument's speed
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
  // Checks if the Instrument has gone off the canvas and
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
  // Use image as the instrument on the canvas
  // with a radius the same size as its current health.
  display() {

  // Display the animated tools all over the screen moving randomly using noise.
    image(this.toolsAnimationGroup[this.currentAnimationFrame], this.x, this.y, this.radius, this.radius);

    let programFramesPerAnimationFrame = floor(programFrameRate / animationFrameRate);
      // And we can check whether this many frames have passed in the program
      // using modulo, which tells us the remainder after division (if it's zero
      // the current frame count is a perfect multiple of our animation's frame rate
      // and we can advance the frame)
      if (frameCount % programFramesPerAnimationFrame === 0) {
        // Move to the next frame
        this.currentAnimationFrame++;
        // Check if we've reached the end of the array (the end of the animation frames)
        if (this.currentAnimationFrame >= this.toolsAnimationGroup.length) {
          this.currentAnimationFrame = 0;
        }
      }
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
