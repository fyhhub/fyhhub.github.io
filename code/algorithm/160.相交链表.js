/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let cur1 = headA;
  let cur2 = headB;

  // 获取链表长度
  let n1 = 0;
  while (cur1) {
    n1++
    cur1 = cur1.next;
  }

  // 获取链表长度
  let n2 = 0;
  while (cur2) {
    n2++
    cur2 = cur2.next;
  }

  // 恢复指针
  cur1 = headA;
  cur2 = headB;

  // 交换指针，保证cur1永远是最短的链表
  if (n1 > n2) {
    [cur1, cur2] = [cur2, cur1]
    let temp = n1;
    n1 = n2;
    n2 = temp;
  }

  // 先让长的指针移动
  let move = n2 - n1;
  while(move-- > 0) {
    cur2 = cur2.next;
  }



  // 此时cur1 和 cue2指针保持一致，同时移动两个指针
  while(cur1 && cur2) {
    if (cur1 === cur2) {
      return cur1;
    }
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
  return null
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = getIntersectionNode;
// @after-stub-for-debug-end