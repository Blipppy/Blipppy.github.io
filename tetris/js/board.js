class Board {
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.blocks = new Array(width * height);
    this.bag = shuffle(dicts.pieces.slice(0));
    this.tetromino = new Tetromino(this.bag.splice(0, 1));

    this.blocks[52] = "yellow";
    this.blocks[57] = "yellow";
    // this.blocks[47] = 'yellow';
    // this.blocks[71] = 'yellow';

    return this;
  }

  drop() {
    this.tetromino.pos.y++;
    if (this.verifyPosition()) {
      return true;
    } else {
      this.tetromino.pos.y--;
      return false;
    }
  }

  shift(dir) {
    if (dir == "left") {
      this.tetromino.pos.x--;
      if (this.verifyPosition()) {
        return true;
      } else {
        this.tetromino.pos.x++;
        return false;
      }
    } else if (dir == "right") {
      this.tetromino.pos.x++;
      if (this.verifyPosition()) {
        return true;
      } else {
        this.tetromino.pos.x--;
        return false;
      }
    }
  }

  rotate(dir) {
    if (dir == "cw") {
      this.tetromino.rotation++;
      this.tetromino.grid =
        dicts.pieceInfo.grid[this.tetromino.piece][this.tetromino.rotation % 4];
      for (const shift of dicts.kicks[this.tetromino.piece][
        (this.tetromino.rotation - 1) % 4
      ][dir]) {
        this.tetromino.pos.x += shift[0];
        this.tetromino.pos.y += shift[1];
        if (this.verifyPosition()) {
          return true;
        }
        this.tetromino.pos.x -= shift[0];
        this.tetromino.pos.y -= shift[1];
      }
      this.tetromino.rotation--;
      this.tetromino.grid =
        dicts.pieceInfo.grid[this.tetromino.piece][this.tetromino.rotation % 4];
      return false;
    } else if (dir == "ccw") {
      this.tetromino.rotation--;
      if (this.tetromino.rotation < 0) {
        this.tetromino.rotation = 3;
      }
      this.tetromino.grid =
        dicts.pieceInfo.grid[this.tetromino.piece][this.tetromino.rotation % 4];
      for (const shift of dicts.kicks[this.tetromino.piece][
        (this.tetromino.rotation + 1) % 4
      ][dir]) {
        this.tetromino.pos.x += shift[0];
        this.tetromino.pos.y += shift[1];
        if (this.verifyPosition()) {
          return true;
        }
        this.tetromino.pos.x -= shift[0];
        this.tetromino.pos.y -= shift[1];
      }
      this.tetromino.rotation++;
      this.tetromino.grid =
        dicts.pieceInfo.grid[this.tetromino.piece][this.tetromino.rotation % 4];
      return false;
    }
  }

  place() {
    for (const pos of this.tetromino.getGlobalPos()) {
      this.blocks[pos] = this.tetromino.color;
    }
    this.tetromino = new Tetromino(this.bag.splice(0, 1));
    if (this.bag.length <= 0) {
      this.bag = shuffle(dicts.pieces.slice(0));
    }
  }

  verifyPosition() {
    let pairs = this.tetromino.getMinoPairs();
    let positions = this.tetromino.getGlobalPos();

    for (const pair of pairs) {
      if (pair[0] > this.width - 1 || pair[0] < 0) {
        return false;
      } else if (pair[1] > this.height - 1) {
        return false;
      }
    }

    for (const pos of positions) {
      if (this.blocks[pos]) {
        return false;
      }
    }
  }

  clearLines() {
    let lines = [];
    let temp = [];

    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i]) {
        arr.push("a");
      }
    }
  }

  draw(cellSize) {
    let originalY = this.tetromino.pos.y;

    while (this.drop()) {}

    let preview = this.tetromino.getGlobalPos();
    this.tetromino.pos.y = originalY;

    let boardWidth = cellSize * this.width;
    let boardHeight = cellSize * this.height;

    let leftMargin = (width - cellSize * this.width) / 2;
    let topMargin = (height - cellSize * this.height) / 2;

    translate(leftMargin, topMargin);

    // draw squares
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let globalPos = y * this.width + x;
        if (this.blocks[globalPos]) {
          noStroke();
          fill(this.blocks[globalPos]);
        } else if (this.tetromino.getGlobalPos().includes(globalPos)) {
          noStroke();
          fill(this.tetromino.color);
        } else if (preview.includes(globalPos)) {
          console.log(globalPos);
          let c = color(this.tetromino.color);
          c.setAlpha(75);
          noStroke();
          fill(c);
          // stroke(c);
          // strokeWeight(3);
          // noFill();
          // square((x * cellSize) + (cellSize * 0.1), (y * cellSize) + (cellSize * 0.1), cellSize * 0.8);
        } else {
          stroke(50);
          strokeWeight(1);
          noFill();
        }
        square(x * cellSize, y * cellSize, cellSize);
      }
    }

    // draw board edge
    stroke(255);
    strokeWeight(2);
    line(0, 0, 0, boardHeight);
    line(0, boardHeight, boardWidth, boardHeight);
    line(boardWidth, 0, boardWidth, boardHeight);

    // draw next piece frame
    translate(boardWidth, 0);
    line(0, 0, cellSize * 5, 0);
    line(cellSize * 5, 0, cellSize * 5, cellSize * 5);
    line(cellSize * 5, cellSize * 5, 0, cellSize * 5);
    fill(255);
    noStroke();
    rect(0, 0, cellSize * 5, cellSize * 1.5);

    noStroke();
    fill(0);
    textSize(cellSize);
    textAlign(CENTER, CENTER);
    text("NEXT", 0, 0, cellSize * 5, cellSize * 1.5);

    // draw next piece
    // const next = this.bag[0];

    textAlign(LEFT, TOP);
    translate(-boardWidth + -leftMargin, -topMargin);
  }
}

// def not copy pasted from stack overflow

const isKeyDown = (() => {
  const state = {};

  window.addEventListener("keyup", (e) => (state[e.key] = false));
  window.addEventListener("keydown", (e) => (state[e.key] = true));

  return (key) => (state.hasOwnProperty(key) && state[key]) || false;
})();

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
