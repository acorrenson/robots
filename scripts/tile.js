class Tile {
  constructor(type) {
    this.type = type;
    this.alpha   = 0.98;
    this.reveal  = true;
    this.claimed = false;
    this.toClaim = false;

  }

  claim() {
    this.alpha = 0;
    this.claimed = true;
    this.toClaim = false;
  }

  render(i, j) {
    app.layer.save();
    app.layer.drawImage(app.images['mars'], j * 64, i * 64);
    app.layer.a(this.alpha)
    app.layer.fillStyle('black');
    app.layer.fillRect(j * 64, i * 64, 64, 64);
    if(this.toClaim)
      app.layer.drawImage(app.images['plus'], j * 64, i * 64);
    app.layer.restore();
  }
}
