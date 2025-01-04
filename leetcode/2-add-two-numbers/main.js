const assert = require('assert').strict;
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let solution = new ListNode()
    let cursor = solution

    let carryover = 0;
    while (l1 || l2 || carryover) {
      const val1 = l1 ? l1.val : 0
      const val2 = l2 ? l2.val : 0
      const sum = val1 + val2 + carryover;

      if (sum > 9){
        carryover = 1
      } else {
        carryover = 0
      }
      
      cursor.next = new ListNode(sum % 10, null)
      cursor = cursor.next
      if (l1) {
        l1 = l1.next;
      }
      if (l2) {
        l2 = l2.next;
      }
    }

    return solution.next
};

const input1 = {
  l1: new ListNode(2, new ListNode(4, new ListNode(3))),
  l2: new ListNode(5, new ListNode(6, new ListNode(4)))
}
const solution1 = addTwoNumbers(input1.l1, input1.l2)
console.log('solution1 (should be [7, 0, 8]):', solution1)