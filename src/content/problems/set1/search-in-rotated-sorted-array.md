---
title: "Search in Rotated Sorted Array"
difficulty: "Medium"
tags: ["Binary Search"]
date: "2025-12-07"
source: "Classic Interview Problem"
starterCode:
  python: |
    def search(nums: List[int], target: int) -> int:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        int search(vector<int>& nums, int target) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int search(int[] nums, int target) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    var search = function(nums, target) {
        // Write your code here
    };
---

## Problem
You are given a sorted array that has been rotated at an unknown pivot point, along with a target value. Develop an algorithm to locate the index of the target value in the array. If the target is not present, return -1. The algorithm should have a time complexity of O(log n).

Note:
- The array was originally sorted in ascending order before being rotated.
- The rotation could be at any index, including 0 (no rotation).
- You may assume there are no duplicate elements in the array.

## Test Cases

**Example 1:**
- **Input:** `nums = [4,5,6,7,0,1,2], target = 0`
- **Output:** `4`
- **Explanation:** The index of 0 in the array is 4.

**Example 2:**
- **Input:** `nums = [4,5,6,7,0,1,2], target = 3`
- **Output:** `-1`
- **Explanation:** 3 is not in the array.

## Approach

Since the array is sorted but rotated, a direct binary search isn't immediately applicable. However, at any pivot rotation, at least one half of the array (either left or right) will always be sorted.

We can use a modified **Binary Search**:
1. Find `mid` index. If `nums[mid] == target`, return `mid`.
2. Check if the left half `[low...mid]` is sorted:
   - It is sorted if `nums[low] <= nums[mid]`.
   - If sorted, check if target lies within this range (`nums[low] <= target < nums[mid]`).
     - If yes, search in left half (`high = mid - 1`).
     - If no, search in right half (`low = mid + 1`).
3. If left half is not sorted, then the right half `[mid...high]` MUST be sorted:
   - Check if target lies within this range (`nums[mid] < target <= nums[high]`).
     - If yes, search in right half (`low = mid + 1`).
     - If no, search in left half (`high = mid - 1`).

**Time Complexity:** O(log n)
**Space Complexity:** O(1)

## Solutions

### Python
```python
from typing import List

def search(nums: List[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        num = nums[mid]
        if num == target:
            return mid
        elif nums[low] <= num: # left sorted
            # no pivot in left
            if nums[low] <= target < num:
                high = mid - 1
            else:
                low = mid + 1
        else: # right sorted
            if num < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1

    return -1
```

### C++
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int num = nums[mid];
            if (num == target) return mid;
            
            if (nums[low] <= num) { // left sorted
                if (nums[low] <= target && target < num) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // right sorted
                if (num < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
};
```

### Java
```java
class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int num = nums[mid];
            if (num == target) return mid;
            
            if (nums[low] <= num) { // left sorted
                if (nums[low] <= target && target < num) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // right sorted
                if (num < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const num = nums[mid];
        if (num === target) return mid;
        
        if (nums[low] <= num) { // left sorted
            if (nums[low] <= target && target < num) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else { // right sorted
            if (num < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
};
```
