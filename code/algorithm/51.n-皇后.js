/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start

function isValid(grid, x, y, n) {
  // 同列验证重复
  for (let i = 0; i < x; i++) {
    if (grid[i][y] === "Q") return false;
  }

  // 45度验证重复
  for (let i = x - 1, j = y + 1; i >= 0 && j < n; i--, j++) {
    if (grid[i][j] === "Q") return false;
  }

  // 135度验证重复
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    if (grid[i][j] === "Q") return false;
  }
  return true;
}

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const grid = new Array(n);
  const res = [];
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n).fill(".");
  }
  function fn(index, grid) {
    if (index >= n) {
      const data = [];
      for (let i = 0; i < n; i++) {
        data.push(grid[i].join(""));
      }
      res.push(data);
      console.table(data);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!isValid(grid, index, i, n)) continue;
      grid[index][i] = "Q";
      fn(index + 1, grid);
      grid[index][i] = ".";
    }
  }
  fn(0, grid);
  return res;
};
// @lc code=end
