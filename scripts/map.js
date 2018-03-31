class Map {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.tiles = [];
  }

  generate() {
    for (var i = 0; i < this.h; i++) {
      var line = [];
      for (var j = 0; j < this.w; j++) {
        line.push(new Tile(1));
      }
      this.tiles.push(line);
    }
  }

  claim(x, y) {
    if (this.in(x, y) && this.tiles[y][x].toClaim)
      this.tiles[y][x].claim();
  }

  getMap() {
    var t = [];
    for (var i = 0; i < this.h; i++) {
      var line = [];
      for (var j = 0; j < this.w; j++) {
        if(this.isClaimed(j, i)) {
          line.push(0);
        } else {
          line.push(1);
        }
      }
      t.push(line);
    }
    return t;
  }

  render() {
    for (var i = 0; i < this.h; i++) {
      for (var j = 0; j < this.w; j++) {
        this.tiles[i][j].render(i, j);
      }
    }
  }

  in(x, y) {
    return (x < this.w && x >= 0 && y < this.h && y >= 0);
  }

  isClaimed(x, y) {
    if (this.in(x, y))
      return this.tiles[y][x].claimed;
  }

  update() {
    for (var i = 0; i < this.h; i++) {
      for (var j = 0; j < this.w; j++) {
        if(this.tiles[i][j].claimed) {
          if (this.in(j+1, i))
            this.tiles[i][j+1].toClaim = true;
          if (this.in(j-1, i))
            this.tiles[i][j-1].toClaim = true;
          if (this.in(j, i+1))
            this.tiles[i+1][j].toClaim = true;
          if (this.in(j, i-1))
            this.tiles[i-1][j].toClaim = true;
        }
      }
    }
  }

}
