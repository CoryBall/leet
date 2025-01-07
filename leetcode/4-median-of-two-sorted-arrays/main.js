/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, 
 * return the median of the two sorted arrays
 * 
 * The overall run time complexity should be O(log(m+n))
 * 
 * Example 1:
 *  Input: nums1=[1,3] nums2=[2]
 *  Output: 2.0
 *  Explanation: merged array = [1,2,3] and median is 2
 * 
 * Example 2:
 *  Input: nums1=[1,2], nums2=[3,4]
 *  Output: 2.5
 *  Explanation: merged array = [1,2,3,4] and median is (2+3)/2 = 2.5
 * 
 * Constraints:
 *  nums1.length == m
 *  nums2.length == n
 *  0 <= m <= 1000
 *  0 <= n <= 1000
 *  1 <= m + 2 <= 2000
 *  -10^6 <= nums1[i], num2[i] <= 10^6
 * 
 * Solution:
 * 1. Combine arrays but looping through both at once (log(N))
 * 2. Find middle index of merged array
 * 3. If length is even, find middle 2 and divide their sum
 * 
 * 
 * Results:
 *  Runtime - 2ms, Beats 98.62%
 *  Memory - 55MB, Beats 66.04%
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let mergedArray = [];
    let solution = 0;

    let ptr1 = 0
    let ptr2 = 0

    while (!(ptr1 === nums1.length && ptr2 === nums2.length)) {
      if (ptr1 === nums1.length) {
        mergedArray.push(nums2[ptr2]);
        ptr2++;
      }
      else if (ptr2 === nums2.length) {
        mergedArray.push(nums1[ptr1]);
        ptr1++;
      }
      else if (nums1[ptr1] < nums2[ptr2]){ 
        mergedArray.push(nums1[ptr1]);
        ptr1++;
      } else {
        mergedArray.push(nums2[ptr2]);
        ptr2++;
      }
    }
    
    const mergedLength = mergedArray.length;
    
    const midIndex = Math.floor(mergedLength / 2);
    if (mergedLength % 2 === 0) {
      solution = (mergedArray[midIndex - 1] + mergedArray[midIndex]) / 2;
    } else {
      solution = mergedArray[midIndex];
    }

    return solution;
};

// Test Cases
const nums1_1 = [1, 3]
const nums1_2 = [2]
const solution1 = findMedianSortedArrays(nums1_1, nums1_2)
console.log(`Solution 1 (should be 2.0): ${solution1} - pass: ${solution1 === 2.0}`)

const nums2_1 = [1, 2]
const nums2_2 = [3, 4]
const solution2 = findMedianSortedArrays(nums2_1, nums2_2)
console.log(`Solution 2 (should be 2.5): ${solution2} - pass: ${solution2 === 2.5}`);