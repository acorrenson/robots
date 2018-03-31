class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xg = this.x;
    this.yg = this.y;
    this.state = 0;
    this.texture = ["rover1", "rover1Right", "rover1Down", "rover1Left", "rover1s"];
    this.selected = false;
    this.step = 0;
    this.pathStep = 0;
    this.onTheGo = false;
    this.speed = 20;
  }

  select() {
    this.selected = true;
    this.state = 4;
  }

  findPathTo(x, y) {

    var map = app.map.getMap();

    var a = new MapNode(map, this.x, this.y);
    var b = new MapNode(map, x, y);

    var p = bfs(map, a, b);

    return p;
  }

  goTo(x, y) {
    if(!this.onTheGo && this.selected && (x != this.x || y != this.y)) {
      this.path = this.findPathTo(x, y);
      this.onTheGo = true;
      this.selected = false;
    }
  }

  update() {
    if(this.onTheGo && this.pathStep < this.path.length) {
      var dx = this.path[this.pathStep].x - this.x;
      var dy = this.path[this.pathStep].y - this.y;

      this.xg += dx / this.speed;
      this.yg += dy / this.speed;

      this.step += 1;
    }

    if (this.onTheGo && this.path && this.pathStep >= this.path.length) {
      this.onTheGo = false;
      this.step = 0;
      this.pathStep = 0;
      this.state = 0;
    }

    // after n transitions, check the following
    // step of the path
    if (this.step === this.speed) {
      this.x = this.path[this.pathStep].x;
      this.y = this.path[this.pathStep].y;
      this.xg = this.x;
      this.yg = this.y;
      this.step = 0;
      this.pathStep += 1;
    }

    // change texutre according to position
    if(dx < 0) this.state = 3;
    if(dx > 0) this.state = 1;
    if(dy > 0) this.state = 2;
    if(dy < 0) this.state = 0;
  }

  render() {
    var texture = this.texture[this.state];
    var image = app.images[texture];
    app.layer.drawImage(image, this.xg * 64, this.yg * 64);
  }

}