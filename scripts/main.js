var app = playground({

    width: 64*9,
    height: 64*9,
    smoothing: false,

    create: function() {
        this.sta = 'game';
        this.map = new Map(9, 9);
        this.map.generate();
        this.claimed = [];
        this.map.map[4][4].claim();
        this.map.map[4][5].claim();
        this.map.map[4][3].claim();
        this.map.map[3][4].claim();
        this.map.map[5][4].claim();
        this.map.update();

        this.loadImages('plus','mars');
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
