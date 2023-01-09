/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const used = [];
  const res = [];
  candidates.sort((a, b) => a - b);
  function fn(startIndex, path, sum) {
    if (sum > target) return;
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      // 树层重复
      if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) {
        continue;
      }
      used[i] = true;
      fn(i + 1, path.concat(candidates[i]), sum + candidates[i]);
      used[i] = false;
    }
  }
  fn(0, [], 0);
  return res;
};
// @lc code=end
