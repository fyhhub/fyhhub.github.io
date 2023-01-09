/*
 * @lc app=leetcode.cn id=1239 lang=javascript
 *
 * [1239] 串联字符串的最大长度
 */

// @lc code=start
function isunique(str) {
  const size = new Set(str).size;
  if (str.length !== size) return false;
  return true;
}

/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  const used = [];
  let max = 0;
  function fn(startIndex, str) {
    if (!isunique(str)) return;
    if (str.length > max) {
      max = str.length;
    }
    for (let i = startIndex; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      fn(i + 1, str + arr[i]);
      used[i] = false;
    }
  }
  fn(0, "");
  return max;
};
// @lc code=end
