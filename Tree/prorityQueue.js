class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class priorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    let newNode = new Node(value, priority);
    // 當列表為空時的push
    if (this.values.length === 0) {
      this.values.push(newNode);
      return true;
    }

    // 當列表不為空時的push
    this.values.push(newNode);
    let newindex = this.values.length - 1;
    let parentindex = Math.floor((newindex - 1) / 2);

    // 優先級過高時會需要資料互換
    while (
      parentindex >= 0 &&
      this.values[newindex].priority > this.values[parentindex].priority
    ) {
      let temp = this.values[parentindex];
      this.values[parentindex] = this.values[newindex];
      this.values[newindex] = temp;
      // parent index的宣告要放在裡面 讓他每次跌代
      newindex = parentindex;
      parentindex = Math.floor((newindex - 1) / 2);
    }
  }

  //移除元素 關鍵是仍要保持優先級
  dequeue() {
    if (this.values.length === 0) {
      return false;
    } else if (this.values === 1) {
      let result = this.values.pop();
      return result;
    } else {
      // 先交換首尾
      let temp = this.values[0];
      this.values[0] = this.values[this.values.length - 1];
      this.values[this.values.length - 1] = temp;
      let result = this.values.pop();
      this.Maxheapify(0);
      return result;
    }
  }

  // 刪除後調整HEAP
  Maxheapify(i) {
    let largest;
    let l = i * 2 + 1;
    let r = i * 2 + 2;

    if (
      l <= this.values.length - 1 &&
      this.values[i].priority < this.values[l].priority
    ) {
      largest = l;
    } else {
      largest = i;
    }

    if (
      r <= this.values.length - 1 &&
      this.values[largest].priority < this.values[r].priority
    ) {
      largest = r;
    }

    if (largest !== i) {
      //接著要把比到的結果進行交換 i 跟 largest換
      let temp = this.values[i];
      this.values[i] = this.values[largest];
      this.values[largest] = temp;
      this.Maxheapify(largest);
    }
  }
}

// test area
let pq = new priorityQueue();
pq.enqueue("buy lunch", 20);
pq.enqueue("sleep", 10);
pq.enqueue("make money", 3);
pq.enqueue("learn code", 99);
pq.enqueue("note", 1007);
pq.enqueue("real", 999);
pq.enqueue("test", 990);
console.log(pq);
pq.dequeue();
console.log(pq);

// while (pq.values.length >= 1) {
//   let task = pq.dequeue();
//   console.log(task.value, ",", task.priority);
// }
