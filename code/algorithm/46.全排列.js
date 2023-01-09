/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  const used = [];
  function fn(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
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
module.exports = permute;
// @after-stub-for-debug-end
