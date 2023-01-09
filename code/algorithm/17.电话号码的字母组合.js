/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];
  const map = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const res = [];
  function fn(index, s) {
    if (digits.length === s.length) {
      res.push(s);
      return;
    }
    const str = map[digits[index]];
    for (let i = 0; i < str.length; i++) {
      fn(index + 1, s + str[i]);
    }
  }
  fn(0, "");
  return res;
};
// @lc code=end
