/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let h = new ListNode(-1, head)
  let res = h;
  while(h.next) {
    if (h.next.val === val) {
      h.next = h.next.next
      continue
    }
    h = h.next
  }
  return res.next;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = removeElements;
// @after-stub-for-debug-end