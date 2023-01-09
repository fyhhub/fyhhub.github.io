/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root == null) return root;
  if (root.val === key) {
    // 左子树为空用右子树补位
    if (!root.left) {
      return root.right;
      // 右子树为空用左子树补位
    } else if (!root.right) {
      return root.left;
    } else {
      // 右子树
      let cur = root.right;
      // 找到右子树 最左边的节点
      while (cur.left) {
        cur = cur.left;
      }
      // 右子树最左侧节点 连接 当前节点左子树
      cur.left = root.left;

      // 右子树节点替换当前节点
      root = root.right;
      delete root;
      return root;
    }
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  }
  if (root.val < key) {
    root.right = deleteNode(root.right, key);
  }
  return root;
};
// @lc code=end
