class Game {
  constructor() {
    this.board = new Board();
    this.config = {
      das: 10,
      arr: 2,
      sds: 4
    };
    this.keybinds = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'z', 'x', 'c', ' '];
    this.heldKeys = this.keybinds.reduce(
      (a, c) => ({
        ...a,
        [c]: 0
      }),
      {}
    );
    this.lastDropTime = 0;
  }

  doGameTick() {
    // THINGS TO CHECK EVERY GAME TICK
    // - check for lines
    this.board.clearLines();

    // - check for animation

    // - keys pressed
    const keys = this.keybinds.reduce(
      (a, c) => ({
        ...a,
        [c]: isKeyDown(c)
      }),
      {}
    );

    // - if gravity should happen

    // THINGS TO EXECUTE
    // - hard drop
    if (keys[' '] == true && this.heldKeys[' '] == 0) {
      while (this.board.drop()) {}
      this.board.place();
    }

    // - shifting
    let leftShift = false;
    let rightShift = false;

    if (keys['ArrowLeft'] == true) {
      if (this.heldKeys['ArrowLeft'] == 0) {
        leftShift = true;
      } else if (this.heldKeys['ArrowLeft'] >= this.config.das) {
        if ((this.heldKeys['ArrowLeft'] - this.config.das) % this.config.arr == 0) {
          leftShift = true;
        }
      }
    }

    if (keys['ArrowRight'] == true) {
      if (this.heldKeys['ArrowRight'] == 0) {
        rightShift = true;
      } else if (this.heldKeys['ArrowRight'] >= this.config.das) {
        if ((this.heldKeys['ArrowRight'] - this.config.das) % this.config.arr == 0) {
          rightShift = true;
        }
      }
    }

    if (leftShift == true) this.board.shift('left');
    if (rightShift == true) this.board.shift('right');

    // - rotation
    if (keys['ArrowUp'] == true && this.heldKeys['ArrowUp'] == 0) this.board.rotate('cw');

    // - gravity/soft drop
    let drop = false;

    if (Date.now() - this.lastDropTime >= 1000) {
      drop = true;
    } else if (keys['ArrowDown'] == true) {
      if (this.heldKeys['ArrowDown'] == 0) {
        drop = true;
      } else if (this.heldKeys['ArrowDown'] % this.config.sds == 0) {
        drop = true;
      }
    }

    if (drop == true) {
      const drop = this.board.drop();
      if (drop) this.lastDropTime = Date.now();
    }

    // update held key frames
    for (const key in keys) {
      if (keys[key] == true) {
        this.heldKeys[key] += 1;
      } else {
        this.heldKeys[key] = 0;
      }
    }
  }
}

const isKeyDown = (() => {
  const state = {};

  window.addEventListener('keyup', (e) => (state[e.key] = false));
  window.addEventListener('keydown', (e) => (state[e.key] = true));

  return (key) => (state.hasOwnProperty(key) && state[key]) || false;
})();
