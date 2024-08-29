function simplelcs(str1, str2) {
  //用遞迴的方式解
  if (str1.length === 0 || str2.length === 0) {
    return false;
  } else {
    if (str1[str1.length - 1] === str2[str2.length - 1]) {
      // 有觸發一個共同長度
      return (
        1 +
        simplelcs(
          str1.substring(0, str1.length - 1),
          str2.substring(0, str2.length - 1)
        )
      );
    } else {
      // 沒有觸發共同長度
      return Math.max(
        simplelcs(str1.substring(0, str1.length - 1), str2),
        simplelcs(str1, str2.substring(0, str2.length - 1))
      );
    }
  }
}
let a = "ABDE";
let b = "ACDDERB";
let result = simplelcs(a, b);
console.log(result);
