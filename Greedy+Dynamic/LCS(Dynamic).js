let table1 = []; //儲存lcs結果
let table2 = []; //儲存箭頭
let result = []; //儲存結果字串

function DYC_lcs(str1, str2) {
  // 先建立存放的lcs數值的 table1
  let m = str1.length;
  let n = str2.length;

  for (let i = 0; i <= m; i++) {
    table1.push([]);
    table1[i].push(0);
    for (let o = 0; o < n; o++) {
      if (i === 0) {
        table1[i].push(0);
      } else {
        table1[i].push(null);
      }
    }
  }

  //接著建立放置箭頭的 table2
  for (let i = 0; i < m; i++) {
    table2.push([]);
    for (let o = 0; o < n; o++) {
      table2[i].push(null);
    }
  }

  // dyc比較條件
  //先遍歷表格 //同步更新table1.2
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        table1[i][j] = 1 + table1[i - 1][j - 1];
        table2[i - 1][j - 1] = "↖";
      } else {
        if (table1[i - 1][j] > table1[i][j - 1]) {
          table1[i][j] = table1[i - 1][j];
          table2[i - 1][j - 1] = "↑"; // 繼承自上面
        } else {
          table1[i][j] = table1[i][j - 1];
          table2[i - 1][j - 1] = "←"; // 繼承自左邊
        }
      }
    }
  }

  // 回溯結果字串
  // 重底遍歷table2 遇到左上箭頭就push到result內
  let i = str1.length - 1;
  let j = str2.length - 1;
  // 基本上不用太複雜的邏輯，跟隨箭頭發大財
  // 找到就往左上跳
  // 找不到就往上跳
  while (j >= 0 && i >= 0) {
    if (table2[i][j] === "↖") {
      result.unshift(str2[j]);
      i--;
      j--;
    } else {
      i--;
    }
  }
}

let zhi = "abbcdebc";
let heng = "abec";

DYC_lcs(zhi, heng);
console.log(table1);
console.log(table2);
console.log(result);
