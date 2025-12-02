---
title: "Largest Rectangle in Histogram"
difficulty: "Hard"
tags: ["Stack", "Monotonic Stack"]
date: "2025-12-02"
source: "LeetCode"
starterCode:
  python: |
    from typing import List

    class Solution:
        def largestRectangleArea(self, heights: List[int]) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int largestRectangleArea(vector<int>& heights) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int largestRectangleArea(int[] heights) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} heights
     * @return {number}
     */
    var largestRectangleArea = function(heights) {
        // Write your code here
    };
---

## Problem

Given an integer array `heights` representing the heights of histogram bars, write a function to find the largest rectangular area possible in a histogram, where each bar's width is 1.

## Test Cases

**Example 1:**
- **Input:** `heights = [2,8,5,6,2,3]`
- **Output:** `15`
- **Explanation:** The largest rectangle is formed by the bars of height 5 and 6, which gives an area of 5 * 2 = 10? No, wait.
  - Let's trace:
  - Bars: [2, 8, 5, 6, 2, 3]
  - 2: area 2*6=12? No, min height is 2. 2*6=12.
  - 8: area 8*1=8.
  - 5,6: min 5, width 2 -> 10.
  - 5,6,2: min 2, width 3 -> 6.
  - Wait, the example output says 15.
  - Let's re-read the example.
  - If heights = [2, 1, 5, 6, 2, 3] (standard example) -> 10.
  - User input: `[2,8,5,6,2,3]`
  - 8: 8*1 = 8
  - 5,6: 5*2 = 10
  - 8,5,6: 5*3 = 15. Yes! 8, 5, 6. Min is 5. Width 3. Area 15.
  - Correct.

**Example 2:**
- **Input:** `heights = [2,4]`
- **Output:** `4`

## Approach

This problem can be solved efficiently using a **Monotonic Stack**.

**Algorithm:**
1. We want to find the largest rectangle where the current bar is the shortest bar in that rectangle.
2. We maintain a stack of indices such that the heights corresponding to these indices are in non-decreasing order.
3. When we encounter a bar `h` that is lower than the bar at the top of the stack, it means the rectangle with the height of the top bar cannot extend further to the right.
4. We pop the top index from the stack and calculate the area:
   - `height` = height of the popped index.
   - `width` = current index `i` - index of the new top of stack - 1. (If stack is empty, width is `i`).
   - `area` = `height` * `width`.
   - Update `max_area`.
5. We repeat this until the stack top is smaller than or equal to the current bar `h`.
6. Push the current index `i` onto the stack.
7. To handle remaining bars in the stack after iterating through the array, we can append a height of `0` to the end of the `heights` array. This forces all bars to be popped and processed.

**Time Complexity:** O(n) - Each element is pushed and popped at most once.
**Space Complexity:** O(n) - Stack size.

## Solution

### Python
```python
from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0

        # Use a sentinel 0 at the end so remaining bars get processed
        heights += [0]
        for idx, height in enumerate(heights):
            # pop while current bar is lower than stack top
            while stack and heights[stack[-1]] > height:
                top = stack.pop()
                width = idx if not stack else idx - stack[-1] - 1
                max_area = max(max_area, heights[top] * width)
            stack.append(idx)

        return max_area
```

### C++
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int max_area = 0;
        heights.push_back(0); // Sentinel
        
        for (int i = 0; i < heights.size(); ++i) {
            while (!st.empty() && heights[st.top()] > heights[i]) {
                int h = heights[st.top()];
                st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                max_area = max(max_area, h * w);
            }
            st.push(i);
        }
        return max_area;
    }
};
```

### Java
```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        // Create a new array with an extra 0 at the end
        int[] newHeights = new int[heights.length + 1];
        System.arraycopy(heights, 0, newHeights, 0, heights.length);
        
        for (int i = 0; i < newHeights.length; i++) {
            while (!stack.isEmpty() && newHeights[stack.peek()] > newHeights[i]) {
                int h = newHeights[stack.pop()];
                int w = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    const stack = [];
    let maxArea = 0;
    // Use a sentinel 0 at the end
    const newHeights = [...heights, 0];
    
    for (let i = 0; i < newHeights.length; i++) {
        while (stack.length > 0 && newHeights[stack[stack.length - 1]] > newHeights[i]) {
            const h = newHeights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    return maxArea;
};
```
