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

}//end class
