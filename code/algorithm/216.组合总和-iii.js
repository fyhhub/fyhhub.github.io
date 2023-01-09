/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const res = [];
  function fn(startIndex, k, path, sum) {
    if (path.length > k) return;
    if (path.length === k) {
      if (sum === n) {
        res.push([...path]);
      }
      return;
    }
    for (let i = startIndex; i <= 9 - (k - path.length) + 1; i++) {
      fn(i + 1, k, path.concat(i), sum + i);
    }
  }
  fn(1, k, [], 0);
  return res;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = combinationSum3;
// @after-stub-for-debug-end
