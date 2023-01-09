/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 * @return {boolean}
 */

function getDeep(root) {
  if (!root) return 0;
  const leftHeight = getDeep(root.left);
  const rightHeight = getDeep(root.right);
  if (leftHeight === -1 || rightHeight === -1) return -1;
  return Math.abs(leftHeight - rightHeight) > 1
    ? -1
    : Math.max(leftHeight, rightHeight) + 1;
}
var isBalanced = function (root) {
  return getDeep(root) !== -1;
};
// @lc code=end
