
app.updateGame = function(){

}

app.drawGame = function() {
    app.map.display();
}

app.mouseGame = function(e) {
    var nx = Math.floor(e.x / 64);
    var ny = Math.floor(e.y / 64);

    if(app.map.map[ny][nx].toClaim){
        app.map.map[ny][nx].claim();
        app.map.update();
        console.log(" Tile ", nx + " " + ny + " claimed");
    }

}
