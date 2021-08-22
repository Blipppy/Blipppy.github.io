class Tetromino {
  constructor(piece) {
    this.piece = piece;
    this.color = dicts.pieceInfo.color[piece];
    this.rotation = 0;
    this.pos = { x: 3, y: 17 };
    this.width = piece == 'i' || piece == 'o' ? 4 : 3;
    // this.height = piece == 'i' ? 4 : 3;
    this.grid = dicts.pieceInfo.grid[piece][this.rotation];
  }

  getGlobalPos() {
    let minoes = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i] == 1) {
        let x = this.pos.x + (i % this.width);
        let y = this.pos.y + Math.floor(i / this.width);
        minoes.push(y * game.board.width + x);
      }
    }

    return minoes;
  }

  getMinoPairs() {
    let minoes = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i] == 1) {
        let x = this.pos.x + (i % this.width);
        let y = this.pos.y + Math.floor(i / this.width);
        minoes.push([x, y]);
      }
    }

    return minoes;
  }
}
