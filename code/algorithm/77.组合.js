/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const res = [];
  function fn(index, k, arr) {
    if (k === arr.length) {
      res.push([...arr]);
      return;
    }
    for (let i = index; i <= n - (k - arr.length) + 1; i++) {
      fn(i + 1, k, arr.concat(i));
    }
  }
  fn(1, k, []);
  return res;
};
// @lc code=end
