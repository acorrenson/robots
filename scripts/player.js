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

        console.log(xToWalk);

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

    this.findPathTo = function(nx, ny) {
        var lx = nx - this.nx;
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
        }

        while(this.nx != nx || this.ny != ny) {
            if(app.map.map[this.ny][this.nx+dirx].claimed && this.nx != nx){
                this.nx += dirx;
                console.log("go x")
            } else {
                if(app.map.map[this.ny+diry][this.nx].claimed && this.ny != ny){
                    this.ny += diry;
                    console.log("go y")
                } else {
                    break;
                }
            }
        }//end while
    }


}//end class
