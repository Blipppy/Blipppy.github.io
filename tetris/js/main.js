board = new Board();

let targetFramerate = 30;
let currFramerate = 1;

let lastDropTime = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(targetFramerate);
  console.log(board.getLines());
}

function draw() {
  background(0);

  board.draw(
    ((height * 0.8) / (board.height / 2)) * board.width < width * 0.8
      ? (height * 0.8) / (board.height / 2)
      : (width * 0.8) / (board.height / 2)
  );

  // let drop = true;
  // if (Date.now() - lastDropTime > 100) {
  //     lastDropTime = Date.now();
  //     drop = board.drop();
  // }
  // if (!drop) {
  //     board.place();
  //     lastDropTime = Date.now();
  //     board.drop();
  // }

  noStroke();
  fill(255);
  textSize(30);
  if (frameCount % 30 == 0) currFramerate = int(frameRate());
  text(`fps: ${currFramerate}`, 10, 10, 100, 30);
  text('debug build', 10, 50, 600, 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    board.shift('left');
  } else if (keyCode == RIGHT_ARROW) {
    board.shift('right');
  } else if (keyCode == UP_ARROW) {
    board.rotate('cw');
  } else if (keyCode == DOWN_ARROW) {
    let drop = board.drop();
    if (!drop) {
      board.place();
      lastDropTime = Date.now();
      board.drop();
    }
  }

  // hard drop
}

// DEBUG STUFF, REMOVE LATER

function keyTyped() {
  if (/^[ijlostz]$/i.test(key)) {
    board.tetromino = new Tetromino(key);
  }
  if (key == 'r') {
    board.blocks = new Array(width * height);
  }
  if (key == 'p') {
    board.place();
  }
  if (key == ' ') {
    while (board.drop()) {}
    board.place();
    lastDropTime = Date.now();
    board.drop();
  }

  if (key == 'b') {
    board.rotate('cw');
  } else if (key == 'v') {
    board.rotate('ccw');
  }
}
