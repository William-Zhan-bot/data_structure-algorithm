class Node {
  //建構物件的函式 首字要大寫
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
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
      console.log(currentnode);
      let value = currentnode.next; //先領出在刪除
      currentnode.next = null;
      this.length--;
      return value;
    }
  }

  //shift移出第一個元素並回傳
  shift() {
    if (this.head === null) {
      console.log("no elements in list");
      return;
    } else if (this.length === 1) {
      let temp = this.head;
      this.head = null;
      return temp;
    } else {
      let temp = this.head;

      this.head = this.head.next;
      this.head.next = null;
      this.length--;
      return temp.value;
    }
  }

  //unshift前面多一個元素
  // 必須創造一個new node
  unshift(value) {
    let newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
    } else {
      let temp = this.head;
      let newNode = new Node(value);
      this.head = newNode;
      newNode.next = temp;
    }
    this.length++;
  }

  //insertAt 指定index插入
  insertat(index, value) {
    if (index < 0 || index > this.length - 1) {
      return null;
    } else if (index === 0) {
      this.unshift(value);
      this.length++;
    } else if (index === this.length) {
      this.push(value);
      this.length++;
    } else {
      let currentnode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentnode = currentnode.next;
      }
      let temp = currentnode.next;
      let Newnode = new Node(value);
      Newnode.next = temp;
      currentnode.next = Newnode;
      this.length++;
    }
  }

  //移除資料 remove
  removeat(index) {
    if (this.length === 0) {
      console.log("no elements in list");
      return null;
    } else if (index < 0 || index >= this.length) {
      console.log("cannot find the elmenet in index");
      return null;
    } else if (index === this.length - 1) {
      this.pop();
    } else {
      let currentnode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentnode = currentnode.next;
      }
      currentnode.next = currentnode.next.next;

      this.length--;
      return currentnode;
    }
  }

  //獲得資料
  get(index) {
    if (index > this.length - 1 || index < 0) {
      return null;
    } else {
      let currentnode = this.head;
      for (let i = 0; i < index; i++) {
        currentnode = currentnode.next;
      }

      return currentnode.value;
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

let mylist = new LinkedList();

mylist.push("miles");
mylist.push("joanne");
mylist.push("willy");
mylist.push("Deshawn");
mylist.push("steve");

mylist.showAll();
let getter = mylist.get(2);
console.log(getter);
