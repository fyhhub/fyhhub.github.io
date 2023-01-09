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
  const node = new ListNode(-1, head);
  const ret = node;
  let temp = node;
  // 保证后面有两个节点能进行交换
  while (temp.next && temp.next.next) {
    // 第一个节点
    let pre = temp.next;
    // 第二个节点
    let cur = temp.next.next;

    // 第一个节点 连接 第三个节点
    pre.next = cur.next;
    // 第二个节点连接 第一个节点
    cur.next = pre;
    // 开始节点 连接 第二个节点
    temp.next = cur;

    // 指针移动
    temp = pre;
  }
  return ret.next;
};
// @lc code=end
