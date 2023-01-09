/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 如果当前值比 p 和 q都大  往左搜索
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);

    // 如果当前值比 p 和 q都小  往右搜索
  } else if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);

    // [p, q]区间中则说明该节点就是最近公共祖先了
  } else {
    return root;
  }
};
// @lc code=end
