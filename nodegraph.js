window.onload = function () {
  //When the window loads
  //Event listener for keys
  setInterval(gameFrame, 1000 / 10); //calling game function 10 times a second
};

const canvas = document.querySelector("canvas"); //used Gameboard to represent the 2d context of the canvas Node.neighbors[i]
const ctx = canvas.getContext("2d");

const gridHeight = 10;
const gridWidth = 10;
let Start = null;
let End = null;
let adjacentNodes = [];
let EndisFound = false;

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 40;
    this.color = "rgb(0,0,0)";
    this.isVisited = false;
    this.isStart = false;
    this.isEnd = false;
    this.code = "" + this.x + this.y;
    this.ucode = "" + this.x + (this.y - 1);
    this.lcode = "" + (this.x - 1) + this.y;
    this.rcode = "" + (this.x + 1) + this.y;
    this.dcode = "" + this.x + (this.y + 1);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * this.width,
      this.y * this.height,
      this.width - 2,
      this.height - 2
    );
  }
}

let gridCords = [];

for (let i = 0; i < gridHeight; i++) {
  for (let j = 0; j < gridWidth; j++) {
    gridCords.push(new Node(i, j));
  }
}

function gameFrame() {
  for (let i = 0; i < gridCords.length; i++) {
    gridCords[i].draw();
  }
}

function collides(gridCord, x, y) {
  let isCollision = false;
  for (let i =0, len = gridCord.length; i < len; i++) {
    let left = gridCord[i].x * gridCord[i].width,
      right = gridCord[i].x * gridCord[i].width + gridCord[i].width;
    let top = gridCord[i].y * gridCord[i].height,
      bottom = gridCord[i].y * gridCord[i].height + gridCord[i].height;
    if (left + right >= x && left <= x && top + bottom >= y && top <= y) {
      isCollision = gridCord[i];
    }
  }
  return isCollision;
}

canvas.addEventListener(
  "click",
  function (e) {
    let rect = collides(gridCords, e.offsetX, e.offsetY);
    if (rect) {
      console.log(rect);
      if (!End) {
        rect.isEnd = true;
        End = rect;
        rect.color = "Red";
        return;
      } else {
        if (!Start) {
          rect.isVisited = true;
          rect.isStart = true;
          Start = rect;
          rect.color = "Green";
          return;
        }
      }
    } else {
      console.log("no collision");
    }
  },
  false
);
let visitedNodes = [];
function buttonClicked() {
  if (Start && End) {
    {
      getAdjacentNodes(Start);
      while(EndisFound == false){
        bfsStep();
        
      }
      
    }
  }
}

function bfsStep() {
  let adjacentNodescopy = [];
  for (node of adjacentNodes) {
    if(checkEnd(node) == true){
      break;
    }
    setNodetoVisited(node);
    visitedNodes.push(node);
    adjacentNodescopy.push(node);
    // adjacentNodes = adjacentNodes.slice(1);
  }

  for (node of adjacentNodescopy) {
    getAdjacentNodes(node);
  }
}

function getAdjacentNodes(Node) {
  if (gridCords[parseInt(Node.ucode)]) {
    if (gridCords[parseInt(Node.ucode)].isVisited == false) {
      adjacentNodes.push(gridCords[parseInt(Node.ucode)]);
    }
  }
  if (gridCords[parseInt(Node.dcode)]) {
    if (gridCords[parseInt(Node.dcode)].isVisited == false) {
      adjacentNodes.push(gridCords[parseInt(Node.dcode)]);
    }
  }
  if (gridCords[parseInt(Node.lcode)]) {
    if (gridCords[parseInt(Node.lcode)].isVisited == false) {
      adjacentNodes.push(gridCords[parseInt(Node.lcode)]);
    }
  }
  if (gridCords[parseInt(Node.rcode)]) {
    if (gridCords[parseInt(Node.rcode)].isVisited == false) {
      adjacentNodes.push(gridCords[parseInt(Node.rcode)]);
    }
  }
}

function setNodetoVisited(Node) {
  Node.isVisited = true;
  Node.color = "Blue";
}

function checkEnd(Node) {
  if (Node == End) {
    Node.color = "Yellow";
    EndisFound = true;
    console.log(Node);
    return true;
  }
}
