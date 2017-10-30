
app.updateGame = function(){

}

app.drawGame = function() {
    app.map.display();      //display map ground
    app.map.displayInfo();  //display map informations
    app.player.draw();      //draw the rover
    app.player.drawSelector();  //draw sellector
}

app.mouseGame = function(e) {
    var nx = Math.floor(e.x / 64); //pointed tile x
    var ny = Math.floor(e.y / 64); //pointed tile y

    //claim a tile
    if(app.map.map[ny][nx].toClaim && e.button == 'left'){
        app.map.map[ny][nx].claim();
        app.map.update();
        console.log(" Tile ", nx + " " + ny + " claimed");
    }

    //select the rover
    if(nx == app.player.nx && ny == app.player.ny && e.button == 'left'){
        app.player.select();
    }

    //moove the rover
    if(app.map.map[ny][nx].claimed && app.player.selected && (ny != app.player.ny || nx != app.player.nx )) {
        app.player.fillMarked();
        var b = {x: app.player.nx, y: app.player.ny};
        var a = {x: Math.floor(app.mouse.x/64), y: Math.floor(app.mouse.y/64)}
        setTimeout(()=> {
            var p = app.player.findPathTo(app.map.map,a, b, 0);
            app.player.followPath(p, 0);
            app.player.fillMarked();
        }, 1000);
        app.player.deselect();
    }

}

app.mouseMoveGame = function(e) {
    app.px = Math.floor(e.x / 64) * 64;
    app.py = Math.floor(e.y / 64) * 64;

    if(app.px < 0 ){
        app.px = 0;
    } else if(app.px > app.width - 64){
        app.px = app.width - 64;
    }

    if(app.py < 0 ){
        app.py = 0;
    } else if(app.py > app.height - 64){
        app.py = app.height - 64;
    }

}
