class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.alpha   = 0.98;
    this.reveal  = true;
    this.claimed = false;

  }
  claim() {
    app.claimed.push(this);
    this.alpha = 0;
    this.claimed = true;
  }
}
