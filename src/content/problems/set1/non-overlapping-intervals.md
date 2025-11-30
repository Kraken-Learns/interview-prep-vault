---
title: "Non-Overlapping Intervals"
difficulty: "Medium"
tags: ["Intervals", "Greedy"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def nonOverlappingIntervals(self, intervals: List[List[int]]) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int nonOverlappingIntervals(vector<vector<int>>& intervals) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int nonOverlappingIntervals(int[][] intervals) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    var nonOverlappingIntervals = function(intervals) {
        // Write your code here
    };
---

## Problem

Write a function to return the **minimum number of intervals** that must be removed from a given array `intervals`, where `intervals[i]` consists of a starting point `start[i]` and an ending point `end[i]`, to ensure that the remaining intervals do not overlap.

## Test Cases

**Example 1:**
- **Input:** `intervals = [[1,3],[5,8],[4,10],[11,13]]`
- **Output:** `1`
- **Explanation:** Removing the interval [4,10] leaves all other intervals non-overlapping.

**Example 2:**
- **Input:** `intervals = [[1,2],[2,3],[3,4],[1,3]]`
- **Output:** `1`
- **Explanation:** Remove [1,3] to keep the sequence [1,2], [2,3], [3,4] non-overlapping.

**Example 3:**
- **Input:** `intervals = [[1,2],[1,2],[1,2]]`
- **Output:** `2`
- **Explanation:** Remove any 2 intervals to keep only 1 interval.

**Example 4:**
- **Input:** `intervals = [[1,2],[2,3]]`
- **Output:** `0`
- **Explanation:** No overlaps exist, so no intervals need to be removed.


## Approach

This is a **greedy algorithm** problem. The key insight is to sort intervals by their **end time** and greedily select intervals that end earliest.

**Why sort by end time?**
- By choosing intervals that end earliest, we leave the maximum room for future intervals
- This greedy choice always leads to the optimal solution

**Algorithm:**
1. Sort the intervals by their ending time
2. Keep track of the end time of the last selected (non-removed) interval
3. For each interval:
   - If it starts before the previous interval ends, there's an overlap → increment removal count
   - Otherwise, update the previous end time to the current interval's end time
4. Return the total number of removals

**Time Complexity:** O(n log n) - Dominated by sorting  
**Space Complexity:** O(1) - Only using a few variables (ignoring sorting space)


## Solution

### Python
```python
from typing import List

class Solution:
    def nonOverlappingIntervals(self, intervals: List[List[int]]) -> int:
        n = len(intervals)
        ans = 0
        if n == 0:
            return ans
        
        # Sort by ending time (greedy choice)
        intervals.sort(key=lambda interval: interval[1])
        
        prev_start, prev_end = intervals[0]
        for curr_start, curr_end in intervals[1:]:
            if prev_end > curr_start:  # Overlap detected
                ans += 1
            else:
                prev_end = curr_end  # Update to current interval's end
        
        return ans
```

### C++
```cpp
class Solution {
public:
    int nonOverlappingIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();
        if (n == 0) return 0;
        
        // Sort by ending time (greedy choice)
        sort(intervals.begin(), intervals.end(), 
             [](const vector<int>& a, const vector<int>& b) {
                 return a[1] < b[1];
             });
        
        int ans = 0;
        int prev_end = intervals[0][1];
        
        for (int i = 1; i < n; i++) {
            if (prev_end > intervals[i][0]) {  // Overlap detected
                ans++;
            } else {
                prev_end = intervals[i][1];  // Update to current interval's end
            }
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int nonOverlappingIntervals(int[][] intervals) {
        int n = intervals.length;
        if (n == 0) return 0;
        
        // Sort by ending time (greedy choice)
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        
        int ans = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < n; i++) {
            if (prevEnd > intervals[i][0]) {  // Overlap detected
                ans++;
            } else {
                prevEnd = intervals[i][1];  // Update to current interval's end
            }
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var nonOverlappingIntervals = function(intervals) {
    const n = intervals.length;
    if (n === 0) return 0;
    
    // Sort by ending time (greedy choice)
    intervals.sort((a, b) => a[1] - b[1]);
    
    let ans = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < n; i++) {
        if (prevEnd > intervals[i][0]) {  // Overlap detected
            ans++;
        } else {
            prevEnd = intervals[i][1];  // Update to current interval's end
        }
    }
    
    return ans;
};
```
