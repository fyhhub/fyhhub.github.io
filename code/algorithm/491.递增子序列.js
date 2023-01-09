/*
 * @lc app=leetcode.cn id=491 lang=javascript
 *
 * [491] 递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const res = [];
  function fn(startIndex, path) {
    path.length >= 2 && res.push([...path]);
    const used = {};
    for (let i = startIndex; i < nums.length; i++) {
      if ((path.length && nums[i] < path[path.length - 1]) || used[nums[i]])
        continue;
      used[nums[i]] = true;
      fn(i + 1, path.concat(nums[i]));
    }
  }
  fn(0, []);
  return res;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = findSubsequences;
// @after-stub-for-debug-end
