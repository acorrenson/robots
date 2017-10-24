
app.updateGame = function(){

}

app.drawGame = function() {
    app.map.display();
    //if(app.player.selected) app.player.drawPath(app.player.calcPath());
    app.map.displayInfo();
    app.player.draw();
    app.layer.save();
    app.layer.a(0.5);
    app.layer.fillStyle('cyan');
    app.layer.fillRect(app.px, app.py, 64, 64);
    app.layer.restore();
}

app.mouseGame = function(e) {
    //case pointée
    var nx = Math.floor(e.x / 64);
    var ny = Math.floor(e.y / 64);

    //claim if left clicked
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
        var p = app.player.findPathTo(app.map.map,a, b);
        app.player.followPath(p, 0)
        app.player.deselect();
    }

}

app.mouseMoveGame = function(e) {
    app.px = Math.floor(e.x / 64) * 64;
    app.py = Math.floor(e.y / 64) * 64;
}
