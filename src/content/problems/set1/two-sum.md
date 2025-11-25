---
title: "Two Sum in Sorted Array"
difficulty: "Easy"
tags: ["Two Pointers"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def twoSumSorted(nums: List[int], target: int) -> bool:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        bool twoSumSorted(vector<int>& nums, int target) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public boolean twoSumSorted(int[] nums, int target) {
            # Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    var twoSumSorted = function(nums, target) {
        // Write your code here
    };
---

## Problem
Given a **sorted** array of integers `nums` (in non-decreasing order) and an integer `target`, determine whether there exists a **pair of numbers** in the array whose sum equals `target`.

Return **true** if such a pair exists, otherwise return **false**.

## Test Cases

**Example 1:**
- **Input:** `nums = [1,2,3,4,6], target = 6`
- **Output:** `true`
- **Explanation:** `2 + 4 = 6`

**Example 2:**
- **Input:** `nums = [1,1,3,4], target = 2`
- **Output:** `true`
- **Explanation:** `1 + 1 = 2`

**Example 3:**
- **Input:** `nums = [1,2,5,9], target = 20`
- **Output:** `false`
- **Explanation:** No two numbers sum to 20


## Approach

Because the array is **sorted**, we use two pointers: one starting at the left (smallest value) and one at the right (largest value).

**At each step:**

- Compute the sum of the two pointed values.

- If the sum equals the target, we've found a valid pair.

- If the sum is **too small**, we move the **left** pointer right to increase the sum.

- If the sum is **too large**, we move the **right** pointer left to reduce the sum.

The pointers move toward each other, checking every meaningful pair without ever backtracking.

**Time Complexity:** O(n)  
**Space Complexity:** O(1)


## Solutions

### Python
```python
from typing import List

def twoSumSorted(nums: List[int], target: int) -> bool:
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return True
        if s < target:
            left += 1
        else:
            right -= 1
    return False
```

### C++
```cpp
class Solution {
public:
    bool twoSumSorted(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            long long sum = (long long)nums[left] + nums[right];
            if (sum == target) return true;
            if (sum < target) left++;
            else right--;
        }
        return false;
    }
};
```

### Java
```java
class Solution {
    public boolean twoSumSorted(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            long sum = (long) nums[left] + nums[right];
            if (sum == target) return true;
            if (sum < target) left++;
            else right--;
        }
        return false;
    }
}
```

### JavaScript
```javascript
var twoSumSorted = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
};
```
