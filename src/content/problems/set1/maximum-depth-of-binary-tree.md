---
title: "Maximum Depth of a Binary Tree"
difficulty: "Easy"
tags: ["Tree", "DFS"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    # class TreeNode:
    #     def __init__(self, val: int, left: 'TreeNode' = None, right: 'TreeNode' = None):
    #         self.val = val
    #         self.left = left
    #         self.right = right

    def maxDepth(root: TreeNode) -> int:
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
        int maxDepth(TreeNode* root) {
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
        public int maxDepth(TreeNode root) {
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
     * @return {number}
     */
    var maxDepth = function(root) {
        // Write your code here
    };
---

## Problem
Given the root of a binary tree, write a recursive function to find its maximum depth, where maximum depth is defined as the number of nodes along the longest path from the root node down to a leaf node.

## Test Cases

**Example 1:**
- **Input:** `[4, 2, 7, 1, null, 6, 9, null, 8, null, null, null, null, null, null]`
- **Output:** `4`
- **Explanation:** The 4 nodes along the longest path are **4 → 2 → 1 → 8**

**Visual representation:**
```
           4           (depth 1)
         /   \
        2     7        (depth 2)
       /     / \
      1     6   9      (depth 3)
       \
        8              (depth 4)
```

The longest path from root to leaf is: 4 → 2 → 1 → 8, which has 4 nodes.


## Approach

This is a classic recursive problem that demonstrates the power of **divide and conquer**:

**Base Case:**
- If the tree is empty (`root` is null), the depth is 0.

**Recursive Case:**
1. Recursively find the maximum depth of the left subtree.
2. Recursively find the maximum depth of the right subtree.
3. The maximum depth of the current tree is `1 + max(left_depth, right_depth)`.
   - The `1` accounts for the current node.
   - We take the maximum because we want the longest path.

**Why this works:**
- Each node contributes 1 to the depth.
- The depth is determined by whichever subtree (left or right) goes deeper.
- The recursion naturally explores all paths and returns the deepest one.

**Time Complexity:** O(n) where n is the number of nodes - we visit each node once.
**Space Complexity:** O(h) where h is the height of the tree - this is the recursion stack space.


## Solutions

### Python
```python
# class TreeNode:
#     def __init__(self, val: int, left: 'TreeNode' = None, right: 'TreeNode' = None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxDepth(self, root: TreeNode):
        if not root:
            return 0

        left = self.maxDepth(root.left)
        right = self.maxDepth(root.right)
        return 1 + max(left, right)
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
public:
    int maxDepth(TreeNode* root) {
        if (!root) {
            return 0;
        }
        
        int left = maxDepth(root->left);
        int right = maxDepth(root->right);
        return 1 + max(left, right);
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
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return 1 + Math.max(left, right);
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
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
    
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return 1 + Math.max(left, right);
};
```
