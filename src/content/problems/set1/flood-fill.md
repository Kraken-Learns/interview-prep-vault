---
title: "Flood Fill"
difficulty: "Easy"
tags: ["Matrix", "DFS", "Graph"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def flood_fill(image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int[][] floodFill(int[][] image, int sr, int sc, int color) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} image
     * @param {number} sr
     * @param {number} sc
     * @param {number} color
     * @return {number[][]}
     */
    var floodFill = function(image, sr, sc, color) {
        // Write your code here
    };
---

## Problem

Given a `m x n` integer grid `image` and integers `sr`, `sc`, and `newColor`, write a function to perform a flood fill on the image starting from the pixel `image[sr][sc]`.

In a **flood fill**, start by changing the color of `image[sr][sc]` to `newColor`. Then, change the color of all pixels connected to `image[sr][sc]` from either the top, bottom, left, or right that have the same color as `image[sr][sc]`, along with all the connected pixels of those pixels, and so on.

Return the modified image after performing the flood fill.

## Test Cases

**Example 1:**

**Input:**
```python
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1
sc = 1
color = 2
```

**Output:**
```python
[[2,2,2],[2,2,0],[2,0,1]]
```

**Visual representation:**

**Before:**
![Example 1 Before](/interview-prep-vault/images/set1/flood-fill-ex1-before.png)

**After:**
![Example 1 After](/interview-prep-vault/images/set1/flood-fill-ex1-after.png)

**Explanation:** 
- Start at pixel `[1,1]` with color `1`
- All connected pixels with color `1` are changed to color `2`
- The flood spreads to all 4-directionally connected pixels with the same original color

**Step-by-step flood propagation:**
```
Step 1: [1,1] → 2
Step 2: [0,1], [1,0], [1,2] → check neighbors
Step 3: [0,0], [0,2], [2,0] → check neighbors
Result: All connected 1s become 2s
```

---

**Example 2:**

**Input:**
```python
image = [[1,0,1],[1,0,0],[0,0,1]]
sr = 1
sc = 1
color = 2
```

**Output:**
```python
[[1,2,1],[1,2,2],[2,2,1]]
```

**Visual representation:**

**Before:**
![Example 2 Before](/interview-prep-vault/images/set1/flood-fill-ex2-before.png)

**After:**
![Example 2 After](/interview-prep-vault/images/set1/flood-fill-ex2-after.png)

**Explanation:** 
- Start at pixel `[1,1]` with color `0`
- The zeros connected to the starting pixel are colored with the new color `2`
- All 4-directionally connected pixels with original color `0` are changed

---

**Example 3:**

**Input:**
```python
image = [[0,0,0],[0,0,0]]
sr = 0
sc = 0
color = 0
```

**Output:**
```python
[[0,0,0],[0,0,0]]
```

**Explanation:** 
- Starting pixel already has the target color
- No changes needed (early termination to avoid infinite recursion)

---

## Approach

This is a classic graph traversal problem where we treat the 2D grid as a graph. Each pixel is a node, and adjacent pixels (up, down, left, right) are its neighbors.

**Strategy:**

1. **Edge Cases:**
   - If the starting pixel already has the target color, return immediately (important to avoid infinite recursion)
   - Check for valid grid boundaries

2. **Store Original Color:**
   - Save the color of the starting pixel before changing it
   - This is the color we'll be looking for when spreading the flood

3. **DFS/BFS Traversal:**
   - Start from `[sr, sc]`
   - Change current pixel to `newColor`
   - For each of the 4 directions (up, down, left, right):
     - Check if the neighbor is within bounds
     - Check if the neighbor has the original color
     - Recursively apply flood fill to that neighbor

4. **Termination:**
   - DFS naturally stops when:
     - Out of bounds
     - Different color encountered
     - All reachable pixels processed

**Key Insight:**
- We must check if `image[sr][sc] == color` at the start. If true, return immediately to avoid infinite recursion
- We only need to track the original color, not visited pixels, because we're changing colors as we go

**Time Complexity:** O(m × n) where m and n are the dimensions of the image. In worst case, we visit every pixel once.

**Space Complexity:** O(m × n) for the recursion stack in worst case (e.g., all pixels connected in a snake pattern).

## Solutions

### Python
```python
from typing import List

class Solution:
    def flood_fill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]
        
        num_rows = len(image)
        if not num_rows:
            return image
        num_cols = len(image[0])
        
        if sr < 0 or sc < 0 or sr >= num_rows or sc >= num_cols:
            return image
        
        # Early termination: if starting pixel already has target color
        if image[sr][sc] == color:
            return image
        
        target_color = image[sr][sc]
        
        def dfs(row, col):
            # Check bounds
            if row < 0 or col < 0 or row >= num_rows or col >= num_cols:
                return
            
            # Check if current pixel has the target color
            if image[row][col] != target_color:
                return
            
            # Change color
            image[row][col] = color
            
            # Recursively fill neighbors
            for dr, dc in directions:
                dfs(row + dr, col + dc)
        
        dfs(sr, sc)
        return image
```

### C++
```cpp
#include <vector>

class Solution {
private:
    int numRows, numCols;
    int targetColor;
    std::vector<std::pair<int, int>> directions = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}};
    
    void dfs(std::vector<std::vector<int>>& image, int row, int col, int color) {
        // Check bounds
        if (row < 0 || col < 0 || row >= numRows || col >= numCols) {
            return;
        }
        
        // Check if current pixel has the target color
        if (image[row][col] != targetColor) {
            return;
        }
        
        // Change color
        image[row][col] = color;
        
        // Recursively fill neighbors
        for (const auto& [dr, dc] : directions) {
            dfs(image, row + dr, col + dc, color);
        }
    }
    
public:
    std::vector<std::vector<int>> floodFill(std::vector<std::vector<int>>& image, int sr, int sc, int color) {
        numRows = image.size();
        if (numRows == 0) return image;
        numCols = image[0].size();
        
        if (sr < 0 || sc < 0 || sr >= numRows || sc >= numCols) {
            return image;
        }
        
        // Early termination
        if (image[sr][sc] == color) {
            return image;
        }
        
        targetColor = image[sr][sc];
        dfs(image, sr, sc, color);
        
        return image;
    }
};
```

### Java
```java
class Solution {
    private int numRows, numCols;
    private int targetColor;
    private int[][] directions = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}};
    
    private void dfs(int[][] image, int row, int col, int color) {
        // Check bounds
        if (row < 0 || col < 0 || row >= numRows || col >= numCols) {
            return;
        }
        
        // Check if current pixel has the target color
        if (image[row][col] != targetColor) {
            return;
        }
        
        // Change color
        image[row][col] = color;
        
        // Recursively fill neighbors
        for (int[] dir : directions) {
            dfs(image, row + dir[0], col + dir[1], color);
        }
    }
    
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        numRows = image.length;
        if (numRows == 0) return image;
        numCols = image[0].length;
        
        if (sr < 0 || sc < 0 || sr >= numRows || sc >= numCols) {
            return image;
        }
        
        // Early termination
        if (image[sr][sc] == color) {
            return image;
        }
        
        targetColor = image[sr][sc];
        dfs(image, sr, sc, color);
        
        return image;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    
    const numRows = image.length;
    if (numRows === 0) return image;
    const numCols = image[0].length;
    
    if (sr < 0 || sc < 0 || sr >= numRows || sc >= numCols) {
        return image;
    }
    
    // Early termination
    if (image[sr][sc] === color) {
        return image;
    }
    
    const targetColor = image[sr][sc];
    
    function dfs(row, col) {
        // Check bounds
        if (row < 0 || col < 0 || row >= numRows || col >= numCols) {
            return;
        }
        
        // Check if current pixel has the target color
        if (image[row][col] !== targetColor) {
            return;
        }
        
        // Change color
        image[row][col] = color;
        
        // Recursively fill neighbors
        for (const [dr, dc] of directions) {
            dfs(row + dr, col + dc);
        }
    }
    
    dfs(sr, sc);
    return image;
};
```
