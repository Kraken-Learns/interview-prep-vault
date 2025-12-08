---
title: "Find K Closest Elements"
difficulty: "Medium"
tags: ["Heap"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def kClosest(nums: List[int], k: int, target: int) -> List[int]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        vector<int> kClosest(vector<int>& nums, int k, int target) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public List<Integer> kClosest(int[] nums, int k, int target) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number} target
     * @return {number[]}
     */
    var kClosest = function(nums, k, target) {
        // Write your code here
    };
---

## Problem
Given a sorted array `nums`, a target value `target`, and an integer `k`, find the k closest elements to `target` in the array, where "closest" is the absolute difference between each element and `target`. Return these elements in array, sorted in ascending order.

## Test Cases

**Example 1:**
- **Input:** `nums = [-1, 0, 1, 4, 6], target = 1, k = 3`
- **Output:** `[-1, 0, 1]`
- **Explanation:** -1 is 2 away from 1, 0 is 1 away from 1, and 1 is 0 away from 1. All other elements are more than 2 away. Since we need to return the elements in ascending order, the answer is [-1, 0, 1].

**Example 2:**
- **Input:** `nums = [5, 6, 7, 8, 9], target = 10, k = 2`
- **Output:** `[8, 9]`
- **Explanation:** 8 is 2 away, 9 is 1 away. These are the two closest elements.


## Approach

To find the k closest elements efficiently, we can use a **max-heap** approach:

**Strategy:**

1. Initialize a max-heap with the first k elements, storing tuples of (negative distance, element).
   - We use negative distances because Python's `heapq` is a min-heap, so negating makes it behave as a max-heap.
   - The distance is calculated as `abs(target - num)`.

2. For each remaining element:
   - Calculate its distance from the target.
   - If this distance is smaller than the farthest element in our heap (the max), remove the farthest and add the new element.

3. After processing all elements, the heap contains the k closest elements.

4. Since the problem requires sorted output and the input is already sorted, we can sort the final result.

**Time Complexity:** O(n log k + k log k) - Process n elements with heap operations, then sort k elements.
**Space Complexity:** O(k) - The heap stores k elements.

**Alternative Approach:** Since the array is sorted, we could also use a two-pointer sliding window approach starting from a binary search position, which would be O(log n + k) time.


## Solutions

### Python
```python
from typing import List
import heapq

class Solution:
    def kClosest(self, nums: List[int], k: int, target: int):
        heap = [(-abs(target - num), num) for num in nums[:k]]
        heapq.heapify(heap)
        for num in nums[k:]:
            dist = -abs(target - num)
            if dist > heap[0][0]:
                heapq.heappop(heap)
                heapq.heappush(heap, (dist, num))

        return sorted([num for _, num in heap])
```

### C++
```cpp
class Solution {
public:
    vector<int> kClosest(vector<int>& nums, int k, int target) {
        // Max heap: pair of (distance, element)
        auto cmp = [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first < b.first;  // max heap
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> maxHeap(cmp);
        
        // Add first k elements
        for (int i = 0; i < k; i++) {
            int dist = abs(nums[i] - target);
            maxHeap.push({dist, nums[i]});
        }
        
        // Process remaining elements
        for (int i = k; i < nums.size(); i++) {
            int dist = abs(nums[i] - target);
            if (dist < maxHeap.top().first) {
                maxHeap.pop();
                maxHeap.push({dist, nums[i]});
            }
        }
        
        // Extract and sort results
        vector<int> result;
        while (!maxHeap.empty()) {
            result.push_back(maxHeap.top().second);
            maxHeap.pop();
        }
        sort(result.begin(), result.end());
        return result;
    }
};
```

### Java
```java
import java.util.*;

class Solution {
    public List<Integer> kClosest(int[] nums, int k, int target) {
        // Max heap of pairs (distance, element)
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> b[0] - a[0]  // max heap
        );
        
        // Add first k elements
        for (int i = 0; i < k; i++) {
            int dist = Math.abs(nums[i] - target);
            maxHeap.offer(new int[]{dist, nums[i]});
        }
        
        // Process remaining elements
        for (int i = k; i < nums.length; i++) {
            int dist = Math.abs(nums[i] - target);
            if (dist < maxHeap.peek()[0]) {
                maxHeap.poll();
                maxHeap.offer(new int[]{dist, nums[i]});
            }
        }
        
        // Extract and sort results
        List<Integer> result = new ArrayList<>();
        while (!maxHeap.isEmpty()) {
            result.add(maxHeap.poll()[1]);
        }
        Collections.sort(result);
        return result;
    }
}
```

### JavaScript
```javascript
class MaxHeap {
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
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);
        return max;
    }
    
    peek() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    _bubbleUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx][0] >= this.heap[idx][0]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    _bubbleDown(idx) {
        while (true) {
            let largest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            
            if (left < this.heap.length && this.heap[left][0] > this.heap[largest][0]) {
                largest = left;
            }
            if (right < this.heap.length && this.heap[right][0] > this.heap[largest][0]) {
                largest = right;
            }
            
            if (largest === idx) break;
            
            [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
            idx = largest;
        }
    }
}

var kClosest = function(nums, k, target) {
    const maxHeap = new MaxHeap();
    
    // Add first k elements
    for (let i = 0; i < k; i++) {
        const dist = Math.abs(nums[i] - target);
        maxHeap.push([dist, nums[i]]);
    }
    
    // Process remaining elements
    for (let i = k; i < nums.length; i++) {
        const dist = Math.abs(nums[i] - target);
        if (dist < maxHeap.peek()[0]) {
            maxHeap.pop();
            maxHeap.push([dist, nums[i]]);
        }
    }
    
    // Extract and sort results
    const result = [];
    while (maxHeap.size() > 0) {
        result.push(maxHeap.pop()[1]);
    }
    return result.sort((a, b) => a - b);
};
```
