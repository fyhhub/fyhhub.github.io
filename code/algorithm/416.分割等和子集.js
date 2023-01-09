/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  // 如果不是2的整数 直接返回false
  if (sum & 1) return false;

  // 背包容量最大为数组总和的一半
  const target = sum / 2;
  const dp = new Array(target + 1).fill(0);

  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 倒序遍历背包容量
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
      // 如果背包里放的最大数和最大容量相同 返回true
      if (dp[j] === target) {
        return true;
      }
    }
  }
  return dp[target] === target;
};
// @lc code=end
