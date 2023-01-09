/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length) {
    const length = queue.length;
    const arr = [];
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      arr.push(node.val);
      if (node.children) {
        for (const item of node.children) {
          queue.push(item);
        }
      }
    }
    res.push(arr);
  }
  return res;
};
// @lc code=end
