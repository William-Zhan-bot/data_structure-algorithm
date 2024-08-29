class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.path = ""; //紀錄traversal
    this.queue = [];
  }

  treeInsert(z) {
    let y = null;
    let x = this.root;
    while (x !== null) {
      // 這樣到底下沒有child的node
      // x 會等於null 迴圈仍然會停止運作
      y = x;
      // 比較大小
      if (z.key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    if (y == null) {
      //假設根本沒有元素
      this.root = z;
    } else if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }
  }

  bftsearch(n) {
    if (n !== null) {
      this.queue.push(n);
      for (let i = 0; i < this.queue.length; i++) {
        let currentnode = this.queue[i];
        // q是this的屬性 所以會一直變化
        if (currentnode !== null) {
          if (currentnode.left !== null) {
            this.queue.push(currentnode.left);
          }
          if (currentnode.right !== null) {
            this.queue.push(currentnode.right);
          }
        }
      }
    }
  }

  preorder(n) {
    if (n !== null) {
      this.path += n.key + " ";
      this.preorder(n.left);
      this.preorder(n.right);
    }
  }

  inorder(n) {
    if (n !== null) {
      this.inorder(n.left);
      this.path += n.key + " ";
      this.inorder(n.right);
    }
  }

  postorder(n) {
    if (n !== null) {
      this.postorder(n.left);
      this.postorder(n.right);
      this.path += n.key + " ";
    }
  }

  // search

  reclusearch(x, value) {
    //x是初始node key是值
    if (x === null || value === x.key) {
      return x;
    } else {
      if (value < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    return this.reclusearch(x, value);
  }

  loopsearch(x, value) {
    //x是初始node key是值
    while (x !== null && x.key !== value) {
      if (value < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    if (x === null) {
      return null;
    } else {
      return x;
    }
  }
}

let bst = new BinarySearchTree();
bst.treeInsert(new Node(15));
bst.treeInsert(new Node(6));
bst.treeInsert(new Node(5));
bst.treeInsert(new Node(1));
bst.treeInsert(new Node(13));
bst.treeInsert(new Node(-7));
bst.treeInsert(new Node(3));
// console.log(bst.reclusearch(bst.root, 3));
console.log(bst.loopsearch(bst.root, 3));

// console.log(bst.reclusearch(bst.root, 2));
// bst.postorder(bst.root);
// console.log(bst.path); // 資料存在path裡面

// bst.bftsearch(bst.root);
// for (let i = 0; i < bst.queue.length; i++) {
//   console.log(bst.queue[i].key);
// }
// console.log(bst.queue);
