/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  if (!prices.length) return 0;
  const dp = Array.from(Array(prices.length), () => Array(2 * k + 1).fill(0));
  for (let i = 1; i <= k * 2; i++) {
    if (i % 2 === 1) {
      dp[0][i] = -prices[0];
    }
  }
  // 0: 没有操作
  // 1: 第一次买入
  // 2: 第一次卖出
  // 3: 第二次买入
  // 4: 第二次卖出
  // ...
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = dp[i - 1][0];
    for (let j = 1; j <= k * 2; j++) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - 1] + (j % 2 === 1 ? -prices[i] : prices[i])
      );
    }
  }
  return dp[prices.length - 1][k * 2];
};
// @lc code=end
