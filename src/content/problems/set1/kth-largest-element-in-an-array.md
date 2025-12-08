---
title: "Kth Largest Element in an Array"
difficulty: "Medium"
tags: ["Heap"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def kthLargest(nums: List[int], k: int) -> int:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        int kthLargest(vector<int>& nums, int k) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int kthLargest(int[] nums, int k) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    var kthLargest = function(nums, k) {
        // Write your code here
    };
---

## Problem
Write a function that takes an array of unsorted integers `nums` and an integer `k`, and returns the kth largest element in the array. This function should run in O(n log k) time, where n is the length of the array.

## Test Cases

**Example 1:**
- **Input:** `nums = [5, 3, 2, 1, 4], k = 2`
- **Output:** `4`
- **Explanation:** The sorted array in descending order is [5, 4, 3, 2, 1], so the 2nd largest element is 4.


## Approach

To achieve O(n log k) time complexity, we use a **min-heap** of size k:

**Strategy:**

1. Initialize a min-heap with the first k elements from the array.

2. For each remaining element in the array:
   - If the element is larger than the smallest element in the heap (the root), remove the root and add the new element.
   - This maintains a heap of the k largest elements seen so far.

3. After processing all elements, the root of the heap is the kth largest element.

**Why this works:**
- The min-heap always contains the k largest elements.
- The smallest of these k elements (at the root) is the kth largest overall.

**Time Complexity:** O(n log k) - We iterate through n elements, and each heap operation takes O(log k).
**Space Complexity:** O(k) - The heap stores k elements.


## Solutions

### Python
```python
from typing import List
import heapq

class Solution:
    def kthLargest(self, nums: List[int], k: int):
        arr = nums[:k]
        heapq.heapify(arr)

        for num in nums[k:]:
            if num > arr[0]:
                heapq.heappop(arr)
                heapq.heappush(arr, num)

        return arr[0]
```

### C++
```cpp
class Solution {
public:
    int kthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        // Add first k elements to the heap
        for (int i = 0; i < k; i++) {
            minHeap.push(nums[i]);
        }
        
        // Process remaining elements
        for (int i = k; i < nums.size(); i++) {
            if (nums[i] > minHeap.top()) {
                minHeap.pop();
                minHeap.push(nums[i]);
            }
        }
        
        return minHeap.top();
    }
};
```

### Java
```java
import java.util.PriorityQueue;

class Solution {
    public int kthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        // Add first k elements to the heap
        for (int i = 0; i < k; i++) {
            minHeap.offer(nums[i]);
        }
        
        // Process remaining elements
        for (int i = k; i < nums.length; i++) {
            if (nums[i] > minHeap.peek()) {
                minHeap.poll();
                minHeap.offer(nums[i]);
            }
        }
        
        return minHeap.peek();
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
    
    peek() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    _bubbleUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[idx]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    _bubbleDown(idx) {
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            
            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            
            if (smallest === idx) break;
            
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

var kthLargest = function(nums, k) {
    const minHeap = new MinHeap();
    
    // Add first k elements to the heap
    for (let i = 0; i < k; i++) {
        minHeap.push(nums[i]);
    }
    
    // Process remaining elements
    for (let i = k; i < nums.length; i++) {
        if (nums[i] > minHeap.peek()) {
            minHeap.pop();
            minHeap.push(nums[i]);
        }
    }
    
    return minHeap.peek();
};
```
