/*
 * @lc app=leetcode.cn id=530 lang=javascript
 *
 * [530] 二叉搜索树的最小绝对差
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var getMinimumDifference = function (root) {
  var pre;
  var min = Number.MAX_VALUE;
  function dfs(root) {
    if (!root) return;
    dfs(root.left); // 左
    if (pre != null) {
      min = Math.min(min, root.val - pre);
    }
    pre = root.val;
    dfs(root.right);
  }
  dfs(root);
  return min;
};
// @lc code=end
