function randInt(a){
    return Math.floor( Math.random() * a  );
}

function dist(x, y, x2, y2){
    var a = (x2 - x);
    var b = (y2 - y);
    return Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2))
}

var marked = [ [], [], [], [], [], [], [], [], [] ];

function find(map, target, start, k) {
    sx = start.x;
    sy = start.y;

    tx = target.x;
    ty = target.y;

    if( sx < 0 || sx >= map[0].length || sy < 0 || sy >= map.length ||
        !map[sy][sx].claimed || marked[sy][sx] )
        return;

    marked[sy][sx] = true;

    if( sx === tx && sy === ty )
        return [target];

    var q = undefined;

    var son = [
        {x: sx, y: sy + 1},
        {x: sx, y: sy - 1},
        {x: sx - 1, y: sy},
        {x: sx + 1, y: sy}
    ];

    for(var i = 0; i < son.length; i++) {
        var p = find(map, target, son[i], k + 1);
        //if(k == 0) console.log('son :', i, 'deep :', k, p)
        if (p && (!q || p.length < q.length)) q = p;
    }

    var r = q && [start].concat(q);
    console.log('FIND',start,r);
    return r;
}

document.addEventListener('keydown', ()=>{
    console.log(find(app.map.map,{x:3, y:4}, {x:0,y:5}, 0));
})
