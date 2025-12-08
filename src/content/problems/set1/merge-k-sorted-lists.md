---
title: "Merge K Sorted Lists"
difficulty: "Hard"
tags: ["Heap", "Linked List"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def mergeKLists(lists: List[List[int]]) -> List[int]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        vector<int> mergeKLists(vector<vector<int>>& lists) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public List<Integer> mergeKLists(int[][] lists) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} lists
     * @return {number[]}
     */
    var mergeKLists = function(lists) {
        // Write your code here
    };
---

## Problem
Given k linked lists, each sorted in ascending order, in a list `lists`, write a function to merge the input lists into one sorted linked list.

## Test Cases

**Example 1:**
- **Input:** `lists = [[3,4,6],[2,3,5],[-1,6]]`
  ```
  3 -> 4 -> 6
  2 -> 3 -> 5
  -1 -> 6
  ```
- **Output:** `[-1,2,3,3,4,5,6,6]`
  ```
  -1 -> 2 -> 3 -> 3 -> 4 -> 5 -> 6 -> 6
  ```
- **Explanation:** Merging all three lists results in a single sorted list.


## Approach

To efficiently merge k sorted lists, we use a **min-heap**:

**Strategy:**

1. Initialize a min-heap with the first element from each non-empty list.
   - Each heap entry contains a tuple: `(value, list_index, next_index)`.
   - `value` is the current element, `list_index` identifies which list it came from, and `next_index` tracks the position in that list.

2. While the heap is not empty:
   - Pop the smallest element from the heap and add it to the result.
   - If the list that element came from has more elements, push the next element from that list into the heap.

3. Continue until all elements from all lists have been processed.

**Why this works:**
- The heap always contains the smallest unprocessed element from each list.
- By repeatedly extracting the minimum, we build the merged sorted list.
- We only need to track k elements at a time (one from each list).

**Time Complexity:** O(N log k) where N is the total number of elements across all lists, and k is the number of lists.
**Space Complexity:** O(k) for the heap, plus O(N) for the result.


## Solutions

### Python
```python
from typing import List
import heapq

class Solution:
    def mergeKLists(self, lists: List[List[int]]):
        heap = [(lst[0], idx, 1) for idx, lst in enumerate(lists) if lst]
        heapq.heapify(heap)

        result = []
        while heap:
            num, idx, next_idx = heapq.heappop(heap)
            result.append(num)
            if next_idx < len(lists[idx]):
                heapq.heappush(heap, (lists[idx][next_idx], idx, next_idx+1))

        return result
```

### C++
```cpp
class Solution {
public:
    vector<int> mergeKLists(vector<vector<int>>& lists) {
        // Min heap: tuple of (value, list_index, next_index)
        auto cmp = [](const tuple<int, int, int>& a, const tuple<int, int, int>& b) {
            return get<0>(a) > get<0>(b);  // min heap
        };
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, decltype(cmp)> minHeap(cmp);
        
        // Initialize heap with first element from each list
        for (int i = 0; i < lists.size(); i++) {
            if (!lists[i].empty()) {
                minHeap.push({lists[i][0], i, 1});
            }
        }
        
        vector<int> result;
        while (!minHeap.empty()) {
            auto [num, listIdx, nextIdx] = minHeap.top();
            minHeap.pop();
            result.push_back(num);
            
            if (nextIdx < lists[listIdx].size()) {
                minHeap.push({lists[listIdx][nextIdx], listIdx, nextIdx + 1});
            }
        }
        
        return result;
    }
};
```

### Java
```java
import java.util.*;

class Solution {
    public List<Integer> mergeKLists(int[][] lists) {
        // Min heap: array of [value, list_index, next_index]
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            (a, b) -> a[0] - b[0]  // min heap
        );
        
        // Initialize heap with first element from each list
        for (int i = 0; i < lists.length; i++) {
            if (lists[i].length > 0) {
                minHeap.offer(new int[]{lists[i][0], i, 1});
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            int[] curr = minHeap.poll();
            int num = curr[0];
            int listIdx = curr[1];
            int nextIdx = curr[2];
            
            result.add(num);
            
            if (nextIdx < lists[listIdx].length) {
                minHeap.offer(new int[]{lists[listIdx][nextIdx], listIdx, nextIdx + 1});
            }
        }
        
        return result;
    }
}
```

### JavaScript
```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);
        return min;
    }
    
    size() {
        return this.heap.length;
    }
    
    _bubbleUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx][0] <= this.heap[idx][0]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    _bubbleDown(idx) {
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            
            if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
                smallest = right;
            }
            
            if (smallest === idx) break;
            
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

var mergeKLists = function(lists) {
    const minHeap = new MinHeap();
    
    // Initialize heap with first element from each list
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].length > 0) {
            minHeap.push([lists[i][0], i, 1]);
        }
    }
    
    const result = [];
    while (minHeap.size() > 0) {
        const [num, listIdx, nextIdx] = minHeap.pop();
        result.push(num);
        
        if (nextIdx < lists[listIdx].length) {
            minHeap.push([lists[listIdx][nextIdx], listIdx, nextIdx + 1]);
        }
    }
    
    return result;
};
```
