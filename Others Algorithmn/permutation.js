let result = [];

function perm(arr, start) {
  if (start >= arr.length) {
    // 每次超過的再紀錄

    // 這邊必須要用複製的arr，否則會找到原本的arr去
    result.push([...arr]); // js當中複製array的方法[...arr]
  } else {
    for (let i = start; i < arr.length; i++) {
      let temp = arr[start];
      arr[start] = arr[i];
      arr[i] = temp;

      perm(arr, start + 1);
      image.png;
      let new_temp = arr[start];
      arr[start] = arr[i];
      arr[i] = new_temp;
    }
  }
}

perm(["A", "B", "C", "D"], 0);
console.log(result);
let count = result.length;
console.log("共有" + count + "種可能");
