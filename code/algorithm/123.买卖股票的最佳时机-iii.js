/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = new Array(prices.length).fill(0).map((x) => new Array(5).fill(0));
  dp[0][1] = -prices[0];
  dp[0][3] = -prices[0];
  // 0: 没有操作
  // 1: 第一次买入
  // 2: 第一次卖出
  // 3: 第二次买入
  // 4: 第二次卖出
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = dp[i - 1][0];
    // // 第一次买入
    // dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    // // 第一次卖出
    // dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i])
    // // 第二次买入
    // dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i])
    // // 第三次卖出
    // dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i])
    for (let j = 1; j <= 4; j++) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - 1] + (j % 2 === 1 ? -prices[i] : prices[i])
      );
    }
  }
  return dp[prices.length - 1][4];
};
// @lc code=end
