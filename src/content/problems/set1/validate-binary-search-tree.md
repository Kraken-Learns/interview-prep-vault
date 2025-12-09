---
title: "Validate Binary Search Tree"
difficulty: "Medium"
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

    def validateBST(root: TreeNode) -> bool:
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
        bool validateBST(TreeNode* root) {
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
        public boolean validateBST(TreeNode root) {
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
     * @return {boolean}
     */
    var validateBST = function(root) {
        // Write your code here
    };
---

## Problem
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A tree is a BST if the following conditions are met:
- Every node on the left subtree has a value **less than** the value of the current node.
- Every node on the right subtree has a value **greater than** the value of the current node.
- The left and right subtrees must also be valid BSTs.

## Test Cases

**Example 1:**
- **Input:** `[2,1,4]`
- **Output:** `true`

**Visual representation:**
```
       2
      / \
     1   4

Validation:
• 1 < 2 ✓ (left child less than root)
• 4 > 2 ✓ (right child greater than root)
• Valid BST ✓
```

**Example 2:**
- **Input:** `[4,1,5,null,null,3,6]`
- **Output:** `false`
- **Explanation:** 3 is in the root node's right subtree, but it is less than the root node 4.

**Visual representation:**
```
         4
        / \
       1   5
          / \
         3   6

Validation:
• 1 < 4 ✓ (left child less than root)
• 5 > 4 ✓ (right child greater than root)
• But 3 < 4 ✗ (3 is in right subtree but less than root)
• Invalid BST ✗
```

## Approach

The key insight is that a BST has **range constraints**: each node must fall within a valid range based on its ancestors.

**Strategy:**

1. Use a helper function `dfs(node, min_val, max_val)` that tracks the valid range `(min_val, max_val)` for each node.

2. For the root node, the range is `(-∞, +∞)`.

3. For each node:
   - Check if `min_val < node.val < max_val`
   - Recursively validate the left subtree with range `(min_val, node.val)`
   - Recursively validate the right subtree with range `(node.val, max_val)`

4. Return `true` only if the current node is valid AND both subtrees are valid.

**Why this works:**
- Every node in the left subtree must be less than the current node → update max bound
- Every node in the right subtree must be greater than the current node → update min bound
- These constraints propagate down the tree, ensuring global BST properties

**Common Mistake:** Only checking if `left.val < node.val < right.val` is insufficient because it doesn't account for ancestors. For example, in a right subtree, all nodes must be greater than the original root, not just their immediate parent.

**Time Complexity:** O(n) where n is the number of nodes - we visit each node once.
**Space Complexity:** O(h) where h is the height of the tree - recursion stack space.


## Solutions

### Python
```python
# class TreeNode:
#     def __init__(self, val: int, left: 'TreeNode' = None, right: 'TreeNode' = None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def validateBST(self, root: TreeNode):
        def dfs(node: TreeNode, min_val, max_val):
            if not node:
                return True

            is_valid = min_val < node.val < max_val
            return (is_valid and dfs(node.left, min_val, node.val)
                           and dfs(node.right, node.val, max_val))

        return dfs(root, float("-inf"), float("inf"))
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
    bool dfs(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) {
            return true;
        }
        
        bool isValid = minVal < node->val && node->val < maxVal;
        return isValid && 
               dfs(node->left, minVal, node->val) && 
               dfs(node->right, node->val, maxVal);
    }
    
public:
    bool validateBST(TreeNode* root) {
        return dfs(root, LLONG_MIN, LLONG_MAX);
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
    private boolean dfs(TreeNode node, long minVal, long maxVal) {
        if (node == null) {
            return true;
        }
        
        boolean isValid = minVal < node.val && node.val < maxVal;
        return isValid && 
               dfs(node.left, minVal, node.val) && 
               dfs(node.right, node.val, maxVal);
    }
    
    public boolean validateBST(TreeNode root) {
        return dfs(root, Long.MIN_VALUE, Long.MAX_VALUE);
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
 * @return {boolean}
 */
var validateBST = function(root) {
    function dfs(node, minVal, maxVal) {
        if (!node) {
            return true;
        }
        
        const isValid = minVal < node.val && node.val < maxVal;
        return isValid && 
               dfs(node.left, minVal, node.val) && 
               dfs(node.right, node.val, maxVal);
    }
    
    return dfs(root, -Infinity, Infinity);
};
```
