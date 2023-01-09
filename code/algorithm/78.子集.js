/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];
  function fn(startIndex, path) {
    res.push([...path]);
    for (let i = startIndex; i < nums.length; i++) {
      fn(i + 1, path.concat(nums[i]));
    }
  }
  fn(0, []);
  return res;
};
// @lc code=end
