/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const length = s.length;
  const res = [];
  function fn(s, path, len) {
    if (path.length > 4) return;
    if (len === length && path.length === 4) {
      res.push(path.join("."));
      return;
    }
    for (let i = 0; i < s.length; i++) {
      const str = s.slice(0, i + 1);
      const next = s.slice(i + 1);
      if (str.length > 3 || +str > 255 || (str.length > 1 && str[0] === "0"))
        break;

      fn(next, path.concat(str), len + str.length);
    }
  }
  fn(s, [], 0);
  return res;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = restoreIpAddresses;
// @after-stub-for-debug-end
