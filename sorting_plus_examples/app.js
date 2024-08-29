let arr = [2, 3, 6, 55, 8, 11, 4, 9]; // [15, 3, -17, 3.1415, 18, 20, 2, 1, 666]

// [2, 3, 6, 55, 8, 11, 9, 4];
// [2, 3, 6, 55, 8, 11, 4, 9];

function partition(p, r) {
  let x = arr[r]; // pivot
  let i = p - 1; // start index
  for (let j = p; j <= r - 1; j++) {
    if (arr[j] <= x) {
      // x have been defined
      i = i + 1;

      // i j 互換
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }

  // 移動pivot位置
  let temp = arr[i + 1];
  arr[i + 1] = arr[r];
  arr[r] = temp;

  return i + 1;
}

function quicksort(p, r) {
  if (p < r) {
    let q = partition(p, r);
    quicksort(p, q - 1);
    quicksort(q + 1, r);
  }
}

console.log(arr);
quicksort(0, arr.length - 1);
console.log(arr);
