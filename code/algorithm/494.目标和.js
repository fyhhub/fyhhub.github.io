/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  // 假设加法的总和为x，那么减法对应的总和就是sum - x
  // x - (sum - x) = S
  // x = (S + sum) / 2
  const sum = nums.reduce((a, b) => a + b);

  if (Math.abs(target) > sum) return 0;
  if ((target + sum) % 2 === 1) return 0;

  const size = (target + sum) / 2;
  const dp = new Array(size + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    for (let j = size; j >= nums[i]; j--) {
      // 例如 [1,2,3] target= 6
      // dp[6] += dp[6 - 1]  dp[5]种方法
      // dp[6] += dp[6 - 2] dp[4]种方法
      // dp[6] += dp[6 - 3] dp[3]种方法
      // dp[6] = dp[5] + dp[4] + dp[3]
      // 所以当前的种数，是由前几种之和求出的，而不是由上一个状态推出来
      dp[j] += dp[j - nums[i]];
    }
  }
  return dp[size];
};
// @lc code=end
