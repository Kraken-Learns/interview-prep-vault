---
title: "Number of Islands"
difficulty: "Medium"
tags: ["Matrix", "DFS", "Graph"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def number_of_islands(grid: List[List[int]]) -> int:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        int numberOfIslands(vector<vector<int>>& grid) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int numberOfIslands(int[][] grid) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    var numberOfIslands = function(grid) {
        # Write your code here
    };
---

## Problem

You are given a binary matrix grid of size `m x n`, where `'1'` denotes land and `'0'` signifies water. Determine the count of islands present in this grid.

An island is defined as a region of contiguous land cells connected either vertically or horizontally, and it is completely encircled by water. Assume that the grid is bordered by water on all sides.

## Test Cases

**Example 1:**

**Input:**
```python
grid = [
  [1,1,0,1],
  [1,1,0,1],
  [1,1,0,0]
]
```

**Output:**
```python
2
```

**Visual Representation:**

```text
    0 1 2 3
  ┌─────────┐
0 │ 1 1 . 1 │  Island 1: (0,0), (0,1), (1,0), (1,1)
1 │ 1 1 . 1 │  Island 2: (0,3), (1,3)
2 │ 1 1 . . │
  └─────────┘
  ('.' represents 0/water for clarity)
```

**Explanation:**
- There is a large island on the left formed by a block of 1s.
- There is a separated vertical strip of land on the right.
- Total count: 2.

---

**Example 2:**

**Input:**
```python
grid = [
  [1,1,0,0,0],
  [1,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,1]
]
```

**Output:**
```python
3
```

**Visual Representation:**

```text
    0 1 2 3 4
  ┌───────────┐
0 │ 1 1 . . . │  Island 1: Top-Left block
1 │ 1 1 . . . │
2 │ . . 1 . . │  Island 2: Middle isolated cell
3 │ . . . 1 1 │  Island 3: Bottom-Right strip
  └───────────┘
```

**Explanation:**
- Island 1: Top-left corner.
- Island 2: The single isolated cell at (2, 2).
- Island 3: Bottom-right corner.
- Total count: 3.

---

## Approach

This problem can be modeled as finding the number of connected components in a graph. Each cell with a '1' is a node, and adjacent (vertical or horizontal) '1's have edges between them.

**Strategy (DFS):**

1. **Iterate through the grid**: Loop through every cell in the grid.
2. **Found Land (`1`)**: If we encounter a cell with a `1`, it means we've found a new, unvisited part of an island.
   - Increment our island counter.
   - Start a traversal (DFS or BFS) from this cell to find and "sink" the entire island.
3. **Sink the Island**: In our traversal, mark the current cell and all its connected land neighbors as visited (e.g., by changing `1` to `0` or using a separate visited set). This ensures we don't count the same island multiple times.
4. **Continue**: Proceed with the iteration until all cells are processed.

**Time Complexity:** O(M × N), where M is the number of rows and N is the number of columns. We visit each cell at most a constant number of times.

**Space Complexity:** O(M × N) in the worst case for the recursion stack (if the entire grid is one big snake-like island) or standard recursion depth for DFS.

## Solutions

### Python
```python
from typing import List

class Solution:
    def number_of_islands(self, grid: List[List[int]]) -> int:
        if not grid:
            return 0
            
        directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]
        num_rows, num_cols = len(grid), len(grid[0])

        def dfs(row, col):
            # Boundary checks and water check
            if row < 0 or col < 0 or row >= num_rows or col >= num_cols:
                return
            if grid[row][col] == 0:
                return

            # Mark as visited (sink the land)
            grid[row][col] = 0
            
            # Visit neighbors
            for r, c in directions:
                dfs(row + r, col + c)

        num_islands = 0
        for row in range(num_rows):
            for col in range(num_cols):
                if grid[row][col] == 1:
                    num_islands += 1
                    dfs(row, col)

        return num_islands
```

### C++
```cpp
#include <vector>

class Solution {
private:
    int numRows;
    int numCols;
    const std::vector<std::pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    void dfs(std::vector<std::vector<int>>& grid, int row, int col) {
        // Boundary checks and water check
        if (row < 0 || col < 0 || row >= numRows || col >= numCols || grid[row][col] == 0) {
            return;
        }

        // Mark as visited
        grid[row][col] = 0;

        // Visit neighbors
        for (const auto& dir : directions) {
            dfs(grid, row + dir.first, col + dir.second);
        }
    }

public:
    int numberOfIslands(std::vector<std::vector<int>>& grid) {
        if (grid.empty()) return 0;

        numRows = grid.size();
        numCols = grid[0].size();
        int numIslands = 0;

        for (int i = 0; i < numRows; ++i) {
            for (int j = 0; j < numCols; ++j) {
                if (grid[i][j] == 1) {
                    numIslands++;
                    dfs(grid, i, j);
                }
            }
        }

        return numIslands;
    }
};
```

### Java
```java
class Solution {
    private int numRows;
    private int numCols;
    private final int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    private void dfs(int[][] grid, int row, int col) {
        // Boundary checks and water check
        if (row < 0 || col < 0 || row >= numRows || col >= numCols || grid[row][col] == 0) {
            return;
        }

        // Mark as visited
        grid[row][col] = 0;

        // Visit neighbors
        for (int[] dir : directions) {
            dfs(grid, row + dir[0], col + dir[1]);
        }
    }

    public int numberOfIslands(int[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }

        numRows = grid.length;
        numCols = grid[0].length;
        int numIslands = 0;

        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                if (grid[i][j] == 1) {
                    numIslands++;
                    dfs(grid, i, j);
                }
            }
        }

        return numIslands;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numberOfIslands = function(grid) {
    if (!grid || grid.length === 0) {
        return 0;
    }

    const numRows = grid.length;
    const numCols = grid[0].length;
    let numIslands = 0;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const dfs = (row, col) => {
        // Boundary checks and water check
        if (row < 0 || col < 0 || row >= numRows || col >= numCols || grid[row][col] === 0) {
            return;
        }

        // Mark as visited
        grid[row][col] = 0;

        // Visit neighbors
        for (const [dr, dc] of directions) {
            dfs(row + dr, col + dc);
        }
    };

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === 1) {
                numIslands++;
                dfs(i, j);
            }
        }
    }

    return numIslands;
};
```
