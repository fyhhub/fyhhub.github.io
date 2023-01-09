/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var m = [];
var fib = function (n) {
  if (n < 2) return n;
  if (!m[n]) {
    m[n] = fib(n - 1) + fib(n - 2);
  }
  return m[n];
};
// @lc code=end
