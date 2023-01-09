/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const dp = new Array(nums.length + 1).fill(Number.MIN_VALUE);
  let res = nums[0];
  dp[0] = nums[0];
  for (let i = 1; i <= nums.length; i++) {
    // dp[i - 1] + nums[i]，即：nums[i]加入当前连续子序列和
    // nums[i]，即：从头开始计算当前连续子序列和
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    if (res < dp[i]) {
      res = dp[i];
    }
  }
  return res;
};
// @lc code=end
