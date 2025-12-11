---
title: "Path Sum II"
difficulty: "Medium"
tags: ["Tree", "DFS", "Backtracking"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    # class TreeNode:
    #     def __init__(self, val: int, left: 'TreeNode' = None, right: 'TreeNode' = None):
    #         self.val = val
    #         self.left = left
    #         self.right = right

    def pathSum(root: TreeNode, target: int) -> List[List[int]]:
        # Write your code here
        pass
  cpp: |
    /**
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
     * };
     */
    class Solution {
    public:
        vector<vector<int>> pathSum(TreeNode* root, int target) {
            // Write your code here
        }
    };
  java: |
    /**
     * class TreeNode {
     *     int val;
     *     TreeNode left;
     *     TreeNode right;
     *     TreeNode(int x) { val = x; }
     * }
     */
    class Solution {
        public List<List<Integer>> pathSum(TreeNode root, int target) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     */
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @return {number[][]}
     */
    var pathSum = function(root, target) {
        // Write your code here
    };
---

## Problem
Given the root of a binary tree and an integer `target`, write a recursive function to find all root-to-leaf paths where the sum of all the values along the path sum to `target`.

## Test Cases

**Example 1:**
- **Input:** `[1,2,4,4,7,5,1], target = 10`
- **Output:** `[[1,2,7],[1,4,5]]`
- **Note:** `[[1,4,5],[1,2,7]]` is also accepted.
- **Explanation:** The paths are **1 → 2 → 7** and **1 → 4 → 5**.

**Visual representation:**
```
           1
         /   \
        2     4
         \   / \
          7 5   1

Valid paths (sum = 10):
• Path 1: 1 → 2 → 7
  Sum: 1 + 2 + 7 = 10 ✓
  
• Path 2: 1 → 4 → 5
  Sum: 1 + 4 + 5 = 10 ✓

Invalid paths:
• 1 → 4 → 1 = 6 ✗

Output: [[1,2,7], [1,4,5]]
```


## Approach

This problem extends the basic "Path Sum" problem by collecting all valid paths, not just checking if one exists. We use **backtracking** to explore all paths.

**Strategy:**

1. Use a helper function that tracks:
   - The current node
   - The running sum of values along the current path
   - The current path being explored

2. At each node:
   - Add the node's value to the current sum
   - Add the node's value to the current path
   - If it's a leaf node and the sum equals target, save a copy of the path
   - Recursively explore left and right subtrees
   - **Backtrack**: Remove the node from the path before returning

3. The backtracking step (popping from the path) is crucial - it ensures we don't carry path elements from one branch into another.

**Key Insight:** We must copy the path when saving it (`path[:]` or `path.copy()`) because the same list is being reused and modified throughout the recursion.

**Why this works:**
- We explore every root-to-leaf path using DFS
- The path list tracks the current exploration
- Backtracking ensures paths are independent
- Only valid paths (leaf nodes with correct sum) are saved

**Time Complexity:** O(n²) in the worst case - we visit n nodes, and each leaf might need to copy a path of length h (which could be n in a skewed tree).
**Space Complexity:** O(h) for the recursion stack and current path, plus O(k × h) for storing k valid paths of average length h.


## Solutions

### Python
```python
# class TreeNode:
#     def __init__(self, val: int, left: 'TreeNode' = None, right: 'TreeNode' = None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def pathSum(self, root: TreeNode, target: int):
        paths = []

        def pathHelper(node: TreeNode, curr_sum: int, path: List[int]):
            if not node:
                return

            curr_sum += node.val
            path.append(node.val)

            if not node.left and not node.right:
                if curr_sum == target:
                    paths.append(path[:])
            
            pathHelper(node.left, curr_sum, path)
            pathHelper(node.right, curr_sum, path)            
            path.pop()

        pathHelper(root, 0 , [])
        return paths
```

### C++
```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */
class Solution {
private:
    vector<vector<int>> paths;
    
    void pathHelper(TreeNode* node, int currSum, int target, vector<int>& path) {
        if (!node) {
            return;
        }
        
        currSum += node->val;
        path.push_back(node->val);
        
        if (!node->left && !node->right) {
            if (currSum == target) {
                paths.push_back(path);
            }
        }
        
        pathHelper(node->left, currSum, target, path);
        pathHelper(node->right, currSum, target, path);
        path.pop_back();
    }
    
public:
    vector<vector<int>> pathSum(TreeNode* root, int target) {
        paths.clear();
        vector<int> path;
        pathHelper(root, 0, target, path);
        return paths;
    }
};
```

### Java
```java
/**
 * class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    private List<List<Integer>> paths = new ArrayList<>();
    
    private void pathHelper(TreeNode node, int currSum, int target, List<Integer> path) {
        if (node == null) {
            return;
        }
        
        currSum += node.val;
        path.add(node.val);
        
        if (node.left == null && node.right == null) {
            if (currSum == target) {
                paths.add(new ArrayList<>(path));
            }
        }
        
        pathHelper(node.left, currSum, target, path);
        pathHelper(node.right, currSum, target, path);
        path.remove(path.size() - 1);
    }
    
    public List<List<Integer>> pathSum(TreeNode root, int target) {
        paths = new ArrayList<>();
        pathHelper(root, 0, target, new ArrayList<>());
        return paths;
    }
}
```

### JavaScript
```javascript
/**
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function(root, target) {
    const paths = [];
    
    function pathHelper(node, currSum, path) {
        if (!node) {
            return;
        }
        
        currSum += node.val;
        path.push(node.val);
        
        if (!node.left && !node.right) {
            if (currSum === target) {
                paths.push([...path]);
            }
        }
        
        pathHelper(node.left, currSum, path);
        pathHelper(node.right, currSum, path);
        path.pop();
    }
    
    pathHelper(root, 0, []);
    return paths;
};
```
