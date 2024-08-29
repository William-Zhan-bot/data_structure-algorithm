class Node {
  constructor(value) {
    this.value = value;
    this.neighbors = [];
    this.visited = false;
  }

  addNeighbor(n) {
    this.neighbors.push(n);
  }
}

let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");
let F = new Node("F");
let G = new Node("G");
let H = new Node("H");
let I = new Node("I");
let J = new Node("J");
let K = new Node("K");
let L = new Node("L");
let M = new Node("M");

A.addNeighbor(E);
A.addNeighbor(F);
B.addNeighbor(D);
C.addNeighbor(D);
D.addNeighbor(B);
D.addNeighbor(C);
D.addNeighbor(E);
D.addNeighbor(I);
E.addNeighbor(A);
E.addNeighbor(D);
E.addNeighbor(F);
E.addNeighbor(I);
F.addNeighbor(A);
F.addNeighbor(E);
F.addNeighbor(I);
G.addNeighbor(H);
G.addNeighbor(I);
H.addNeighbor(G);
H.addNeighbor(I);
H.addNeighbor(L);
I.addNeighbor(D);
I.addNeighbor(E);
I.addNeighbor(F);
I.addNeighbor(G);
I.addNeighbor(H);
I.addNeighbor(J);
I.addNeighbor(K);
I.addNeighbor(M);
J.addNeighbor(I);
J.addNeighbor(M);
K.addNeighbor(I);
K.addNeighbor(L);
K.addNeighbor(M);
L.addNeighbor(H);
L.addNeighbor(K);
M.addNeighbor(I);
M.addNeighbor(J);
M.addNeighbor(K);

let result = [];

function dft(node) {
  node.visited = true; // 標記為拜訪過
  result.push(node); // 加入結果柱列
  for (let i = 0; i < node.neighbors.length; i++) {
    // 找到相鄰的鄰居
    if (node.neighbors[i].visited === false) {
      // 沒有拜訪過的執行一次dft
      dft(node.neighbors[i]);
    }
  }
}

function bst(start) {
  let queue = [];
  queue.push(start);
  while (queue.length !== 0) {
    let firstNode = queue.shift();
    if (firstNode.visited === false) {
      firstNode.visited = true;
      result.push(firstNode.value);

      for (let i = 0; i < firstNode.neighbors.length; i++) {
        if (firstNode.neighbors[i].visited === false) {
          queue.push(firstNode.neighbors[i]);
        }
      }
    }
  }
}

// dft(A);
// for (let i = 0; i < result.length; i++) {
//   console.log(result[i].valueX);
// }

bst(A);
console.log(result);
for (let i = 0; i < result.length; i++) {
  console.log(result[i]);
}
