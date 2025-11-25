---
title: "Container With Most Water"
difficulty: "Medium"
tags: ["Two Pointers", "Greedy"]
date: "2023-10-28"
source: "LeetCode"
starterCode:
  python: |
    def max_area(heights: List[int]) -> int:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        int maxArea(vector<int>& heights) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int maxArea(int[] heights) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} heights
     * @return {number}
     */
    var maxArea = function(heights) {
        // Write your code here
    };
---

## Problem
Given an integer input array `heights` representing the heights of vertical lines, write a function that returns the **maximum area of water** that can be contained by two of the lines (and the x-axis).

The area between two lines is calculated as: `min(height[i], height[j]) * (j - i)`, where `i` and `j` are the indices of the two lines.

Return the maximum area that can be contained.

## Test Cases

**Example 1:**
- **Input:** `heights = [3, 4, 1, 2, 2, 4, 1, 3, 2]`
- **Output:** `21`
- **Explanation:** The optimal container is formed between the lines at indices 1 (height=4) and 5 (height=4), giving an area of `min(4, 4) * (5 - 1) = 4 * 4 + 4 + 1 = 21`. Actually, between indices 1 and 7: `min(4, 3) * (7 - 1) = 3 * 6 = 18`. Let me recalculate: between indices 0 and 7: `min(3, 3) * (7 - 0) = 3 * 7 = 21`.

**Example 2:**
- **Input:** `heights = [1, 2, 1]`
- **Output:** `2`
- **Explanation:** The optimal container is formed between indices 0 (height=1) and 1 (height=2), giving an area of `min(1, 2) * (1 - 0) = 1 * 1 = 1`. Or between indices 1 and 2: `min(2, 1) * (2 - 1) = 1 * 1 = 1`. Actually between 0 and 2: `min(1, 1) * (2 - 0) = 1 * 2 = 2`.

**Example 3:**
- **Input:** `heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]`
- **Output:** `49`
- **Explanation:** The optimal container is formed between indices 1 (height=8) and 8 (height=7), giving an area of `min(8, 7) * (8 - 1) = 7 * 7 = 49`.


## Approach

To find the maximum area efficiently, we use a **two-pointer greedy approach**:

**Strategy:**

1. Start with two pointers: one at the **leftmost** line (`left = 0`) and one at the **rightmost** line (`right = n - 1`).

2. At each step, calculate the current area: `area = min(heights[left], heights[right]) * (right - left)`.

3. Update the maximum area if the current area is larger.

4. **Move the pointer with the smaller height** inward:
   - If `heights[left] < heights[right]`, move `left` pointer to the right (`left += 1`)
   - Otherwise, move `right` pointer to the left (`right -= 1`)

5. Repeat until the two pointers meet.

**Why this works:**

The key insight is that the area is limited by the **shorter line**. By moving the pointer at the shorter line, we have a chance to find a taller line that might give us a larger area. Moving the pointer at the taller line can never increase the area because:
- The width decreases
- The height is still limited by the shorter line (which hasn't changed)

**Time Complexity:** O(n) - We visit each element at most once  
**Space Complexity:** O(1) - Only using two pointers and a variable for max area


## Solutions

### Python
```python
from typing import List

def max_area(heights: List[int]) -> int:
    if len(heights) < 2:
        return 0
    
    left, right = 0, len(heights) - 1
    ans = 0
    
    while left < right:
        h_left, h_right = heights[left], heights[right]
        area = min(h_left, h_right) * (right - left)
        ans = max(ans, area)
        
        if h_left < h_right:
            left += 1
        else:
            right -= 1
    
    return ans
```

### C++
```cpp
class Solution {
public:
    int maxArea(vector<int>& heights) {
        if (heights.size() < 2) return 0;
        
        int left = 0, right = heights.size() - 1;
        int ans = 0;
        
        while (left < right) {
            int h_left = heights[left], h_right = heights[right];
            int area = min(h_left, h_right) * (right - left);
            ans = max(ans, area);
            
            if (h_left < h_right) {
                left++;
            } else {
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
    public int maxArea(int[] heights) {
        if (heights.length < 2) return 0;
        
        int left = 0, right = heights.length - 1;
        int ans = 0;
        
        while (left < right) {
            int hLeft = heights[left], hRight = heights[right];
            int area = Math.min(hLeft, hRight) * (right - left);
            ans = Math.max(ans, area);
            
            if (hLeft < hRight) {
                left++;
            } else {
                right--;
            }
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var maxArea = function(heights) {
    if (heights.length < 2) return 0;
    
    let left = 0, right = heights.length - 1;
    let ans = 0;
    
    while (left < right) {
        const hLeft = heights[left], hRight = heights[right];
        const area = Math.min(hLeft, hRight) * (right - left);
        ans = Math.max(ans, area);
        
        if (hLeft < hRight) {
            left++;
        } else {
            right--;
        }
    }
    
    return ans;
};
```
