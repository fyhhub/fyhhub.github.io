/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let pre = 0;
  function fn(root) {
    if (!root) return;
    fn(root.right);
    if (pre) {
      // 和当前节点累加
      root.val += pre;
    }
    // 记录前一个值
    pre = root.val;
    fn(root.left);
  }
  fn(root);
  return root;
};
// @lc code=end
