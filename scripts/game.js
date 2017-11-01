
app.updateGame = function(){

}

app.drawGame = function() {
    app.map.display();      //display map ground
    app.map.displayInfo();  //display map informations
    app.player.draw();      //draw the rover
    app.player.drawSelector();  //draw sellector
    app.player.renderPath(app.papa);
}

app.mouseGame = function(e) {
    var nx = Math.floor(e.x / 64); //pointed tile x
    var ny = Math.floor(e.y / 64); //pointed tile y

    //claim a tile
    if(app.map.map[ny][nx].toClaim && e.button == 'left'){
        app.map.map[ny][nx].claim();
        app.map.update();
        //console.log(" Tile ", nx + " " + ny + " claimed");
    }

    //select the rover
    if(nx == app.player.nx && ny == app.player.ny && e.button == 'left'){
        app.player.select();
    }

    //moove the rover
    if(app.map.map[ny][nx].claimed && app.player.selected && (ny != app.player.ny || nx != app.player.nx )) {
        app.player.mooving = true;
        app.player.fillMarked();
        var b = {x: app.player.nx, y: app.player.ny};
        var a = {x: Math.floor(app.mouse.x/64), y: Math.floor(app.mouse.y/64)}
        var p = app.player.findPathTo(app.map.map,a, b);
        app.player.followPath(p, 0);
        app.player.fillMarked();
        app.player.deselect();
    }

}

app.mouseMoveGame = function(e) {
    app.pnx = Math.floor(e.x / 64);
    app.pny = Math.floor(e.y / 64);

    if(app.pnx < 0 ){
        app.pnx = 0;
    } else if(app.pnx > app.width/64 - 1){
        app.pnx = app.width/64 - 1;
        //console.log(app.pnx)
    }

    if(app.pny < 0 ){
        app.pny = 0;
    } else if(app.pny > app.height/64 - 1){
        app.pny = app.height/64 - 1;
        //console.log(app.pny)
    }

    app.px = app.pnx * 64;
    app.py = app.pny * 64;

    if(!app.player.mooving) {
        app.player.fillMarked();
        var b = {x: app.player.nx, y: app.player.ny};
        var a = {x: Math.floor(app.mouse.x/64), y: Math.floor(app.mouse.y/64)};
        app.papa = app.player.findPathTo(app.map.map, a, b);
        app.player.fillMarked();
    }
}
