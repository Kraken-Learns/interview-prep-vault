---
title: "Employee Free Time"
difficulty: "Hard"
tags: ["Intervals"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def employeeFreeTime(self, schedule: List[List[List[int]]]) -> List[List[int]]:
            # Write your code here
            pass
  cpp: |
    /*
    // Definition for an Interval.
    class Interval {
    public:
        int start;
        int end;
    
        Interval() {}
    
        Interval(int _start, int _end) {
            start = _start;
            end = _end;
        }
    };
    */
    
    class Solution {
    public:
        vector<Interval> employeeFreeTime(vector<vector<Interval>> schedule) {
            // Write your code here
        }
    };
  java: |
    /*
    // Definition for an Interval.
    class Interval {
        public int start;
        public int end;
    
        public Interval() {}
    
        public Interval(int _start, int _end) {
            start = _start;
            end = _end;
        }
    };
    */
    
    class Solution {
        public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * // Definition for an Interval.
     * function Interval(start, end) {
     *    this.start = start;
     *    this.end = end;
     * };
     */
    
    /**
     * @param {Interval[][]} schedule
     * @return {Interval[]}
     */
    var employeeFreeTime = function(schedule) {
        // Write your code here
    };
---

## Problem

Write a function to find the **common free time** for all employees from a list called `schedule`. Each employee's schedule is represented by a list of **non-overlapping** intervals sorted by start times.

The function should return a list of finite, non-zero length intervals where **all** employees are free, also sorted in order.

## Test Cases

**Example 1:**
- **Input:** `schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]`
- **Output:** `[[3,4]]`
- **Explanation:** There are a total of three employees, and all common free time intervals would be `[-inf, 1]`, `[3, 4]`, `[10, inf]`. We discard any intervals that contain inf as they aren't finite.

**Example 2:**
- **Input:** `schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]`
- **Output:** `[[5,6],[7,9]]`
- **Explanation:** The common free time intervals are `[5,6]` and `[7,9]`.

**Example 3:**
- **Input:** `schedule = [[[2,4],[7,10]],[[1,5]],[[6,9]]]`
- **Output:** `[[5,6]]`
- **Explanation:** The three employees collectively have only one common free time interval, which is from 5 to 6.


## Approach

This problem can be reduced to merging intervals. If we treat all employees' working intervals as one large list of busy intervals, we just need to find the gaps between the merged busy intervals.

**Algorithm:**
1. **Flatten** the list of schedules into a single list of intervals.
2. **Sort** all intervals by their start time.
3. **Merge** overlapping intervals.
4. The **gaps** between the merged intervals represent the free time.
   - For example, if merged intervals are `[1,3]` and `[5,6]`, the gap is `[3,5]`.

**Time Complexity:** O(N log N), where N is the total number of intervals across all employees (due to sorting).  
**Space Complexity:** O(N) to store the flattened list and merged results.


## Solution

### Python
```python
from typing import List

class Solution:
    def employeeFreeTime(self, schedule: List[List[List[int]]]) -> List[List[int]]:
        # Flatten the schedule into a single list of intervals
        all_busy = [interval for employee in schedule for interval in employee]
        if not all_busy:
            return []
        
        # Sort by start time
        all_busy.sort(key=lambda interval: interval[0])
        
        # Merge overlapping intervals
        merged_busy = []
        prev_start, prev_end = all_busy[0]
        
        for curr_start, curr_end in all_busy[1:]:
            if curr_start < prev_end:
                # Overlap: extend the previous interval
                prev_end = max(prev_end, curr_end)
            else:
                # No overlap: add the previous merged interval
                merged_busy.append([prev_start, prev_end])
                prev_start, prev_end = curr_start, curr_end
        
        merged_busy.append([prev_start, prev_end])
        
        # Find gaps between merged intervals
        result = []
        for i in range(1, len(merged_busy)):
            # The gap is between the end of the previous interval and start of current
            result.append([merged_busy[i-1][1], merged_busy[i][0]])
            
        return result
```

### C++
```cpp
/*
// Definition for an Interval.
class Interval {
public:
    int start;
    int end;

    Interval() {}

    Interval(int _start, int _end) {
        start = _start;
        end = _end;
    }
};
*/

class Solution {
public:
    vector<Interval> employeeFreeTime(vector<vector<Interval>> schedule) {
        vector<Interval> all_busy;
        for (const auto& employee : schedule) {
            for (const auto& interval : employee) {
                all_busy.push_back(interval);
            }
        }
        
        if (all_busy.empty()) return {};
        
        sort(all_busy.begin(), all_busy.end(), [](const Interval& a, const Interval& b) {
            return a.start < b.start;
        });
        
        vector<Interval> merged_busy;
        merged_busy.push_back(all_busy[0]);
        
        for (size_t i = 1; i < all_busy.size(); i++) {
            if (all_busy[i].start < merged_busy.back().end) {
                merged_busy.back().end = max(merged_busy.back().end, all_busy[i].end);
            } else {
                merged_busy.push_back(all_busy[i]);
            }
        }
        
        vector<Interval> result;
        for (size_t i = 1; i < merged_busy.size(); i++) {
            result.push_back(Interval(merged_busy[i-1].end, merged_busy[i].start));
        }
        
        return result;
    }
};
```

### Java
```java
/*
// Definition for an Interval.
class Interval {
    public int start;
    public int end;

    public Interval() {}

    public Interval(int _start, int _end) {
        start = _start;
        end = _end;
    }
};
*/

class Solution {
    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<Interval> allBusy = new ArrayList<>();
        for (List<Interval> employee : schedule) {
            allBusy.addAll(employee);
        }
        
        if (allBusy.isEmpty()) return new ArrayList<>();
        
        Collections.sort(allBusy, (a, b) -> a.start - b.start);
        
        List<Interval> mergedBusy = new ArrayList<>();
        Interval current = allBusy.get(0);
        mergedBusy.add(current);
        
        for (int i = 1; i < allBusy.size(); i++) {
            Interval next = allBusy.get(i);
            if (next.start < current.end) {
                current.end = Math.max(current.end, next.end);
            } else {
                current = next;
                mergedBusy.add(current);
            }
        }
        
        List<Interval> result = new ArrayList<>();
        for (int i = 1; i < mergedBusy.size(); i++) {
            result.add(new Interval(mergedBusy.get(i-1).end, mergedBusy.get(i).start));
        }
        
        return result;
    }
}
```

### JavaScript
```javascript
/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */

/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
var employeeFreeTime = function(schedule) {
    const allBusy = [];
    for (const employee of schedule) {
        for (const interval of employee) {
            allBusy.push(interval);
        }
    }
    
    if (allBusy.length === 0) return [];
    
    allBusy.sort((a, b) => a.start - b.start);
    
    const mergedBusy = [allBusy[0]];
    
    for (let i = 1; i < allBusy.length; i++) {
        const last = mergedBusy[mergedBusy.length - 1];
        const current = allBusy[i];
        
        if (current.start < last.end) {
            last.end = Math.max(last.end, current.end);
        } else {
            mergedBusy.push(current);
        }
    }
    
    const result = [];
    for (let i = 1; i < mergedBusy.length; i++) {
        result.push(new Interval(mergedBusy[i-1].end, mergedBusy[i].start));
    }
    
    return result;
};
```
