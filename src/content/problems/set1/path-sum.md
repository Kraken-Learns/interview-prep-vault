---
title: "Path Sum"
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

    def pathSum(root: TreeNode, target: int) -> bool:
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
        bool pathSum(TreeNode* root, int target) {
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
        public boolean pathSum(TreeNode root, int target) {
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
     * @return {boolean}
     */
    var pathSum = function(root, target) {
        // Write your code here
    };
---

## Problem
Given the root of a binary tree and an integer `target`, write a recursive function to determine if the tree has a root-to-leaf path where all the values along that path sum to the `target`.

## Test Cases

**Example 1:**
- **Input:** `[4, 2, 7, 1, 3, 6, 9], target = 17`
- **Output:** `true`
- **Explanation:** The path **4 → 7 → 6** sums to 17.

**Visual representation:**
```
           4
         /   \
        2     7
       / \   / \
      1   3 6   9

Path: 4 → 7 → 6
Sum: 4 + 7 + 6 = 17 ✓
```

**Example 2:**
- **Input:** `[4, 2, 7, 1, 3, 6, 9], target = 13`
- **Output:** `false`
- **Explanation:** No root-to-leaf path sums to 13.

**Visual representation:**
```
           4
         /   \
        2     7
       / \   / \
      1   3 6   9

Possible paths:
• 4 → 2 → 1 = 7
• 4 → 2 → 3 = 9
• 4 → 7 → 6 = 17
• 4 → 7 → 9 = 20

None equal 13 ✗
```


## Approach

This problem uses **recursion with subtraction** to track the remaining sum needed:

**Base Cases:**
1. If the tree is empty (`root` is null), return `false` - no path exists.
2. If we're at a leaf node (no left or right children), check if the node's value equals the remaining target.

**Recursive Case:**
1. Subtract the current node's value from the target to get the `remaining` sum needed.
2. Recursively check if either the left or right subtree has a path that sums to the `remaining` value.
3. Return `true` if either subtree has a valid path.

**Why this works:**
- At each node, we reduce the problem: "Does a path exist with sum = target?" becomes "Does a path exist with sum = target - current_value?"
- We only check at leaf nodes because the problem requires a root-to-leaf path.
- The `or` operation ensures we return `true` if any valid path exists.

**Time Complexity:** O(n) where n is the number of nodes - we visit each node once in the worst case.
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
    def pathSum(self, root: TreeNode, target: int):
        if not root:
            return False

        # leaf node
        if not root.left and not root.right:
            return target == root.val

        remaining = target - root.val
        return (self.pathSum(root.left, remaining) or
                 self.pathSum(root.right, remaining))
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
    bool pathSum(TreeNode* root, int target) {
        if (!root) {
            return false;
        }
        
        // leaf node
        if (!root->left && !root->right) {
            return target == root->val;
        }
        
        int remaining = target - root->val;
        return pathSum(root->left, remaining) || 
               pathSum(root->right, remaining);
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
    public boolean pathSum(TreeNode root, int target) {
        if (root == null) {
            return false;
        }
        
        // leaf node
        if (root.left == null && root.right == null) {
            return target == root.val;
        }
        
        int remaining = target - root.val;
        return pathSum(root.left, remaining) || 
               pathSum(root.right, remaining);
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
 * @return {boolean}
 */
var pathSum = function(root, target) {
    if (!root) {
        return false;
    }
    
    // leaf node
    if (!root.left && !root.right) {
        return target === root.val;
    }
    
    const remaining = target - root.val;
    return pathSum(root.left, remaining) || 
           pathSum(root.right, remaining);
};
```
