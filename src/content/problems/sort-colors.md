---
title: "Sort Colors"
difficulty: "Medium"
tags: ["Array", "Two Pointers", "Sorting"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def sortColors(self, nums: List[int]) -> None:
            """
            Do not return anything, modify nums in-place instead.
            """
            pass
  cpp: |
    class Solution {
    public:
        void sortColors(vector<int>& nums) {
            
        }
    };
  java: |
    class Solution {
        public void sortColors(int[] nums) {
            
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    var sortColors = function(nums) {
        
    };
---

## Problem
Write a function to sort a given integer array `nums` in-place (and without the built-in sort function), where the array contains `n` integers that are either 0, 1, and 2 and represent the colors red, white, and blue. Arrange the objects so that same-colored ones are adjacent, in the order of red, white, and blue (0, 1, 2).

## Test Cases

**Example 1:**
- **Input:** `nums = [2,1,2,0,1,0,1,0,1]`
- **Output:** `[0,0,0,1,1,1,1,2,2]`

**Example 2:**
- **Input:** `nums = [2,0,2,1,1,0]`
- **Output:** `[0,0,1,1,2,2]`

## Approach

This problem is a classic variation of the **Dutch National Flag problem**. The goal is to sort the array with three distinct values (0, 1, 2) in a single pass using constant extra space.

We can solve this using three pointers:
- `start` (or `low`): Tracks the position where the next 0 should go.
- `end` (or `high`): Tracks the position where the next 2 should go.
- `curr` (or `mid`): Iterates through the array.

**Algorithm:**
1. Initialize `start` to 0, `end` to `n - 1`, and `curr` to 0.
2. Iterate while `curr <= end`:
   - If `nums[curr] == 0`: Swap `nums[curr]` with `nums[start]`. Increment both `start` and `curr`.
   - If `nums[curr] == 1`: Just increment `curr`.
   - If `nums[curr] == 2`: Swap `nums[curr]` with `nums[end]`. Decrement `end`. **Do not** increment `curr` here, as the swapped value from `end` needs to be checked.

**Time Complexity:** O(n) - One pass.
**Space Complexity:** O(1) - In-place.

## Solutions

### Python
```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        start, end = 0, len(nums) - 1
        curr = 0
        
        while curr <= end:
            if nums[curr] == 0:
                nums[start], nums[curr] = nums[curr], nums[start]
                start += 1
                curr += 1
            elif nums[curr] == 2:
                nums[end], nums[curr] = nums[curr], nums[end]
                end -= 1
            else:
                curr += 1
```

### C++
```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int start = 0, end = nums.size() - 1, curr = 0;
        while (curr <= end) {
            if (nums[curr] == 0) {
                swap(nums[curr], nums[start]);
                start++;
                curr++;
            } else if (nums[curr] == 2) {
                swap(nums[curr], nums[end]);
                end--;
            } else {
                curr++;
            }
        }
    }
};
```

### Java
```java
class Solution {
    public void sortColors(int[] nums) {
        int start = 0, end = nums.length - 1, curr = 0;
        while (curr <= end) {
            if (nums[curr] == 0) {
                int temp = nums[curr];
                nums[curr] = nums[start];
                nums[start] = temp;
                start++;
                curr++;
            } else if (nums[curr] == 2) {
                int temp = nums[curr];
                nums[curr] = nums[end];
                nums[end] = temp;
                end--;
            } else {
                curr++;
            }
        }
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let start = 0, end = nums.length - 1, curr = 0;
    while (curr <= end) {
        if (nums[curr] === 0) {
            [nums[start], nums[curr]] = [nums[curr], nums[start]];
            start++;
            curr++;
        } else if (nums[curr] === 2) {
            [nums[end], nums[curr]] = [nums[curr], nums[end]];
            end--;
        } else {
            curr++;
        }
    }
};
```
