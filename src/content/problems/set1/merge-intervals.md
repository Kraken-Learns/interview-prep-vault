---
title: "Merge Intervals"
difficulty: "Medium"
tags: ["Intervals"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def mergeIntervals(self, intervals: List[List[int]]) -> List[List[int]]:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int[][] mergeIntervals(int[][] intervals) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    var mergeIntervals = function(intervals) {
        // Write your code here
    };
---

## Problem

Write a function to consolidate overlapping intervals within a given array `intervals`, where each interval `intervals[i]` consists of a start time `start` and an end time `end`.

Two intervals are considered overlapping if they share any common time, including if one ends exactly when another begins (e.g., `[1,4]` and `[4,5]` overlap and should be merged into `[1,5]`).

The function should return an array of the merged intervals so that no two intervals overlap and all the intervals collectively cover all the time ranges in the original input.

## Test Cases

**Example 1:**
- **Input:** `intervals = [[3,5],[1,4],[7,9],[6,8]]`
- **Output:** `[[1,5],[6,9]]`
- **Explanation:** The intervals `[3,5]` and `[1,4]` overlap and are merged into `[1,5]`. Similarly, `[7,9]` and `[6,8]` overlap and are merged into `[6,9]`.

**Example 2:**
- **Input:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`
- **Output:** `[[1,6],[8,10],[15,18]]`
- **Explanation:** Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.

**Example 3:**
- **Input:** `intervals = [[1,4],[4,5]]`
- **Output:** `[[1,5]]`
- **Explanation:** Intervals `[1,4]` and `[4,5]` are considered overlapping.


## Approach

The standard approach for merging intervals involves **sorting**.

**Algorithm:**
1. **Sort** the intervals based on their start times. This ensures that if we iterate through the list, we only need to compare the current interval with the previously merged interval.
2. Initialize a `result` list.
3. Iterate through the sorted intervals:
   - If the `result` list is empty or the current interval does not overlap with the last merged interval (i.e., `current_start > last_end`), append the current interval to `result`.
   - Otherwise, there is an overlap. Merge the current interval with the last merged interval by updating the end time of the last merged interval to `max(last_end, current_end)`.

**Time Complexity:** O(n log n) - Dominated by the sorting step.  
**Space Complexity:** O(n) - To store the result (or O(log n) for sorting stack space depending on implementation).


## Solution

### Python
```python
from typing import List

class Solution:
    def mergeIntervals(self, intervals: List[List[int]]) -> List[List[int]]:
        n = len(intervals)
        if n == 0:
            return []
        
        # Sort by start time
        intervals.sort(key=lambda interval: interval[0])
        
        prev_start, prev_end = intervals[0]
        result = []
        
        for curr_start, curr_end in intervals[1:]:
            if curr_start <= prev_end:
                # Overlap: merge by extending the end time
                prev_end = max(curr_end, prev_end)
            else:
                # No overlap: add previous interval and reset
                result.append([prev_start, prev_end])
                prev_start, prev_end = curr_start, curr_end
        
        # Add the last interval
        result.append([prev_start, prev_end])
        return result
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        
        // Sort by start time
        sort(intervals.begin(), intervals.end());
        
        vector<vector<int>> result;
        result.push_back(intervals[0]);
        
        for (int i = 1; i < intervals.size(); i++) {
            // Get reference to the last merged interval
            vector<int>& last = result.back();
            
            if (intervals[i][0] <= last[1]) {
                // Overlap: merge
                last[1] = max(last[1], intervals[i][1]);
            } else {
                // No overlap: add new interval
                result.push_back(intervals[i]);
            }
        }
        
        return result;
    }
};
```

### Java
```java
class Solution {
    public int[][] mergeIntervals(int[][] intervals) {
        if (intervals.length == 0) return new int[0][];
        
        // Sort by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> result = new ArrayList<>();
        int[] currentInterval = intervals[0];
        result.add(currentInterval);
        
        for (int[] interval : intervals) {
            int currentEnd = currentInterval[1];
            int nextStart = interval[0];
            int nextEnd = interval[1];
            
            if (nextStart <= currentEnd) {
                // Overlap: merge
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else {
                // No overlap: add new interval
                currentInterval = interval;
                result.add(currentInterval);
            }
        }
        
        return result.toArray(new int[result.size()][]);
    }
}
```

### JavaScript
```javascript
var mergeIntervals = function(intervals) {
    if (intervals.length === 0) return [];
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        const current = intervals[i];
        
        if (current[0] <= last[1]) {
            // Overlap: merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            // No overlap: add new interval
            result.push(current);
        }
    }
    
    return result;
};
```
