---
title: "Trapping Rain Water"
difficulty: "Hard"
tags: ["Two Pointers", "Dynamic Programming"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def trap(self, height: List[int]) -> int:
            pass
  cpp: |
    class Solution {
    public:
        int trap(vector<int>& height) {
            
        }
    };
  java: |
    class Solution {
        public int trap(int[] height) {
            
        }
    }
  javascript: |
    /**
     * @param {number[]} height
     * @return {number}
     */
    var trap = function(height) {
        
    };
---

## Problem
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Test Cases

**Example 1:**
- **Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
- **Output:** `6`
- **Explanation:** The above elevation map (black section) is represented by array `[0,1,0,2,1,0,1,3,2,1,2,1]`. In this case, 6 units of rain water (blue section) are being trapped.

**Example 2:**
- **Input:** `height = [3, 4, 1, 2, 2, 5, 1, 0, 2]`
- **Output:** `10`

## Approach

We can solve this efficiently using the **Two Pointers** technique.

The amount of water trapped at any position `i` is determined by `min(max_left, max_right) - height[i]`.
Instead of pre-computing the maximums for every position (which takes O(N) space), we can maintain `left_max` and `right_max` on the fly as we iterate from both ends.

**Algorithm:**
1. Initialize `left` pointer at 0 and `right` pointer at `n-1`.
2. Maintain `left_max` and `right_max` variables.
3. While `left < right`:
   - If `height[left] < height[right]`:
     - If `height[left] >= left_max`, update `left_max`.
     - Else, add `left_max - height[left]` to the answer.
     - Move `left` forward.
   - Else:
     - If `height[right] >= right_max`, update `right_max`.
     - Else, add `right_max - height[right]` to the answer.
     - Move `right` backward.

**Time Complexity:** O(n) - Single pass.
**Space Complexity:** O(1) - Constant extra space.

## Solutions

### Python
```python
class Solution:
    def trap(self, height: List[int]) -> int:
        if len(height) < 3:
            return 0

        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        ans = 0
        
        while left < right:
            h_left, h_right = height[left], height[right]
            if h_left <= h_right:
                if left_max > h_left:
                    ans += left_max - h_left
                else:
                    left_max = h_left
                left += 1
            else:
                if right_max > h_right:
                    ans += right_max - h_right
                else:
                    right_max = h_right
                right -= 1
        return ans
```

### C++
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int left_max = 0, right_max = 0;
        int ans = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= left_max) {
                    left_max = height[left];
                } else {
                    ans += (left_max - height[left]);
                }
                left++;
            } else {
                if (height[right] >= right_max) {
                    right_max = height[right];
                } else {
                    ans += (right_max - height[right]);
                }
                right--;
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int left_max = 0, right_max = 0;
        int ans = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= left_max) {
                    left_max = height[left];
                } else {
                    ans += (left_max - height[left]);
                }
                left++;
            } else {
                if (height[right] >= right_max) {
                    right_max = height[right];
                } else {
                    ans += (right_max - height[right]);
                }
                right--;
            }
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0, right = height.length - 1;
    let left_max = 0, right_max = 0;
    let ans = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                ans += (left_max - height[left]);
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                ans += (right_max - height[right]);
            }
            right--;
        }
    }
    return ans;
};
```
