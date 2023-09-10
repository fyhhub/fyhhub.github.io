/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let fast = head;
  let slow = head;

  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) {
      let index = head;
      let index1 = fast;

      while(index !== index1) {
        index = index.next
        index1 = index1.next
      }

      return index
    }
  }
  return null
};
// @lc code=end
