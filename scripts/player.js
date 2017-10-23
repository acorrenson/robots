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

    this.drawPath = function() {
        var xToGo = Math.floor(app.mouse.x/64);
        var yToGo = Math.floor(app.mouse.y/64);

        var yToWalkS = this.ny - Math.floor(app.mouse.y/64);
        var xToWalkS = this.nx - Math.floor(app.mouse.x/64);

        var yToWalk = Math.abs(yToWalkS);
        var xToWalk = Math.abs(xToWalkS);

        if(xToWalk != 0 ){var modifx  = xToWalk/xToWalkS*-1} else {modifx = -1};
        if(yToWalk != 0 ){var modify  = yToWalk/yToWalkS*-1} else {modify = 1};

        //console.log(xToWalk);

        if(modifx > 0){
            for(var x = this.nx; x < this.nx + xToWalk; x++) {
                app.layer.fillStyle("red");
                app.layer.fillRect(x * 64, this.ny * 64, 64, 64);
            }
        } else if(modifx < 0) {
            for(var x = this.nx; x > this.nx - xToWalk; x--) {
                app.layer.fillStyle("red");
                app.layer.fillRect(x * 64, this.ny * 64, 64, 64);
            }
        }

        if(modify > 0){
            for(var y = this.ny; y < this.ny + yToWalk; y++) {
                app.layer.fillStyle("red");
                app.layer.fillRect(xToGo * 64, y * 64, 64, 64);
            }
        } else if(modify < 0) {
            for(var y = this.ny; y > this.ny - yToWalk; y--) {
                app.layer.fillStyle("red");
                app.layer.fillRect(xToGo * 64, y * 64, 64, 64);
            }
        }


    }//end drawPath

    this.findPath = function(nx, ny) {
        /*var lx = nx - this.nx;
        var ly = ny - this.ny;

        if(lx != 0) {
            var dirx = lx / Math.abs(lx);
        } else {
            dirx = 0;
        }
        if(ly != 0) {
            var diry = ly / Math.abs(ly);
        } else {
            diry = 0;
        }*/

        q = [];
        while(this.nx != nx || this.ny != ny) {
            var lx = nx - this.nx;
            var ly = ny - this.ny;

            if(lx != 0) {
                var dirx = lx / Math.abs(lx);
            } else {
                dirx = 1;
            }
            if(ly != 0) {
                var diry = ly / Math.abs(ly);
            } else {
                diry = 1;
            }
            console.log('dirx : ' + dirx + ' ' + 'diry : ' + diry);
            console.log('lx : ' + lx + ' ' + 'ly : ' + ly);

            var son1 = {x: this.nx + dirx, y: this.ny};
            var son2 = {x: this.nx, y: this.ny + diry};
            var son3 = {x: this.nx - dirx, y: this.ny};
            var son4 = {x: this.nx, y: this.ny - diry};

            console.log('son 1 ', son1)
            console.log('son 2 ', son2)
            console.log('son 3 ', son3)
            console.log('son 4 ', son4)

            var son = [son1, son2, son3, son4]

            if(app.map.map[son1.y][son1.x].claimed && this.nx != nx && !app.map.map[son1.y][son1.x].explored ) {
                app.map.map[son1.y][son1.x].explored = true;
                this.nx = son1.x;
                console.log('gox' + dirx);

            } else  if(app.map.map[son2.y][son2.x].claimed && (this.ny != ny || this.nx != nx) && !app.map.map[son2.y][son2.x].explored) {
                app.map.map[son2.y][son2.x].explored = true;
                this.ny = son2.y;
                console.log('goy' + diry)

            } else if(app.map.map[son3.y][son3.x].claimed && (this.nx != nx || this.ny != ny) && !app.map.map[son3.y][son3.x].explored){
                app.map.map[son3.y][son3.x].explored = true;
                this.nx = son3.x;
                console.log('gox' + (-1*dirx) );

            } else if(app.map.map[son4.y][son4.x].claimed && (this.ny != ny || this.nx != nx) && !app.map.map[son4.y][son4.x].explored){
                app.map.map[son4.y][son4.x].explored = true;
                this.ny = son4.y;
                console.log('goy' + (-1*diry) );

            } else {
                console.log('impossible');
                break;
            }


        }//end while
        for(var a = 0; a < app.map.map.length;a++) {
            for(var b = 0; b < app.map.map[0].length; b++) {
                app.map.map[a][b].explored = false;
            }
        }
        return q;
    }

    this.findPathTo = function(nx, ny) {
        if(nx >= 0 && nx < app.map.map[0].length && ny >= 0 && ny < app.map.map.length && app.map.map[ny][nx].claimed){
            this.findPath(nx, ny);
        } else {
            console.log('impossible to reach')
        }
    }


}//end class
