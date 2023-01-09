/*
 * @lc app=leetcode.cn id=746 lang=javascript
 *
 * [746] 使用最小花费爬楼梯
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const dp = new Array(cost.length)

  // 0，1下标的台阶，意味着你一开始就站在那里，相当于起始点，所以必须花费对应下标的数值
  dp[0] = cost[0]
  dp[1] = cost[1]

  for (let i = 2;i < cost.length;i++) {
    // i 表示当前, 它的最小花费是从i - 1和i- 2这两个台阶得来的，先找出他们的最小值
    // 然后登上第i个台阶，此时需要花费i台阶对应的体力，所以要加上 cost[i]
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
  }
  // 如果走到倒数第二个台阶，我可以走两步，直接就过去了, 相当于最后一个台阶没有花费
  // 如果我走到倒数第一个台阶，我可以走一步，最后一个台阶花费了
  // 所以需要求出上面两种情况，哪个花费的体力最小
  return Math.min(dp[cost.length - 1], dp[cost.length - 2])
};
// @lc code=end
