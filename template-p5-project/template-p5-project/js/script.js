//Ex1: Added shape under that follows the mouse
//Carole Chao

// setup()
//
// Add a sky blue background and a kaki green square getting greener and greener,
// with red strokes

function setup() {
createCanvas(500,500);
fill(200,159,80,2);
stroke(100,0,0);
background(145,200,639)

}


// draw()
//
// Draws a moving square that moves from left to right across the canvas
// on top of the canvas.

function draw() {
  rect(mouseX,mouseY,100,100);


}
