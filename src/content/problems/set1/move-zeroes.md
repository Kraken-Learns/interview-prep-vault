---
title: "Move Zeroes"
difficulty: "Easy"
tags: ["Two Pointers"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def moveZeroes(self, nums: List[int]) -> None:
            """
            Do not return anything, modify nums in-place instead.
            """
            pass
  cpp: |
    class Solution {
    public:
        void moveZeroes(vector<int>& nums) {
            
        }
    };
  java: |
    class Solution {
        public void moveZeroes(int[] nums) {
            
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    var moveZeroes = function(nums) {
        
    };
---

## Problem
Given an integer array `nums`, write a function to rearrange the array by moving all zeros to the end while keeping the order of non-zero elements unchanged. Perform this operation **in-place** without creating a copy of the array.

## Test Cases

**Example 1:**
- **Input:** `nums = [2,0,4,0,9]`
- **Output:** `[2,4,9,0,0]`

**Example 2:**
- **Input:** `nums = [0,1,0,3,12]`
- **Output:** `[1,3,12,0,0]`

**Example 3:**
- **Input:** `nums = [0]`
- **Output:** `[0]`

## Approach

We can use a **two-pointer** approach to solve this problem in-place.

1.  Initialize a pointer `valid` to 0. This pointer represents the position where the next non-zero element should be placed.
2.  Iterate through the array with a pointer `curr`.
3.  Whenever `nums[curr]` is non-zero, we swap `nums[curr]` with `nums[valid]` and increment `valid`.
4.  This ensures that all non-zero elements are moved to the front in their original order, and the zeros are pushed to the back (or rather, the non-zeros are swapped past them).

**Time Complexity:** O(n) - We traverse the array once.
**Space Complexity:** O(1) - We modify the array in-place.

## Solutions

### Python
```python
class Solution:
    def moveZeroes(self, nums: List[int]):
        curr, valid = 0, 0
        while curr < len(nums):
            if nums[curr] != 0:
                nums[valid], nums[curr] = nums[curr], nums[valid]
                valid += 1

            curr += 1
```
