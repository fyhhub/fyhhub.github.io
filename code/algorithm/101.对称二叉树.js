/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
function isMirror(n1, n2) {
  if (n1 && n2) {
    return (
      n1.val === n2.val &&
      isMirror(n1.left, n2.right) &&
      isMirror(n1.right, n2.left)
    );
  } else {
    return !n1 && !n2;
  }
}
var isSymmetric = function (root) {
  return isMirror(root.left, root.right);
};
// @lc code=end
