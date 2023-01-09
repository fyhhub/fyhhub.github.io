/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
var countNodes = function (root) {
  if (!root) return 0;
  let leftHeight = 0;
  let rightHeight = 0;
  let left = root.left;
  let right = root.right;
  while (left) {
    left = left.left;
    leftHeight++;
  }
  while (right) {
    right = right.right;
    rightHeight++;
  }
  if (leftHeight === rightHeight) {
    return Math.pow(2, rightHeight + 1) - 1;
  }
  return countNodes(root.left) + countNodes(root.right) + 1;
};
// @lc code=end
