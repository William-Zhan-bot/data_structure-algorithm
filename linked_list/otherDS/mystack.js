// 只有最上層可以加入
// 只有push 跟 pop

class Node {
  //建構物件的函式 首字要大寫
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  //加入新東西
  push(value) {
    let newNode = new Node(value); //套用前面創好的物件
    if (this.head === null) {
      //本身沒有東西的狀況
      this.head = newNode;
    } else {
      //本身有東西在list裡面了
      //加進去的幾步 更改next 新增
      let currentnode = this.head;
      while (currentnode.next !== null) {
        currentnode = currentnode.next;
      }
      currentnode.next = newNode;
    }
    this.length++;
  }

  //自製pop 移除最後一個元素並且回傳
  pop() {
    if (this.length === 0) {
      console.log("no element in this list");
      return;
    } else if (this.length === 1) {
      let temp = this.head;
      this.head = null;
      this.length = 0;
      return temp;
    } else {
      // 假設有很多元素，列表長度為k
      // 從第一個走k-2步 之後尋找下一個的next 就是index k-1
      let currentnode = this.head;
      // 走長度-2步
      for (let i = 1; i <= this.length - 2; i++) {
        currentnode = currentnode.next;
      }
      let value = currentnode.next; //先領出在刪除
      currentnode.next = null;
      this.length--;
      return value.value;
    }
  }
  //展示資料
  showAll() {
    if (this.length === 0) {
      console.log("列表為空");
      return;
    } else {
      let currentnode = this.head;
      while (currentnode !== null) {
        console.log(currentnode.value);
        currentnode = currentnode.next;
      }
    }
  }
}

let mystack = new Stack();

mystack.push("miles");
mystack.push("joanne");
mystack.push("willy");
console.log("pp: ");
let popper = mystack.pop();
console.log(popper);
mystack.pop();
mystack.showAll();
