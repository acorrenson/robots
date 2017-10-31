var app = playground({

    width: 64*12,
    height: 64*9,
    //smoothing: false,

    create: function() {
        this.sta = 'game';
        this.player = new Player();
        this.map = new Map(12, 9);
        this.map.generate();
        this.claimed = [];
        this.map.map[4][4].claim();
        this.map.map[4][5].claim();
        this.map.map[4][3].claim();
        this.map.map[3][4].claim();
        this.map.map[5][4].claim();
        this.map.update();

        this.loadImages(
            'plus','mars','rover1',
            'rover1s','rover1Left',
            'rover1Right','rover1Down'
        );
    },

    mousedown: function(e) {
        switch (this.sta) {
            case 'menu':
                this.mouseMenu(e);
                break;
            case 'game':
                this.mouseGame(e);
                break;
        }
    },

    mousemove: function(e) {
        app.mouseMoveGame(e);
    },

    keydown: function(e) {
        //console.log(e.key)
    },

    step: function() {
        switch (this.sta) {
            case 'menu':
                this.updateMenu();
                break;
            case 'game':
                this.updateGame();
                break;
        }
    },

    render: function() {
        this.layer.clear("#333")
        switch (this.sta) {
            case 'menu':
                this.drawMenu();
                break;
            case 'game':
                this.drawGame();
                break;
        }
    },

});
