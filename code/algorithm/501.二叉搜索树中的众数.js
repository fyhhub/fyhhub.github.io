/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
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
 * @return {number[]}
 */
var findMode = function (root) {
  let pre;
  let count = 0;
  let maxCount = 0;
  let res = [];
  function fn(root) {
    if (!root) return;
    fn(root.left);

    if (pre == null) {
      // 第一个节点
      count = 1;
    } else if (pre === root.val) {
      // 有相同节点
      count++;
    } else {
      // 节点不同
      count = 1;
    }
    pre = root.val;

    // 与最大频率相同
    if (count === maxCount) {
      res.push(root.val);
    }

    // 如果当前节点出现的频率 大于 最大频率
    if (count > maxCount) {
      // 更新最大频率
      maxCount = count;
      // 记录
      res = [root.val];
    }

    fn(root.right);
  }
  fn(root);
  return res;
};
// @lc code=end
