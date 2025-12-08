---
title: "K Closest Points to Origin"
difficulty: "Medium"
tags: ["Heap"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def kClosest(points: List[List[int]], k: int) -> List[List[int]]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int[][] kClosest(int[][] points, int k) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    var kClosest = function(points, k) {
        // Write your code here
    };
---

## Problem
Given a list of points in the form `[[x1, y1], [x2, y2], ... [xn, yn]]` and an integer `k`, find the k closest points to the origin (0, 0) on the 2D plane.

The distance between a point (x, y) and the origin (0, 0) is calculated using the Euclidean distance formula:

√(x² + y²)

Return the k closest points in any order.

## Test Cases

**Example 1:**
- **Input:** `points = [[3,4],[2,2],[1,1],[0,0],[5,5]], k = 3`
- **Output:** `[[2,2],[1,1],[0,0]]`
- **Explanation:** The distances are: [3,4]=5, [2,2]=2√2≈2.83, [1,1]=√2≈1.41, [0,0]=0, [5,5]=5√2≈7.07. The 3 closest are [0,0], [1,1], and [2,2].

**Note:** The output can be in any order. All of the following are valid:
- `[[2,2],[1,1],[0,0]]`
- `[[2,2],[0,0],[1,1]]`
- `[[1,1],[0,0],[2,2]]`
- `[[1,1],[2,2],[0,0]]`
- `[[0,0],[1,1],[2,2]]`
- `[[0,0],[2,2],[1,1]]`


## Approach

To efficiently find the k closest points, we use a **max-heap** of size k:

**Strategy:**

1. Build a max-heap containing the first k points, storing tuples of (negative distance, point).
   - We use negative distance because Python's `heapq` is a min-heap, so negating makes it a max-heap.
   - We can avoid calculating the square root since comparing x² + y² gives the same ordering as comparing √(x² + y²).

2. For each remaining point:
   - Calculate its squared distance to the origin.
   - If this distance is less than the farthest point in our heap (the max), remove the farthest and add the new point.

3. After processing all points, the heap contains the k closest points.

**Optimization:** We use squared distances (x² + y²) instead of actual distances (√(x² + y²)) to avoid expensive square root calculations.

**Time Complexity:** O(n log k) - We process n points, each heap operation takes O(log k).
**Space Complexity:** O(k) - The heap stores k points.


## Solutions

### Python
```python
from typing import List
import heapq

class Solution:
    def kClosest(self, points: List[List[int]], k: int):
        # build a max-heap (by negative distance) of the first k points
        k_distances = [(-(point[0] ** 2 + point[1] ** 2), point)
                         for point in points[:k]]
        heapq.heapify(k_distances)

        for x,y in points[k:]:
            dist = -(x ** 2 + y ** 2)

            # if this point is closer than the current farthest (top of heap)
            if dist > k_distances[0][0]:
                heapq.heappop(k_distances)
                heapq.heappush(k_distances, (dist, [x,y]))

        return [point for _,point in k_distances]
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Max heap: pair of (distance, point_index)
        auto cmp = [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first < b.first;  // max heap
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> maxHeap(cmp);
        
        // Add first k points
        for (int i = 0; i < k; i++) {
            int dist = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            maxHeap.push({dist, i});
        }
        
        // Process remaining points
        for (int i = k; i < points.size(); i++) {
            int dist = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            if (dist < maxHeap.top().first) {
                maxHeap.pop();
                maxHeap.push({dist, i});
            }
        }
        
        // Extract results
        vector<vector<int>> result;
        while (!maxHeap.empty()) {
            result.push_back(points[maxHeap.top().second]);
            maxHeap.pop();
        }
        return result;
    }
};
```

### Java
```java
import java.util.PriorityQueue;

class Solution {
    public int[][] kClosest(int[][] points, int k) {
        // Max heap of pairs (distance, index)
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> b[0] - a[0]  // max heap
        );
        
        // Add first k points
        for (int i = 0; i < k; i++) {
            int dist = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            maxHeap.offer(new int[]{dist, i});
        }
        
        // Process remaining points
        for (int i = k; i < points.length; i++) {
            int dist = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            if (dist < maxHeap.peek()[0]) {
                maxHeap.poll();
                maxHeap.offer(new int[]{dist, i});
            }
        }
        
        // Extract results
        int[][] result = new int[k][2];
        for (int i = 0; i < k; i++) {
            result[i] = points[maxHeap.poll()[1]];
        }
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

var kClosest = function(points, k) {
    const maxHeap = new MaxHeap();
    
    // Add first k points
    for (let i = 0; i < k; i++) {
        const dist = points[i][0] ** 2 + points[i][1] ** 2;
        maxHeap.push([dist, points[i]]);
    }
    
    // Process remaining points
    for (let i = k; i < points.length; i++) {
        const dist = points[i][0] ** 2 + points[i][1] ** 2;
        if (dist < maxHeap.peek()[0]) {
            maxHeap.pop();
            maxHeap.push([dist, points[i]]);
        }
    }
    
    // Extract results
    const result = [];
    while (maxHeap.size() > 0) {
        result.push(maxHeap.pop()[1]);
    }
    return result;
};
```
