/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和
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
var sumOfLeftLeaves = function (root) {
  if (!root) return 0;
  let val = 0;
  if (root.left && !root.left.left && !root.left.right) {
    val = root.left.val;
  }
  const leftSum = sumOfLeftLeaves(root.left);
  const rightSum = sumOfLeftLeaves(root.right);

  return val + leftSum + rightSum;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = sumOfLeftLeaves;
// @after-stub-for-debug-end
