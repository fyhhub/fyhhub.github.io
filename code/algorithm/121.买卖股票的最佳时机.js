/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = Array.from(new Array(prices.length), () => [0, 0]);
  dp[0] = [-prices[0], 0];
  for (let i = 1; i < prices.length; i++) {
    // 当前持有股票 = max(之前一直持有保持现状，今天买入变成了持有)
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
    // 当前未持有股票 = max(之前一直未持有保持现状，今天卖掉了变成了未持有)
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
  }
  return dp[prices.length - 1][1];
};
// @lc code=end
