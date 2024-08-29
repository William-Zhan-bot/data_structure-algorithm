let perfect = 0;

function nqueens(n) {
  let map = [];
  // 建立map
  for (let i = 0; i < n; i++) {
    map.push([]);
    for (let j = 0; j < n; j++) {
      map[i].push(null);
    }
  }

  // 迴圈放置q
  let i = 0;
  let j = 0;
  let loop = true;
  while (loop) {
    console.log(i, j);
    map[i][j] = "Q";

    //檢查周圍的Q是否適合
    let danger = false;
    let k = 0; //設計共同的變數

    //只檢查靠左的index
    // 上面
    while (k < i) {
      if (map[k][j] === "Q") {
        danger = true;
      }
      k++;
    }

    //左邊
    k = 0;
    while (k < j) {
      if (map[i][k] === "Q") {
        danger = true;
      }
      k++;
    }

    //左下 可以拆分成 i + 1 , j - 1
    k = 1; //因為每次往左上退 會加上l
    //加上後最低到 0 所以k=1
    let l = -1;
    while (i + k < n && j + l >= 0) {
      if (map[i + k][j + l] === "Q") {
        danger = true;
      }
      k++;
      l--;
    }

    //左上 可以拆分成 i - 1 , j - 1
    // 所以共用k
    k = -1;
    while (i + k >= 0 && j + k >= 0) {
      if (map[i + k][j + k] === "Q") {
        danger = true;
      }
      k--;
    }

    // 一步一步確認是否發生危險狀況
    if (danger === false) {
      // 那一步沒問題: 打印出來 判斷是否最後一列
      console.log("okay");
      console.log(map);
      // 設定結束斷點
      /* 判斷點當J = N-1的情況下有Q
      代表該行找到了最佳的解法
      */
      if (j === n - 1) {
        perfect++;
        console.log("Perfect");
        console.log(map);

        //找到最後一列有Q--完整地圖打印
        /*這邊找到並把它清掉的邏輯比較像是
        除了當時的這格之外 如果棋盤夠大
        之下的i+1也可能有Q存在的空間
        所以把地圖打印 清除 新的INDEX I++繼續執行
        
        I超出的狀況會再下面Check的迴圈被處理
        */
        map[i][j] = null;
        i++;
      } else {
        // 非為最後一列放置Q 換到下一列從頭最上開始
        i = 0;
        j++;
      }
    }

    // 當那一步可能觸發危險: 清空該格 搜尋下一格
    // 搜尋下一格=> 考慮是否超出棋盤
    if (danger === true) {
      console.log("not ok");
      map[i][j] = null;
      i++;
    }

    // i超過棋盤的情況
    /*
    如果該列有找到合適的Q的位置
    會在上一個迴圈就發生j++ 並自行判斷是否為最後
    所以這裡僅需處理i超出棋盤 該列又沒有Q的狀況
    也就是該列無解，必須回溯上一列的狀況
    */
    function check() {
      j--; //回到上一列
      // 找到上一個q並且清掉 往下換
      for (let b = 0; b < n; b++) {
        if (map[b][j] === "Q") {
          map[b][j] = null;
          console.log("backstracking b and j is");
          console.log(b, j);
          i = b + 1;
          break;
        }
      }
    }
    /*這邊回溯結束會碰到下一個問題
    就是當回溯的Q位置在I = N-1也就是最底一個時
    就會因為上面的 i = b + 1而報錯....
    
    解決方式不是去寫更複雜的條件判斷
    而是下列迴圈
    在超出範圍時，再執行一次回溯
    就會找到更上一行的Q 可以把它推調進行下一個
    如果又觸發就會更往上
    */
    while (i >= n) {
      check();
      /*整個尋找的斷點 => 判斷條件是當無法在回溯時
      也就是找到第一列最底下的Q之後，又觸發了回溯
      亦即出現 I = B + 1
      且I >= N 滿足這裡的條件所以if在下
      但回溯觸發J--後，又使得J<0的情況發生
      */
      if (j < 0) {
        console.log("dead end"); //代表找完了
        loop = false; // 終止大迴圈
        break; // 終止本迴圈
      }
    }
  }
}

nqueens(4);
console.log("可能的解有: " + perfect + "組");
