---
title: "Longest Univalue Path"
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

    def longestUnivaluePath(root: TreeNode) -> int:
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
        int longestUnivaluePath(TreeNode* root) {
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
        public int longestUnivaluePath(TreeNode root) {
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
    var longestUnivaluePath = function(root) {
        // Write your code here
    };
---

## Problem
Given the root of the binary tree, find the longest path where all nodes along the path have the same value. This path doesn't have to include the root node. Return the number of edges on that path, not the number of nodes.

## Test Cases

**Example 1:**
- **Input:** `[1,4,5,4,4,5]`
- **Output:** `2`
- **Explanation:** The longest path of the same value is **[4,4,4]**, which has a total of 2 edges.

**Visual representation:**
```
           1
         /   \
        4     5
       / \     \
      4   4     5

Longest univalue path: 4 → 4 → 4
Number of edges: 2

Path breakdown:
• At node 4 (root's left child):
  - Left child 4 matches parent 4 ✓
  - Right child 4 matches parent 4 ✓
  - Path length at this node: 1 + 1 = 2 edges
```

**Example 2:**
- **Input:** `[1,1,1,1,1,1,1]`
- **Output:** `4`
- **Explanation:** The longest path of the same value is **[1,1,1,1,1]**, which has a length of 4 edges.

**Visual representation:**
```
           1
         /   \
        1     1
       / \   / \
      1   1 1   1

Longest univalue path: 1 → 1 → 1 → 1 → 1
Number of edges: 4

This is a perfect binary tree where all values are 1.
Any path through the root gives us 4 edges.
For example: left-left child → left child → root → right child → right-right child
```


## Approach

This problem is similar to "Diameter of a Binary Tree" but with an additional constraint: all nodes in the path must have the same value.

**Strategy:**

1. Use a helper function that recursively computes the longest univalue path starting from each node going down (one direction).

2. At each node:
   - Recursively calculate the longest univalue path from the left child
   - Recursively calculate the longest univalue path from the right child
   - **Check if children match the current node's value:**
     - If left child exists and equals current value: `left_len = 1 + left`
     - If right child exists and equals current value: `right_len = 1 + right`
     - Otherwise: `left_len = 0` or `right_len = 0`
   - Calculate the path passing through this node: `left_len + right_len`
   - Update the maximum path length
   - Return the longer single-direction path: `max(left_len, right_len)`

3. Use a nonlocal/global variable to track the maximum path length across all nodes.

**Key Differences from Diameter:**
- We only extend the path if the child's value matches the parent's value
- We reset the path length to 0 when values don't match
- We still need to check both directions (left and right) at each node

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
    def longestUnivaluePath(self, root: TreeNode):
        path_len = 0
        def depthHelper(node: TreeNode):
            nonlocal path_len
            if not node:
                return 0
            
            left = depthHelper(node.left)
            right = depthHelper(node.right)
            left_len, right_len = 0, 0
            if node.left and node.left.val == node.val:
                left_len = 1 + left
            if node.right and node.right.val == node.val:
                right_len = 1 + right

            path_len = max(path_len, left_len + right_len)

            return max(left_len, right_len)

        depthHelper(root)
        return path_len
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
    int pathLen = 0;
    
    int depthHelper(TreeNode* node) {
        if (!node) {
            return 0;
        }
        
        int left = depthHelper(node->left);
        int right = depthHelper(node->right);
        int leftLen = 0, rightLen = 0;
        
        if (node->left && node->left->val == node->val) {
            leftLen = 1 + left;
        }
        if (node->right && node->right->val == node->val) {
            rightLen = 1 + right;
        }
        
        pathLen = max(pathLen, leftLen + rightLen);
        return max(leftLen, rightLen);
    }
    
public:
    int longestUnivaluePath(TreeNode* root) {
        pathLen = 0;
        depthHelper(root);
        return pathLen;
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
    private int pathLen = 0;
    
    private int depthHelper(TreeNode node) {
        if (node == null) {
            return 0;
        }
        
        int left = depthHelper(node.left);
        int right = depthHelper(node.right);
        int leftLen = 0, rightLen = 0;
        
        if (node.left != null && node.left.val == node.val) {
            leftLen = 1 + left;
        }
        if (node.right != null && node.right.val == node.val) {
            rightLen = 1 + right;
        }
        
        pathLen = Math.max(pathLen, leftLen + rightLen);
        return Math.max(leftLen, rightLen);
    }
    
    public int longestUnivaluePath(TreeNode root) {
        pathLen = 0;
        depthHelper(root);
        return pathLen;
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
var longestUnivaluePath = function(root) {
    let pathLen = 0;
    
    function depthHelper(node) {
        if (!node) {
            return 0;
        }
        
        const left = depthHelper(node.left);
        const right = depthHelper(node.right);
        let leftLen = 0, rightLen = 0;
        
        if (node.left && node.left.val === node.val) {
            leftLen = 1 + left;
        }
        if (node.right && node.right.val === node.val) {
            rightLen = 1 + right;
        }
        
        pathLen = Math.max(pathLen, leftLen + rightLen);
        return Math.max(leftLen, rightLen);
    }
    
    depthHelper(root);
    return pathLen;
};
```
