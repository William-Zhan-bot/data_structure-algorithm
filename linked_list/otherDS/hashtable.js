class Hashtable {
  // 一般來說會是以array的形式
  constructor(size) {
    this.size = size;
    this.table = [];
    for (let i = 0; i < this.size; i++) {
      //因為結構是array of arrays
      this.table.push([]);
    }
  }

  // 如果key並非數字的轉換功能
  parse(str) {
    let result = 0;
    let temp = 0;
    for (let i = 0; i < str.length; i++) {
      temp = str.charCodeAt(i); // 逐個字轉換成utf 16
      result += temp;
    }
    return result % this.size;
  }

  // size就是公式當中的m值 等於MOD出來的一個數
  // division method
  hash1(key) {
    return key % this.size;
  }

  // multplication method
  hash2(key) {
    let A = (Math.sqrt(5) - 1) / 2;
    let parsedkey = 0;
    if (typeof key !== "number") {
      parsedkey = this.parse(key);
    } else {
      parsedkey = key;
    }
    return Math.floor(this.size * ((parsedkey * A) % 1));
  }

  // 設定數值 KEY VALUE自訂 index自己找
  set(key, value) {
    let index = this.hash2(key);
    this.table[index].push({ key, value });
    // 這裡推入物件的時候就直接幫他建立好了屬性
    // 分別有key 跟 value
  }

  // 查找元素
  get(key) {
    let index = this.hash2(key);
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        // 可以利用key屬性去尋找
        return this.table[index][i];
      }
    }
    return null;
  }

  // 打元素
  printall() {
    console.log(this.table);
  }
}

let htb = new Hashtable(6);
console.log(htb);

htb.set("white", "#FFFFFF");
htb.set("magenta", "#FF00FF");
htb.set("red", "#FF0000");

htb.printall();

console.log(htb.get("red").value);
