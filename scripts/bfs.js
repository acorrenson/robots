
// is in map
function im(map, x, y) {
  return (x < map[0].length && x >= 0 && x >= 0 && y < map.length && y >= 0);
}

function showPath(node) {
  console.log(node.x, node.y);
  if (node.parent) {
    buildPath(node.parent);
  }
}

function buildPath(node) {
  // build an array of MapNode
  var a = node;
  var t = [];
  while (a.parent) {
    a = a.parent;
    t.push(a);
  }
  return t.reverse();
}

function dispPath(t) {
  // display the path from an array of MapNodes
  var i = 0;
  for(node of t) {
    console.log('step ' + i + ' -> ' , node.x, node.y);
    i++;
  }
}

class MapNode {
  constructor(map, x, y, parent) {
    this.x = x;
    this.y = y;
    this.map = map;
    this.sons = [];
    this.parent = parent;
  }

  getSons() {
    // get a son only if :
    // - he is in the map
    // - he is'nt a wall

    // down
    if (im(this.map, this.x, this.y+1) && this.map[this.y + 1][this.x] != 1)
      this.sons.push(new MapNode(this.map, this.x, this.y + 1, this));
    // right
    if (im(this.map, this.x+1, this.y) && this.map[this.y][this.x + 1] != 1)
      this.sons.push(new MapNode(this.map, this.x + 1, this.y, this));
    // left
    if (im(this.map, this.x-1, this.y) && this.map[this.y][this.x - 1] != 1)
      this.sons.push(new MapNode(this.map, this.x - 1, this.y, this));
    // up
    if (im(this.map, this.x, this.y-1) && this.map[this.y - 1][this.x] != 1)
      this.sons.push(new MapNode(this.map, this.x, this.y - 1, this));
  }

  equals(node) {
    // valueOfTheNode = MyValue ?
    return (node.x === this.x && node.y === this.y); 
  }
}


class Queue {
  // queue
  constructor() {
    this.elem = [];
  }

  enfile(node) {
    this.elem.push(node);
  }

  defile() {
    var a = this.elem[0];
    this.elem.splice(0, 1);
    return a;
  }
}

function bfs(map, start, end) {

  var marked = []
  var open = new Queue();

  var current = start;

  while(! current.equals(end)) {

    current.getSons();

    for(sons of current.sons) {
      if(!marked.includes(sons)) {
        open.enfile(sons);
        marked.push(sons);
      }
    }
    current = open.defile();
  }
  
  return buildPath(current);
}

// var a = new MapNode(map, 0, 0);
// var b = new MapNode(map, 3, 0);