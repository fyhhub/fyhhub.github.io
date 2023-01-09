/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
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
function robTree(cur) {
  if (!cur) return [0, 0]; // 长度为2的数组，0：不偷，1：偷
  const left = robTree(cur.left);
  const right = robTree(cur.right);
  // 偷父节点，左右节点不偷
  const val1 = cur.val + left[0] + right[0];
  // 不偷父节点, 左边节点偷或者不偷的最大值 + 右边节点偷或者不偷的最大值
  const val2 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
  return [val2, val1];
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  return Math.max(...robTree(root));
};
// @lc code=end
