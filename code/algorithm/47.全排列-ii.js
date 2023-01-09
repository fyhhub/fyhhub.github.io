/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  const used = {};
  function fn(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 树层重复
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      // 树枝重复
      if (used[i]) continue;

      used[i] = true;
      fn(path.concat(nums[i]));
      used[i] = false;
    }
  }
  fn([]);
  return res;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = permuteUnique;
// @after-stub-for-debug-end
