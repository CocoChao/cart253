class Prey { //tx is noise
  constructor(x, y, speed, fillColor, radius) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.tx = random(0, 1000);
    this.ty = random(0, 1000);
    this.speed = speed;
    this.fillColor = (250, 200, 150);
    this.radius = radius;
    this.health = this.maxHealth;
    this.maxHealth = radius;
    this.name = food;
    // this.upKey = 87;
    // this.downKey = 83;
    // this.leftKey = 68;
    // this.rightKey = 65;
  }
  move() {
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    this.x += this.vx;
    this.y += this.vy;

    this.tx += 0.01;
    this.ty += 0.01;
  }
  handleWrapping() {
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }
    display() {
      push();
      noStroke();
      fill(this.fillColor, this.health);
      this.radius = this.health;
      ellipse(this.x, this.y, this.radius * 2);
      pop();
  }

  reset() {

  this.x = random(0, width);
  this.y = random(0, height);
  this.health = this.maxHealth;
  this.radius = this.health;
  }
}
