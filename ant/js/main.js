function setup() {
  const classes = require('@blipppy/p5classes');
  thing = new classes('pain');
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('black');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
