/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 */

// @lc code=start

function isPalindrome(s) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] != s[s.length - i - 1]) {
      return false;
    }
  }
  return true;
}
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const length = s.length;
  const res = [];
  function fn(s, arr, len) {
    if (len === length) {
      res.push([...arr]);
      return;
    }
    for (let i = 0; i < s.length; i++) {
      const cur = s.slice(0, i + 1);
      const next = s.slice(i + 1);
      if (isPalindrome(cur)) {
        fn(next, arr.concat(cur), len + cur.length);
      } else {
        continue;
      }
    }
  }
  fn(s, [], 0);
  return res;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = partition;
// @after-stub-for-debug-end
