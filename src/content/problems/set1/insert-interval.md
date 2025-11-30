---
title: "Insert Interval"
difficulty: "Medium"
tags: ["Intervals"
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def insertIntervals(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        vector<vector<int>> insertIntervals(vector<vector<int>>& intervals, vector<int>& newInterval) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int[][] insertIntervals(int[][] intervals, int[] newInterval) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    var insertIntervals = function(intervals, newInterval) {
        // Write your code here
    };
---

## Problem

Given a list of intervals `intervals` and an interval `newInterval`, write a function to insert `newInterval` into a list of existing, **non-overlapping**, and **sorted** intervals based on their starting points.

The function should ensure that after the new interval is added, the list remains **sorted** without any **overlapping intervals**, merging them if needed.

## Test Cases

**Example 1:**
- **Input:** `intervals = [[1,3],[6,9]]`, `newInterval = [2,5]`
- **Output:** `[[1,5],[6,9]]`
- **Explanation:** The new interval [2,5] overlaps with [1,3], so they are merged into [1,5].

**Example 2:**
- **Input:** `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]`, `newInterval = [4,8]`
- **Output:** `[[1,2],[3,10],[12,16]]`
- **Explanation:** The new interval [4,8] overlaps with [3,5], [6,7], and [8,10], so they are all merged into [3,10].

**Example 3:**
- **Input:** `intervals = []`, `newInterval = [5,7]`
- **Output:** `[[5,7]]`
- **Explanation:** The list is empty, so we just insert the new interval.

**Example 4:**
- **Input:** `intervals = [[1,5]]`, `newInterval = [6,8]`
- **Output:** `[[1,5],[6,8]]`
- **Explanation:** The new interval does not overlap with any existing interval.


## Approach

The key is to process the intervals in **three phases**:

1. **Add intervals before the new interval** - All intervals that end before the new interval starts
2. **Merge overlapping intervals** - Merge any intervals that overlap with the new interval
3. **Add remaining intervals** - All intervals that start after the merged interval ends

**Algorithm:**
1. Initialize an empty result list and a pointer to track the current position
2. **Phase 1**: Add all intervals that end before `newInterval` starts (no overlap possible)
3. **Phase 2**: While there are overlapping intervals, keep expanding the new interval's range:
   - Update start to minimum of current interval's start and new interval's start
   - Update end to maximum of current interval's end and new interval's end
4. Add the merged interval to the result
5. **Phase 3**: Append all remaining intervals

**Time Complexity:** O(n) - Single pass through all intervals  
**Space Complexity:** O(n) - For the result list


## Solution

### Python
```python
from typing import List

class Solution:
    def insertIntervals(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        result: List[List[int]] = []
        n = len(intervals)
        curr = 0
        new_start, new_end = newInterval
        
        # Add intervals before newInterval
        while curr < n and new_start > intervals[curr][1]:
            result.append(intervals[curr])
            curr += 1
        
        # Merge overlapping intervals
        while curr < n and intervals[curr][0] <= new_end:
            new_start = min(intervals[curr][0], new_start)
            new_end = max(intervals[curr][1], new_end)
            curr += 1
        
        result.append([new_start, new_end])
        
        # Append remainder
        result.extend(intervals[curr:])
        
        return result
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> insertIntervals(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int n = intervals.size();
        int curr = 0;
        int new_start = newInterval[0];
        int new_end = newInterval[1];
        
        // Add intervals before newInterval
        while (curr < n && new_start > intervals[curr][1]) {
            result.push_back(intervals[curr]);
            curr++;
        }
        
        // Merge overlapping intervals
        while (curr < n && intervals[curr][0] <= new_end) {
            new_start = min(intervals[curr][0], new_start);
            new_end = max(intervals[curr][1], new_end);
            curr++;
        }
        
        result.push_back({new_start, new_end});
        
        // Append remainder
        while (curr < n) {
            result.push_back(intervals[curr]);
            curr++;
        }
        
        return result;
    }
};
```

### Java
```java
class Solution {
    public int[][] insertIntervals(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int n = intervals.length;
        int curr = 0;
        int newStart = newInterval[0];
        int newEnd = newInterval[1];
        
        // Add intervals before newInterval
        while (curr < n && newStart > intervals[curr][1]) {
            result.add(intervals[curr]);
            curr++;
        }
        
        // Merge overlapping intervals
        while (curr < n && intervals[curr][0] <= newEnd) {
            newStart = Math.min(intervals[curr][0], newStart);
            newEnd = Math.max(intervals[curr][1], newEnd);
            curr++;
        }
        
        result.add(new int[]{newStart, newEnd});
        
        // Append remainder
        while (curr < n) {
            result.add(intervals[curr]);
            curr++;
        }
        
        return result.toArray(new int[result.size()][]);
    }
}
```

### JavaScript
```javascript
var insertIntervals = function(intervals, newInterval) {
    const result = [];
    const n = intervals.length;
    let curr = 0;
    let newStart = newInterval[0];
    let newEnd = newInterval[1];
    
    // Add intervals before newInterval
    while (curr < n && newStart > intervals[curr][1]) {
        result.push(intervals[curr]);
        curr++;
    }
    
    // Merge overlapping intervals
    while (curr < n && intervals[curr][0] <= newEnd) {
        newStart = Math.min(intervals[curr][0], newStart);
        newEnd = Math.max(intervals[curr][1], newEnd);
        curr++;
    }
    
    result.push([newStart, newEnd]);
    
    // Append remainder
    while (curr < n) {
        result.push(intervals[curr]);
        curr++;
    }
    
    return result;
};
```
