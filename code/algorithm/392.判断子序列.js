/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  // s、t的长度
  const [m, n] = [s.length, t.length];
  // dp全初始化为0
  const dp = new Array(m + 1).fill(0).map((x) => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  // 遍历结束，判断dp右下角的数是否等于s的长度
  return dp[m][n] === m ? true : false;
};
// @lc code=end
