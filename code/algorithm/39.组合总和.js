/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b);
  function fn(startIndex, path, sum) {
    if (sum > target) return;
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      // 注意 这里i不用 +1
      fn(i, path.concat(candidates[i]), sum + candidates[i]);
    }
  }
  fn(0, [], 0);
  return res;
};
// @lc code=end
