/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  const dp = Array.from(Array(s.length), () => Array(s.length).fill(false));
  let res = 0;
  // 左指针
  for (let i = s.length - 1; i >= 0; i--) {
    // 右指针
    for (let j = i; j < s.length; j++) {
      // 中心 向左右两边扩散
      if (s[i] === s[j]) {
        if (j - i <= 1 || dp[i + 1][j - 1]) {
          dp[i][j] = true;
          res++;
        }
      }
    }
  }
  return res;
};
// @lc code=end
