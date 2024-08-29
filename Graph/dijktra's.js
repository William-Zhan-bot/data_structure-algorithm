class Node {
  constructor(value) {
    this.value = value;
    this.visited = false;
    this.edges = [];
    this.distancefromstart = Infinity; // dijktra算法會需要跌代每一步的weights
    this.previous = null; // 算法需要 紀錄上個點以便回溯
  }
  addEdges(edge) {
    this.edges.push(edge);
  }
}

class Edge {
  // 對應到的node以及weight
  constructor(node, weight) {
    this.node = node;
    this.weight = weight;
  }
}

let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");
let F = new Node("F");

A.addEdges(new Edge(B, 2));
A.addEdges(new Edge(C, 2));
B.addEdges(new Edge(A, 2));
B.addEdges(new Edge(D, 1));
B.addEdges(new Edge(E, 4));
C.addEdges(new Edge(A, 2));
C.addEdges(new Edge(D, 1));
C.addEdges(new Edge(F, 2));
D.addEdges(new Edge(B, 1));
D.addEdges(new Edge(C, 1));
D.addEdges(new Edge(E, 2));
D.addEdges(new Edge(F, 3));
E.addEdges(new Edge(B, 4));
E.addEdges(new Edge(D, 2));
E.addEdges(new Edge(F, 1));
F.addEdges(new Edge(C, 2));
F.addEdges(new Edge(D, 3));
F.addEdges(new Edge(E, 1));

class MinHeap {
  //必須為一個queue的形式
  constructor() {
    this.values = [];
  }
  enqueue(node) {
    if (this.values.length === 0) {
      this.values.push(node);
      return true;
    }

    // 不為空時 先放入然後互換
    this.values.push(node);
    let newindex = this.values.length - 1;
    let parent_index = Math.floor((newindex - 1) / 2);

    // 比較小的網上換
    while (
      parent_index >= 0 &&
      this.values[newindex].distancefromstart <
        this.values[parent_index].distancefromstart
    ) {
      let temp = this.values[newindex];
      this.values[newindex] = this.values[parent_index];
      this.values[parent_index] = temp;

      /// parent index 疊代
      newindex = parent_index;
      parent_index = Math.floor((newindex - 1) / 2);
    }
  }

  dequeue() {
    if (this.values.length === 0) {
      return null;
    } else if (this.values === 1) {
      let result = this.values.pop();
      return result;
    } else {
      // 交換首尾 然後 minheapify
      let temp = this.values.pop();
      this.values.push(this.values[0]);
      this.values[0] = temp;
      let result = this.values.pop();

      this.minheapify(0);
      return result;
    }
  }

  minheapify(i) {
    let smallest;
    let l = i * 2 + 1;
    let r = i * 2 + 2;

    if (
      l <= this.values.length - 1 &&
      this.values[i].distancefromstart > this.values[l].distancefromstart
    ) {
      smallest = l;
    } else {
      smallest = i;
    }

    if (
      r <= this.values.length - 1 &&
      this.values[smallest].distancefromstart > this.values[r].distancefromstart
    ) {
      smallest = r;
    }

    if (smallest !== i) {
      let temp = this.values[i];
      this.values[i] = this.values[smallest];
      this.values[smallest] = temp;
      this.minheapify(smallest);
    }
  }
}

function Dijkstra(node) {
  let MH = new MinHeap();
  // 會吃入第一個頂點，所以要初始化
  node.visited = true;
  // 本算法設定起始為0
  node.distancefromstart = 0;
  MH.enqueue(A);
  MH.enqueue(B);
  MH.enqueue(C);
  MH.enqueue(D);
  MH.enqueue(E);
  MH.enqueue(F);
  let currentnode = MH.dequeue();

  while (MH.values.length > 0) {
    // 看一下剩下的edge連到哪點
    currentnode.edges.forEach((edge) => {
      let neigborNode = edge.node;
      if (neigborNode.visited === false) {
        /*
        D1=>原本預設的步數(之前累積的值or預設無限大)
        D2=>現在節點累積的權重
        D3=>相應的權重
         */

        let d1 = neigborNode.distancefromstart;
        let d2 = currentnode.distancefromstart;
        let d3 = edge.weight;
        // d2是開始的點 上面有預設起始路徑為0
        if (d1 > d2 + d3) {
          neigborNode.distancefromstart = d2 + d3;
          neigborNode.previous = currentnode;
        }
      }
    });
    // 最後加上跌代 可以重新執行迴圈
    currentnode = MH.dequeue();
  }
}

Dijkstra(A);
console.log("A's information");
console.log(A.distancefromstart);
console.log(A.previous); //起點的previous為null 沒有value屬性

console.log("B's Info");
console.log(B.distancefromstart);
console.log(B.previous.value);

console.log("C's Info");
console.log(C.distancefromstart);
console.log(C.previous.value);

console.log("D's Info");
console.log(D.distancefromstart);
console.log(D.previous.value);

console.log("E's Info");
console.log(E.distancefromstart);
console.log(E.previous.value);

console.log("F's Info");
console.log(F.distancefromstart);
console.log(F.previous.value);
