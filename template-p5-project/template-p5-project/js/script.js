//Ex1: Added shape moving left to right"
//Carole Chao

// preload()
// Add an image of a clown

let food;
let puma;

// setup()
//
//Description of setup()

function setup() {
  createCanvas(windowHeight, windowWidth);
  puma = new Predator(200, 200, 5, color(250, 125, 70),100);
  food = new Prey(100, 100, 5, color(75, 50, 100),120);
}

// draw()
//
// Descriiton of draw()

function draw() {
  background(0);
  puma.handleInput();
  food.move();
  puma.move();
  puma.handleEating(food); // NEW
  food.display();
  puma.display();
}
