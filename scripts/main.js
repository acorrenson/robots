var app = playground({

  width: 64*12,
  height: 64*9,

  create: function() {
    this.sta = 'game';
    this.player = new Player(4, 4);
    this.map = new Map(12, 9);
    this.map.generate();
    this.claimed = [];
    this.map.tiles[4][4].claim();
    this.map.tiles[4][5].claim();
    this.map.tiles[4][3].claim();
    this.map.tiles[3][4].claim();
    this.map.tiles[5][4].claim();

    this.loadImages(
      'plus',
      'mars',
      'rover1',
      'rover1s',
      'rover1Left',
      'rover1Right',
      'rover1Down'
      );
  },

  renderCursor: function() {
    this.layer.save();
    this.layer.a(0.5);
    var c = "cyan";
    if(!this.map.isClaimed(this.mx, this.my)) c = "red"
    this.layer.fillStyle(c);
    this.layer.fillRect(this.mx*64, this.my*64, 64, 64);
    this.layer.restore();
  },

  mousedown: function(e) {
    var mx = Math.floor(e.x/64);
    var my = Math.floor(e.y/64);
    this.map.claim(mx, my);
    if(mx == this.player.x && my == this.player.y)
      this.player.select();
    if(this.map.isClaimed(mx, my))
      this.player.goTo(mx, my);
  },

  mousemove: function(e) {
    this.mx = Math.floor(e.x/64);
    this.my = Math.floor(e.y/64);
  },

  step: function() {
    this.map.update();
    this.player.update();
  },

  render: function() {
    this.map.render();
    this.renderCursor();
    this.player.render();
  }

});
