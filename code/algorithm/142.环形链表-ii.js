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
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    // 快慢指针重合
    if (slow === fast) {
      // 从链表首节点开始
      let index1 = fast;
      // 从相交点开始
      let index2 = head;
      while (index1 !== index2) {
        index1 = index1.next;
        index2 = index2.next;
      }
      return index2;
    }
  }
  return null;
};
// @lc code=end
