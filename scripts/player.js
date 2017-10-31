function Player(){
    this.energy = 100;
    this.nx = 4;
    this.ny = 4;
    this.image = 'rover1';
    this.selected = false;
    //this.marked = [];

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
        //this.image = 'rover1';
    }

    this.update = function() {

    }

    this.draw = function() {
        app.layer.drawImage(app.images[this.image], this.nx * 64, this.ny * 64);
        var x = this.nx * 64;
        var y = this.ny * 64;
        var w = this.energy/100*52;
        app.layer.fillStyle('white');
        app.layer.fillRect(x+6, y-8, 52, 6);
        app.layer.fillStyle('cyan');
        app.layer.fillRect(x+6, y-8, w, 6);
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
        var marked = [];
        for(var a = 0; a < app.map.map.length; a++){
            var line = [];
            for(var b = 0; b < app.map.map[0].length; b++){
                line.push(false)
            }
            marked.push(line)
        }
        this.marked = marked;
        return marked;
    }

    this.findPathTo = function(map, target, start, k) {
        //console.log(this.marked);
        var sx = start.x;
        var sy = start.y;

        var tx = target.x;
        var ty = target.y;

        if( sx < 0 || sx >= map[0].length || sy < 0 || sy >= map.length || !map[sy][sx].claimed ||
            app.player.marked[sy][sx] ){
                return;
        }

        app.player.marked[sy][sx] = true;

        if( sx === tx && sy === ty )
            return [target];

        var q = undefined;

        var dirx = Math.sign(tx - sx);
        var diry = Math.sign(ty - sy);

        var prio;

        if(Math.abs(dirx) === 0) {
            dirx = 1;
            prio = 'y';
        }

        if(Math.abs(diry) === 0) {
            diry = 1;
            prio = 'x';
        }

        //console.log(dirx, diry)

        var son1 = {x: sx + dirx, y: sy};
        var son2 = {x: sx, y: sy + diry};
        var son3 = {x: sx - dirx, y: sy};
        var son4 = {x: sx, y: sy - diry};

        if(!prio) {
            var son = [
                son1,son2, son3, son4
            ];
        } else if(prio === 'y') {
            var son = [
                son2, son1, son4, son3
            ]
        } else if(prio === 'x') {
            var son = [
                son1,son2, son3, son4
            ]
        }

        for(var i = 0; i < son.length; i++) {
            var p = app.player.findPathTo(map, target, son[i], k+1);
            if (p && (!q || p.length < q.length)) q = p;
        }
        var r = q && [start].concat(q);
        return r;
    }

    this.followPath = function(path, i) {
        this.energy -= 1;
        if(i >= path.length){
            setTimeout( () => {
                this.image = 'rover1';
            }, 200);
            return;
        }

        var a = path[i].x - this.nx;
        var b = path[i].y - this.ny;

        if(a <= -1){
            this.image = 'rover1Left';
        } else if(a > 0) {
            this.image = 'rover1Right';
        }

        if(b <= -1) {
            this.image = 'rover1';
        } else if(b >= 1){
            this.image = 'rover1Down';
        }

        app.tween(app.player)
            .to({nx: path[i].x, ny: path[i].y}, 0.5)

        setTimeout( () => {
            this.followPath(path, i+1)
        }, 500);
    }

}//end class
