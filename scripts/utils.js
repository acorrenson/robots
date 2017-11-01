function randInt(a){
    return Math.floor( Math.random() * a  );
}

function dist(x, y, x2, y2){
    var a = (x2 - x);
    var b = (y2 - y);
    return Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2))
}
