let game = new Game();

let targetFramerate = 60;
let currFramerate = 1;

let lastDropTime = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(targetFramerate);
}

function draw() {
  background(0);

  game.doGameTick();

  game.board.draw(
    ((height * 0.8) / (game.board.height / 2)) * game.board.width < width * 0.8
      ? (height * 0.8) / (game.board.height / 2)
      : (width * 0.8) / (game.board.height / 2)
  );

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
