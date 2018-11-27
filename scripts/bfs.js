
function buildMap(map) {
  var t = [];
  for (var i = 0; i < map.h; i++) {
    var line = [];
    for (var j = 0; j < map.w; j++) {
      if(map.isClaimed(j, i)) {
        line.push(0);
      } else {
        line.push(1);
      }
    }
    t.push(line);
  }
  return t;
}

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

function buildPath(node, end) {
  // build an array of MapNode
  var a = node;
  var t = [];
  while (a.parent) {
    a = a.parent;
    t.push(a);
  }
  var r = t.reverse();
  r.push(end)
  return r;
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

function includes(list, node) {
  for (let e of list) {
    if (node.equals(e)) return true;
  }
  return false;
}

function bfs(map, start, end) {
  // Breadth First Search
  // map : 2D array
  // start : starting node
  // end : target
  // Return the shortest path between START and NODE
  // accross MAP.
  
  var marked = [];
  var open = new Queue();
  var current = start;

  while(!current.equals(end)) {
    current.getSons();
    for(sons of current.sons) {
      if(!includes(marked, sons)) {
        open.enfile(sons);
        marked.push(sons);
      }
    }
    current = open.defile();
  }
  
  return buildPath(current, end);
}