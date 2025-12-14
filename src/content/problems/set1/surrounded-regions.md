---
title: "Surrounded Regions"
difficulty: "Medium"
tags: ["Matrix", "DFS", "Graph"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def surrounded_regions(grid: List[List[str]]) -> List[List[str]]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        void solve(vector<vector<char>>& board) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public void solve(char[][] board) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    var solve = function(board) {
        // Write your code here
    };
---

## Problem

Given an `m x n` matrix grid containing only characters `'X'` and `'O'`, modify the grid to replace all regions of `'O'` that are completely surrounded by `'X'` with `'X'`.

A region of `'O'` is surrounded by `'X'` if there is no adjacent path (cells that border each other in the N, W, E, S directions) consisting of only `'O'` from anywhere inside that region to the border of the board.

Basically, any `'O'` that is not connected to the border of the grid (directly or via other `'O'`s) should be flipped to `'X'`.

## Test Cases

**Example 1:**

**Input:**
```python
grid = [
  ["X","X","X","X","O"],
  ["X","X","O","X","X"],
  ["X","X","O","X","O"],
  ["X","O","X","X","X"],
  ["X","O","X","X","X"]
]
```

**Output:**
```python
[
  ["X","X","X","X","O"],
  ["X","X","X","X","X"],
  ["X","X","X","X","O"],
  ["X","O","X","X","X"],
  ["X","O","X","X","X"]
]
```

**Visual Representation:**

**Before:**
![Example 1 Before](/interview-prep-vault/images/set1/surrounded_regions_ex1_before.svg)

**After:**
![Example 1 After](/interview-prep-vault/images/set1/surrounded_regions_ex1_after.svg)

**Explanation:** 
- The `'O'`s at `(1, 2)` and `(2, 2)` are connected to each other, but they are surrounded by `'X'`s on all sides except... wait, let's trace carefully.
- The `'O'` at `(2, 2)` is connected to `'O'` at `(1, 2)`.
- Are they connected to the border?
  - `(1,2)` neighbors: `(0,2)=X`, `(2,2)=O`, `(1,1)=X`, `(1,3)=X`.
  - `(2,2)` neighbors: `(1,2)=O`, `(3,2)=X`, `(2,1)=X`, `(2,3)=X`.
  - Neither connects to a border `'O'`. So they are surrounded.
- The `'O'` at `(0, 4)` is on the border.
- The `'O'` at `(2, 4)` is on the border.
- The `'O'`s at `(3, 1)` and `(4, 1)` are connected to the border at `(4,1)`.

So, the inner group `{(1,2), (2,2)}` gets flipped to `'X'`.

---

**Example 2:**

**Input:**
```python
grid = [
  ["O","O"],
  ["O","X"]
]
```

**Output:**
```python
[
  ["O","O"],
  ["O","X"]
]
```

**Visual Representation:**

**Before:**
![Example 2 Before](/interview-prep-vault/images/set1/surrounded_regions_ex2_before.svg)

**After:**
![Example 2 After](/interview-prep-vault/images/set1/surrounded_regions_ex2_after.svg)

---

## Approach

The key realization is that any `'O'` connected to the border (directly or indirectly) **cannot** be surrounded. All other `'O'`s are captured.

**Strategy (Reverse Thinking / Boundary DFS):**

1.  **Identify Safe Regions:** Instead of searching for surrounded regions, search for "safe" regions—those connected to the boundary.
2.  **Traverse from Boundary:** Iterate over all cells on the four borders of the grid. If a cell contains `'O'`, run a traversal (DFS or BFS) starting from that cell.
3.  **Mark Safe Cells:** During the traversal, mark every reachable `'O'` as a special temporary character (e.g., `'S'` or `'T'`) to indicate it is "Safe".
4.  **Final Pass:** Iterate through the entire grid:
    - If a cell is `'S'`, it is safe -> change it back to `'O'`.
    - If a cell is `'O'`, it was not reached from the border -> change it to `'X'` (captured).
    - `'X'` cells remain `'X'`.

**Time Complexity:** O(M × N), where M and N are grid dimensions. We visit each cell a constant number of times.

**Space Complexity:** O(M × N) for the recursion stack in the worst case.

## Solutions

### Python
```python
from typing import List

class Solution:
    def surrounded_regions(self, grid: List[List[str]]) -> List[List[str]]:
        if not grid:
            return grid
        rows, cols = len(grid), len(grid[0])
        directions = [(0, 1), (0, -1), (-1, 0), (1, 0)]
        
        def dfs(row, col):
            # Check bounds
            if row < 0 or row >= rows or col < 0 or col >= cols:
                return
            
            # If not 'O', it's either 'X' or already marked 'S'
            if grid[row][col] != 'O':
                return

            # Mark as safe
            grid[row][col] = 'S'
            
            for r, c in directions:
                dfs(row + r, col + c)
            
        # 1. Run DFS from all border 'O's
        # Top and Bottom borders
        for col in range(cols):
            if grid[0][col] == 'O':
                dfs(0, col)
            if grid[rows-1][col] == 'O':
                dfs(rows-1, col)

        # Left and Right borders
        for row in range(rows):
            if grid[row][0] == 'O':
                dfs(row, 0)
            if grid[row][cols-1] == 'O':
                dfs(row, cols-1)

        # 2. Process the grid to finalize states
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 'S':
                    grid[row][col] = 'O'  # Restore safe 'O'
                elif grid[row][col] == 'O':
                    grid[row][col] = 'X'  # Capture surrounded 'O'

        return grid
```

### C++
```cpp
#include <vector>

class Solution {
private:
    int rows;
    int cols;
    const std::vector<std::pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    void dfs(std::vector<std::vector<char>>& board, int row, int col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] != 'O') {
            return;
        }

        // Mark as Safe
        board[row][col] = 'S';

        for (const auto& dir : directions) {
            dfs(board, row + dir.first, col + dir.second);
        }
    }

public:
    void solve(std::vector<std::vector<char>>& board) {
        if (board.empty()) return;

        rows = board.size();
        cols = board[0].size();

        // 1. DFS from borders
        for (int i = 0; i < cols; ++i) {
            if (board[0][i] == 'O') dfs(board, 0, i);
            if (board[rows - 1][i] == 'O') dfs(board, rows - 1, i);
        }
        for (int i = 0; i < rows; ++i) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][cols - 1] == 'O') dfs(board, i, cols - 1);
        }

        // 2. Final pass
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                if (board[i][j] == 'S') {
                    board[i][j] = 'O';
                } else if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
            }
        }
    }
};
```

### Java
```java
class Solution {
    private int rows;
    private int cols;
    private final int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    private void dfs(char[][] board, int row, int col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] != 'O') {
            return;
        }

        // Mark as Safe
        board[row][col] = 'S';

        for (int[] dir : directions) {
            dfs(board, row + dir[0], col + dir[1]);
        }
    }

    public void solve(char[][] board) {
        if (board == null || board.length == 0) return;

        rows = board.length;
        cols = board[0].length;

        // 1. DFS from borders
        for (int j = 0; j < cols; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j);
            if (board[rows - 1][j] == 'O') dfs(board, rows - 1, j);
        }
        for (int i = 0; i < rows; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0);
            if (board[i][cols - 1] == 'O') dfs(board, i, cols - 1);
        }

        // 2. Final pass
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] == 'S') {
                    board[i][j] = 'O';
                } else if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
            }
        }
    }
}
```

### JavaScript
```javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    if (!board || board.length === 0) return;

    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const dfs = (row, col) => {
        if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] !== 'O') {
            return;
        }

        // Mark as Safe
        board[row][col] = 'S';

        for (const [dr, dc] of directions) {
            dfs(row + dr, col + dc);
        }
    };

    // 1. DFS from borders
    // Top and Bottom
    for (let j = 0; j < cols; j++) {
        if (board[0][j] === 'O') dfs(0, j);
        if (board[rows - 1][j] === 'O') dfs(rows - 1, j);
    }
    // Left and Right
    for (let i = 0; i < rows; i++) {
        if (board[i][0] === 'O') dfs(i, 0);
        if (board[i][cols - 1] === 'O') dfs(i, cols - 1);
    }

    // 2. Final pass
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 'S') {
                board[i][j] = 'O';
            } else if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }
};
```
