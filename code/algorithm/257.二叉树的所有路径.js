/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const res = [];
  function dfs(root, str) {
    // 叶子节点 记录路径
    if (!root.left && !root.right) {
      res.push(str + root.val);
      return;
    }
    root.left && dfs(root.left, str + root.val + "->");
    root.right && dfs(root.right, str + root.val + "->");
  }
  dfs(root, "");
  return res;
};
// @lc code=end
