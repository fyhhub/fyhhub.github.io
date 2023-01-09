/*
 * @Author: your name
 * @Date: 2022-01-15 23:11:17
 * @LastEditTime: 2022-04-28 23:11:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \fyhhub.github.io\code\algorithm\279.完全平方数.js
 */
/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = new Array(n + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i - j * j >= 0) {
        dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
      } else {
        break;
      }
    }
  }
  return dp[n];
};
// @lc code=end
