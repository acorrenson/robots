function Map(w, h){
    this.w = w;
    this.h = h;
    this.map = [];

    this.generate = function(){
        for(var y = 0; y < h; y++) {
            var line = [];
            var char;
            for(var x = 0; x < w; x++) {
                var choice = randInt(2);
                if(choice >= 1){
                    char = 0;
                } else {
                    char = 1;
                }
                var tile = new Tile(x*64, y*64, char);
                //tile.alpha = Math.floor(dist(tile.x/64, tile.y/64, this.w/2, this.h/2 ))* 0.101 + 0.5;
                line.push(tile);
            }
            this.map.push(line);
        }
    }

    this.parse = function( action ){
        for(var y = 0; y < h; y++ ){
            for(var x = 0; x < w; x++){
                action(x, y);
            }
        }
    }

    this.update = function() {
        for(var i = 0; i < app.claimed.length; i++){
            if(app.claimed[i].toClaim){
                app.claimed[i].toClaim = false;
            }
            var nx = app.claimed[i].x / 64;
            var ny = app.claimed[i].y / 64;

            if(ny - 1 >= 0 && !app.map.map[ny-1][nx].claimed){
                app.map.map[ny-1][nx].toClaim = true;
            }
            if(ny + 1 < this.h && !app.map.map[ny+1][nx].claimed){
                app.map.map[ny+1][nx].toClaim = true;
            }
            if(nx - 1 >= 0 && !app.map.map[ny][nx-1].claimed){
                app.map.map[ny][nx-1].toClaim = true;
            }
            if(nx + 1 < this.w && !app.map.map[ny][nx+1].claimed){
                app.map.map[ny][nx+1].toClaim = true;
            }

        }
    }

    this.displayInfo = function() {
        var display = (x, y) => {
            var tile = this.map[y][x];
            if(tile.toClaim){
                app.layer.save();
                app.layer.a(0.8);
                app.layer.fillStyle('black');
                app.layer.fillRect(tile.x, tile.y, 64, 64);
                app.layer.restore()
                app.layer.drawImage(app.images["plus"], tile.x, tile.y);
            } else if(!tile.toClaim) {
                app.layer.save();
                app.layer.a(tile.alpha);
                app.layer.fillStyle('black');
                app.layer.fillRect(tile.x, tile.y, 64, 64);
                app.layer.restore()
            }
        }
        this.parse(display);
    }

    this.display = function() {
        var display = (x, y) => {
            var tile = this.map[y][x]
            switch (tile.type) {
                case 0:
                    var color = "yellow";
                    break;
                case 1:
                    var color = "orange";
                    break;
            }

            app.layer.fillStyle(color);
            app.layer.fillRect(tile.x, tile.y, 64, 64);
            app.layer.drawImage(app.images["mars"], tile.x, tile.y);

        }
        this.parse(display);
    }
}
