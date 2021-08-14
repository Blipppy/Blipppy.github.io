class Board {
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.blocks = new Array(width * height);
    this.bag = shuffle(dicts.pieces.slice(0));
    this.tetromino = new Tetromino(this.bag.splice(0, 1));
    this.animation = false;
    this.currAnimFrame = 0;

    // this.blocks[50] = "yellow";
    // this.blocks[59] = "yellow";

    for (let i = 50; i < 60; i++) {
      this.blocks[i] = 'yellow';
    }

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
      let increment = dir == 'cw' ? 1 : 0;
      this.tetromino.rotation += increment;
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
      this.tetromino.rotation -= increment;
      this.tetromino.grid =
        dicts.pieceInfo.grid[this.tetromino.piece][this.tetromino.rotation % 4];
      return false;
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

    return true;
  }

  getLines() {
    let lines = [];

    for (let i = 0; i < this.height; i++) {
      if (this.checkLine(i)) {
        lines.push(i);
      }
    }

    return lines;
  }

  checkLine(line) {
    for (let j = 0; j < this.width; j++) {
      if (!this.blocks[line * this.width + j]) {
        return false;
      }
    }
    return true;
  }
  
  clearLines() {
    let lines = this.getLines();
    let clearedLines = 0;
    for (let i = this.height - 1; i >= 0; i--) {
      if (lines.includes(i)) {
        for (let j = 0; j < this.width; j++) {
          this.blocks[i * this.width + j] = undefined;
        }
        clearedLines++;
      } else {
        for (let j = 0; j < this.width; j++) {
          this.blocks[(i + clearedLines) * this.width + j] = this.blocks[i * this.width + j]
        }
      }
    }
    return lines;
  }

  draw(cellSize) {
    this.clearLines();

    let originalY = this.tetromino.pos.y;

    while (this.drop()) {}

    let ghost = this.tetromino.getGlobalPos();
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
          strokeWeight(1);
          stroke(this.blocks[globalPos])
          fill(this.blocks[globalPos]);
        } else if (this.tetromino.getGlobalPos().includes(globalPos)) {
          strokeWeight(1);
          stroke(this.tetromino.color)
          fill(this.tetromino.color);
        } else if (ghost.includes(globalPos)) {
          let c = color(this.tetromino.color);
          c.setAlpha(75);
          strokeWeight(1);  
          stroke(c)
          fill(c);
          // stroke(c);
          // strokeWeight(3);
          // noFill();
          // square((x * cellSize) + (cellSize * 0.1), (y * cellSize) + (cellSize * 0.1), cellSize * 0.8);
          // stroke(50);
          // strokeWeight(1);
          // noFill();
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