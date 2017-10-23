function randInt(a){
    return Math.floor( Math.random() * a  );
}

function dist(x, y, x2, y2){
    var a = (x2 - x);
    var b = (y2 - y);
    return Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2))
}

app.read = function() {
    app.marked = [];
    for(var a = 0; a < app.map.map.length; a++){
        var line = [];
        for(var b = 0; b < app.map.map[0].length; b++){
            line.push(false)
        }
        app.marked.push(line);
    }
}

app.find = function(map, target, start) {
    sx = start.x;
    sy = start.y;

    tx = target.x;
    ty = target.y;
    
    if( sx < 0 || sx >= map[0].length || sy < 0 || sy >= map.length ||
        !map[sy][sx].claimed || app.marked[sy][sx] ){
            return;
    }

    app.marked[sy][sx] = true;

    if( sx === tx && sy === ty )
        return [target];

    var q = undefined;

    var son = [
        {x: sx + 1, y: sy},
        {x: sx - 1, y: sy},
        {x: sx, y: sy + 1},
        {x: sx, y: sy - 1}
    ];

    for(var i = 0; i < son.length; i++) {
        console.log(son[i]);
        var p = app.find(map, target, son[i]);
        if (p && (!q || p.length < q.length)) q = p;
    }

    var r = q && [start].concat(q);
    //console.log('FIND',start,r);
    return r;
}
