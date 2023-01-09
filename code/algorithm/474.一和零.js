/*
 * @lc app=leetcode.cn id=474 lang=javascript
 *
 * [474] 一和零
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const dp = Array.from(new Array(m + 1).fill(0), () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i < strs.length; i++) {
    const zeroNum = strs[i].replace(/1/g, "").length;
    const oneNum = strs[i].replace(/0/g, "").length;
    for (let x = m; x >= zeroNum; x--) {
      for (let y = n; y >= oneNum; y--) {
        dp[x][y] = Math.max(dp[x][y], dp[x - zeroNum][y - oneNum] + 1);
      }
    }
  }
  return dp[m][n];
};
// @lc code=end
