from typing import List


class Solution:
    # Time complexity: O(2n)
    # One n to create a set of nums, another n to loop through nums
    def my_solution(self, nums: List[int], target: int) -> List[int]:
        numSet = set(nums)
        for i, num in enumerate(nums):
            if num > 0 & num > target:
                continue
            complement = target - num
            if complement in numSet:
                j = nums.index(complement)
                if i != j:
                    return [i, j]
        return []
    
    # One-pass Hash Table
    # Time complexity: O(n)
    # Loop through nums once, checking index's complement in hash. If found, return index, if not, add to hash
    def fastest(self, nums: List[int], target: int) -> List[int]:
        hashmap = {}
        for i in range(len(nums)):
            complement = target - nums[i]
            if complement in hashmap:
                return [i, hashmap[complement]]
            hashmap[nums[i]] = i
        # Return an empty list if no solution is found
        return []