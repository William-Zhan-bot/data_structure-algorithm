// find str2 location in str1

function kmp(str1, str2) {
  let ps_arr = [];
  let i = 0; // for str1
  let j = 0; // for str2
  let counter = 0; // for substr nums

  // create ps arr
  let n = 0; // pointer to ps
  // first ps = 0
  ps_arr.push(0);
  for (let i = 1; i < str2.length; i++) {
    if (str2[n] !== str2[i]) {
      //when not equal n start from head
      ps_arr.push(0);
      n = 0;
    } else {
      // equal n++ i++ ps_count=n+1
      // n means numbers of repeat
      ps_arr.push(n + 1);
      n++;
    }
  }
  // 移動調整
  ps_arr.pop();
  ps_arr.unshift(-1);

  // caculates kmp
  i = 0;
  j = 0;
  while (i < str1.length) {
    // i for condition
    if (str1[i] === str2[j] && j < str2.length) {
      // str2 last
      if (j === str2.length - 1) {
        j = 0; // str2 back to start
        counter++; // find num
        i++;
      } else {
        // str2 not final
        j++;
        i++;
      }
    } else {
      i = i - ps_arr[j]; // formula
      j = 0; // str2 back to start
    }
  }
  console.log("num of sub array", counter);
  console.log("str1: ", str1);
  console.log("str2: ", str2);
  console.log("ps_arr: ", ps_arr);
}

// kmp("abcdabck", "bcd");
kmp("afsdajskfjjareklasfjarereralkfjarealkjrea;;iot", "re");
