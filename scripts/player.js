function Player(){
    this.energy = 100;
    this.nx = 4;
    this.ny = 4;
    this.image = 'rover1';
    this.selected = false;

    this.select = function() {
        if(!this.selected){
            this.selected = true;
            this.image = 'rover1s';
        } else {
            this.deselect();
        }

    }

    this.deselect = function() {
        this.selected = false;
        this.image = 'rover1';
    }

    this.update = function() {

    }

    this.draw = function() {
        app.layer.drawImage(app.images[this.image], this.nx * 64, this.ny * 64);
    }

    this.drawSelector = function(x, y) {
        app.layer
            .save()
            .a(0.5)
            .fillStyle('cyan')
            .fillRect(app.px, app.py, 64, 64)
            .restore()
    }

    this.fillMarked = function() {
        this.marked = [];
        for(var a = 0; a < app.map.map.length; a++){
            var line = [];
            for(var b = 0; b < app.map.map[0].length; b++){
                line.push(false)
            }
            this.marked.push(line);
        }
    }

    this.findPathTo = function(map, target, start) {
        sx = start.x;
        sy = start.y;

        tx = target.x;
        ty = target.y;

        if( sx < 0 || sx >= map[0].length || sy < 0 || sy >= map.length ||
            !map[sy][sx].claimed || this.marked[sy][sx] ){
                return;
        }

        this.marked[sy][sx] = true;

        if( sx === tx && sy === ty )
            return [target];

        var q = undefined;

        var son = [
            {x: sx + 1, y: sy},
            {x: sx, y: sy + 1},
            {x: sx - 1, y: sy},
            {x: sx, y: sy - 1}
        ];

        for(var i = 0; i < son.length; i++) {
            var p = this.findPathTo(map, target, son[i]);
            if (p && (!q || p.length < q.length)) q = p;
        }

        var r = q && [start].concat(q);
        //console.log('FIND', r)
        return r;
    }

    this.followPath = function(path, i) {
        if(i >= path.length) return;

        app.tween(app.player)
            .to({nx: path[i].x, ny: path[i].y}, 0.5)

        setTimeout( ()=> {
            this.followPath(path, i+1)
        }, 500);
    }

}//end class
