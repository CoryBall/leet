/**
 * 2 pointers, move right ptr right until duplicate is found
 * when duplicate is found, record length, replace left ptr with index of first copy of char
 * 
 * keep going until left ptr is maxLength from end of string
 */

/**
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function(s) {
  let leftPtr = 0;
  let rightPtr = 0;
  let solution = 0;

  while (leftPtr + solution < s.length) {
    const map = {}

    while (map[s.charAt(rightPtr)] === undefined && rightPtr < s.length) {
      map[s.charAt(rightPtr)] = rightPtr;
      rightPtr++;
    }

    if (rightPtr - leftPtr > solution) {
      solution = rightPtr - leftPtr;
    }

    if (rightPtr === s.length) {
      return solution
    }

    if (map[s.charAt(rightPtr)] !== undefined) {
      leftPtr = map[s.charAt(rightPtr)] + 1;
      rightPtr = leftPtr;
    }
  }
  return solution;
};

// Test Cases
const input1 = "abcabcbb"
const solution1 = lengthOfLongestSubstring(input1)
console.log('solution1 "abcabcbb" (should be 3): ', solution1)

const input2 = "bbbbb"
const solution2 = lengthOfLongestSubstring(input2)
console.log('solution2 "bbbbb" (should be 1): ', solution2)

const input3 = "pwwkew"
const solution3 = lengthOfLongestSubstring(input3)
console.log('solution3 "pwwkew" (should be 3): ', solution3)

const input4 = " "
const solution4 = lengthOfLongestSubstring(input4)
console.log('solution4 " " (should be 1): ', solution4)

const input5 = ""
const solution5 = lengthOfLongestSubstring(input5)
console.log('solution5  "" (should be 0): ', solution5)


const input6 = "au"
const solution6 = lengthOfLongestSubstring(input6)
console.log('solution6 "au" (should be 2): ', solution6)