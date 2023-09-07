/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let h = new ListNode(-1, head)
  let cur = h;

  while(cur.next && cur.next.next) {
    // 第一个节点
    let first = cur.next;
    // 第二个节点
    let second = cur.next.next
    // 第三个节点
    let three = second.next

    // 连接实际上的第一个节点
    cur.next = second

    // 实际的第一个节点 连接 实际第二个节点
    second.next = first

    // 第二个节点 连接 实际第三个节点
    first.next = three

    // 移动指针到第二个节点
    cur = first
  }

  return h.next
};
// @lc code=end
