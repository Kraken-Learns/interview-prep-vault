---
title: "Daily Temperatures"
difficulty: "Medium"
tags: ["Stack", "Array", "Monotonic Stack"]
date: "2025-12-01"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def dailyTemperatures(self, temps: List[int]) -> List[int]:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        vector<int> dailyTemperatures(vector<int>& temps) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int[] dailyTemperatures(int[] temps) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} temps
     * @return {number[]}
     */
    var dailyTemperatures = function(temps) {
        // Write your code here
    };
---

## Problem

Given an integer array `temps` representing daily temperatures, write a function to calculate the number of days one has to wait for a warmer temperature after each given day.

The function should return an array `answer` where `answer[i]` represents the wait time for a warmer day after the `i`th day. If no warmer day is expected in the future, set `answer[i]` to `0`.

## Test Cases

**Example 1:**
- **Input:** `temps = [65, 70, 68, 60, 55, 75, 80, 74]`
- **Output:** `[1,4,3,2,1,1,0,0]`
- **Explanation:** 
  - Day 0 (65): Next warmer is 70 (Day 1) -> Wait 1 day.
  - Day 1 (70): Next warmer is 75 (Day 5) -> Wait 4 days.
  - Day 2 (68): Next warmer is 75 (Day 5) -> Wait 3 days.
  - ...and so on.

**Example 2:**
- **Input:** `temps = [73, 74, 75, 71, 69, 72, 76, 73]`
- **Output:** `[1, 1, 4, 2, 1, 1, 0, 0]`

**Example 3:**
- **Input:** `temps = [30, 40, 50, 60]`
- **Output:** `[1, 1, 1, 0]`

**Example 4:**
- **Input:** `temps = [30, 60, 90]`
- **Output:** `[1, 1, 0]`


## Approach

This problem is a classic application of a **Monotonic Stack**.

**Algorithm:**
1. Initialize an array `result` of the same length as `temps` with all zeros.
2. Initialize an empty stack. This stack will store **indices** of the temperatures.
3. Iterate through the `temps` array using index `i`:
   - While the stack is not empty AND the current temperature `temps[i]` is **greater than** the temperature at the index stored at the top of the stack (`temps[stack.top()]`):
     - This means we found a warmer day for the day at `stack.top()`.
     - Pop the index `prev_index` from the stack.
     - Calculate the wait time: `i - prev_index`.
     - Store this wait time in `result[prev_index]`.
   - Push the current index `i` onto the stack.
4. Return the `result` array.

**Time Complexity:** O(n) - Each element is pushed onto the stack once and popped at most once.  
**Space Complexity:** O(n) - In the worst case (strictly decreasing temperatures), the stack will contain all indices.


## Solution

### Python
```python
from typing import List

class Solution:
    def dailyTemperatures(self, temps: List[int]) -> List[int]:
        result = [0] * len(temps)
        stack = []

        for idx, temp in enumerate(temps):
            while stack and temps[stack[-1]] < temp:
                top = stack.pop()
                result[top] = idx - top
            stack.append(idx)

        return result
```

### C++
```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temps) {
        int n = temps.size();
        vector<int> result(n, 0);
        stack<int> st;

        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temps[st.top()] < temps[i]) {
                int idx = st.top();
                st.pop();
                result[idx] = i - idx;
            }
            st.push(i);
        }
        return result;
    }
};
```

### Java
```java
class Solution {
    public int[] dailyTemperatures(int[] temps) {
        int n = temps.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temps[stack.peek()] < temps[i]) {
                int idx = stack.pop();
                result[idx] = i - idx;
            }
            stack.push(i);
        }
        return result;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} temps
 * @return {number[]}
 */
var dailyTemperatures = function(temps) {
    const n = temps.length;
    const result = new Array(n).fill(0);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temps[stack[stack.length - 1]] < temps[i]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
};
```
