---
title: "Can Attend Meetings"
difficulty: "Easy"
tags: ["Intervals"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        bool canAttendMeetings(vector<vector<int>>& intervals) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public boolean canAttendMeetings(int[][] intervals) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} intervals
     * @return {boolean}
     */
    var canAttendMeetings = function(intervals) {
        // Write your code here
    };
---

## Problem

Write a function to check if a person can attend all the meetings scheduled without any time conflicts. Given an array `intervals`, where each element `[s1, e1]` represents a meeting starting at time `s1` and ending at time `e1`, determine if there are any overlapping meetings.

If there is **no overlap** between any meetings, return `true`; otherwise, return `false`.

**Note:** Meetings ending and starting at the same time, such as `(0,5)` and `(5,10)`, do **not** conflict.

## Test Cases

**Example 1:**
- **Input:** `intervals = [(1,5), (3,9), (6,8)]`
- **Output:** `false`
- **Explanation:** The meetings (1,5) and (3,9) overlap.

**Example 2:**
- **Input:** `intervals = [(10,12), (6,9), (13,15)]`
- **Output:** `true`
- **Explanation:** There are no overlapping meetings, so the person can attend all.

**Example 3:**
- **Input:** `intervals = [(0,5), (5,10), (10,15)]`
- **Output:** `true`
- **Explanation:** Meetings that end and start at the same time do not conflict.

**Example 4:**
- **Input:** `intervals = []`
- **Output:** `true`
- **Explanation:** No meetings means no conflicts.


## Approach

The key insight is to **sort the meetings by their start times** and then check if any consecutive meetings overlap.

**Algorithm:**
1. Sort the intervals by their start time
2. Iterate through consecutive pairs of meetings
3. For each pair, check if the current meeting starts before the previous meeting ends
4. If any overlap is found (current start < previous end), return `false`
5. If we check all pairs without finding an overlap, return `true`

**Why Sorting Works:**
- After sorting by start time, we only need to check if each meeting starts before the previous one ends
- We don't need to check non-consecutive meetings because if meeting A ends before B starts, and B ends before C starts, then A and C definitely don't overlap

**Time Complexity:** O(n log n) - Dominated by the sorting step  
**Space Complexity:** O(1) - If we ignore the space used by sorting (or O(n) if we count it)


## Solution

### Python
```python
from typing import List

class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        # Sort by start time
        intervals.sort(key=lambda interval: interval[0])
        
        # Check consecutive meetings for overlap
        for prev, curr in zip(intervals, intervals[1:]):
            if curr[0] < prev[1]:  # Current starts before previous ends
                return False
        
        return True
```

### C++
```cpp
class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        // Sort by start time
        sort(intervals.begin(), intervals.end(), 
             [](const vector<int>& a, const vector<int>& b) {
                 return a[0] < b[0];
             });
        
        // Check consecutive meetings for overlap
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < intervals[i-1][1]) {
                return false;
            }
        }
        
        return true;
    }
};
```

### Java
```java
class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        // Sort by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        // Check consecutive meetings for overlap
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i-1][1]) {
                return false;
            }
        }
        
        return true;
    }
}
```

### JavaScript
```javascript
var canAttendMeetings = function(intervals) {
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Check consecutive meetings for overlap
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i-1][1]) {
            return false;
        }
    }
    
    return true;
};
```
