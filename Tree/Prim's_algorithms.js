// 建構圖形 節點跟EDGE分開
class Node {
  constructor(value) {
    this.value = value;
    this.visited = false; // 是否有拜訪過
    this.edges = [];
  }

  addneighbor(edge) {
    this.edges.push(edge);
  }
}
// 產生節點
let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");
let F = new Node("F");
let allNodes = [A, B, C, D, E, F];

class Edge {
  constructor(node1, node2, weight) {
    // 每個edge連接兩個node
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;
  }
}
// 產生邊長 並連接節點
let e1 = new Edge(A, B, 10);
A.addneighbor(e1);
B.addneighbor(e1);
let e2 = new Edge(A, C, 8);
A.addneighbor(e2);
C.addneighbor(e2);
let e3 = new Edge(B, D, 6);
B.addneighbor(e3);
D.addneighbor(e3);
let e4 = new Edge(C, D, 5);
C.addneighbor(e4);
D.addneighbor(e4);
let e5 = new Edge(B, E, 7);
B.addneighbor(e5);
E.addneighbor(e5);
let e6 = new Edge(D, E, 4);
D.addneighbor(e6);
E.addneighbor(e6);
let e7 = new Edge(D, F, 3);
D.addneighbor(e7);
F.addneighbor(e7);
let e8 = new Edge(E, F, 1);
E.addneighbor(e8);
F.addneighbor(e8);
let e9 = new Edge(C, F, 8);
C.addneighbor(e9);
F.addneighbor(e9);

/*思路分析*/
/*
原則上就是兩步驟:
1. 讀取每個節點
2. 讀取該節點的邊長，並選出權重最低，確定不會構成迴圈後加入

下面執行面，一開始要給出一開始的"起始節點"
之後找到第一個起始節點的"最佳edge"
然後放入，訪問下一個

因為會用到比較的關係 所以會由"起始節點"和"最佳edge" 當起始的比較值
之後由存入的部分開始
迴圈執行: 存入->拜訪下一節點->找到最佳
的部分
*/

let bucket = []; // 放置該節點所有邊長的
// 演算法開頭
function mstprim(startnode) {
  let mstEdges = []; //放置最佳edge
  //找一個節點當開始 先收入她周圍的節點
  for (let i = 0; i < startnode.edges.length; i++) {
    bucket.push(startnode.edges[i]);
  }

  // 回傳一個best edge
  let bestedge = getbestedge();

  let i = 0;
  // 確定有了best edge之後設定節點
  while (bestedge !== null) {
    /* 深度討論專用
    i += 1;
    console.log("輪次:", i, "比較完成");*/

    // 處理節點的拜訪紀錄
    let n1 = bestedge.node1;
    let n2 = bestedge.node2;
    n1.visited = true;
    n2.visited = true;
    // 紀錄edge
    mstEdges.push(bestedge);

    // 清空節點的所有edge
    bucket = [];
    // 讓每個節點都跑一次
    allNodes.forEach((node) => {
      // 確認哪些拜訪過
      if (node.visited === true) {
        // 逐個檢查拜訪過的節點的edges
        node.edges.forEach((edge) => {
          if (mstEdges.includes(edge) === false) {
            // 如果拜訪過節點的邊，不在mst.edges裡面
            //那就可以先放入bucket計算
            // 每個邊都有自己的名字，不用擔心碰撞
            bucket.push(edge);
          }
        });
      }
    });
    bestedge = getbestedge();
  }
  return mstEdges;
}

// 找到最小的 適合放在bst裡面的edge
function getbestedge() {
  let bestedge = null;
  while (bestedge === null && bucket.length !== 0) {
    // find best edge
    // 先拿第一個edge當比較的基礎
    bestedge = bucket[0];
    let index = 0;

    // foreach預設的三個函數(item index array)
    bucket.forEach((edge, i) => {
      // 找到weight最小的edge與其index
      if (edge.weight < bestedge.weight) {
        bestedge = edge;
        index = i;
      }
    });

    // 檢查bestedge是否為非loop edge
    // 如果是的話從 bucket刪除 重啟while迴圈

    // 當node1 跟 node2都被拜訪過 代表不能加入mst
    if (bestedge.node1.visited == true && bestedge.node2.visited == true) {
      // 相當於從bucket裡面的第index開始
      // ，移除1個元素的意思
      bucket.splice(index, 1);
      bestedge = null;
    }
  }
  /*console.log("本輪bucket", bucket); //詳細研究每一輪專用*/
  return bestedge;
}

console.log(mstprim(A));
