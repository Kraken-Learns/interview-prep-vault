---
title: "Calculate Tilt"
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

    def calculateTilt(root: TreeNode) -> int:
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
        int calculateTilt(TreeNode* root) {
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
        public int calculateTilt(TreeNode root) {
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
    var calculateTilt = function(root) {
        // Write your code here
    };
---

## Problem
Given the root node of a binary tree, write a recursive function to return the sum of all node tilts in the tree.

The **tilt** of a node is calculated as the absolute difference between the sum of all values in its left subtree and the sum of all values in its right subtree. For nodes that are missing a left child, right child, or both, treat the missing subtree as having a sum of 0.

For example, a leaf node has a tilt of 0 because both its left and right subtrees are empty (sum = 0), so the absolute difference is |0 - 0| = 0.

## Test Cases

**Example 1:**
- **Input:** `[5, 1, 3]`
- **Output:** `2`

**Visual representation:**
```
       5
      / \
     1   3

Calculations:
• Node 1: tilt = |0 - 0| = 0 (leaf node)
• Node 3: tilt = |0 - 0| = 0 (leaf node)
• Node 5: tilt = |1 - 3| = 2
  - Left subtree sum = 1
  - Right subtree sum = 3

Total tilt = 0 + 0 + 2 = 2
```

**Example 2:**
- **Input:** `[4, 2, 7, 1, 3, 6, 9]`
- **Output:** `21`

**Visual representation:**
```
           4
         /   \
        2     7
       / \   / \
      1   3 6   9

Calculations:
• Node 1: tilt = |0 - 0| = 0 (leaf)
• Node 3: tilt = |0 - 0| = 0 (leaf)
• Node 6: tilt = |0 - 0| = 0 (leaf)
• Node 9: tilt = |0 - 0| = 0 (leaf)

• Node 2: tilt = |1 - 3| = 2
  - Left subtree sum = 1
  - Right subtree sum = 3

• Node 7: tilt = |6 - 9| = 3
  - Left subtree sum = 6
  - Right subtree sum = 9

• Node 4: tilt = |6 - 22| = 16
  - Left subtree sum = 2 + 1 + 3 = 6
  - Right subtree sum = 7 + 6 + 9 = 22

Total tilt = 0 + 0 + 0 + 0 + 2 + 3 + 16 = 21
```


## Approach

This problem requires calculating two things at each node:
1. The **subtree sum** (to pass up to parent nodes)
2. The **tilt** (to accumulate for the final answer)

**Strategy:**

1. Use a helper function that recursively computes the sum of all values in a subtree.

2. At each node:
   - Recursively calculate the left subtree sum
   - Recursively calculate the right subtree sum
   - Calculate the tilt as `abs(left_sum - right_sum)`
   - Add this tilt to a running total
   - Return `left_sum + right_sum + node.val` to the parent

3. Use a nonlocal/global variable to accumulate the total tilt across all nodes.

**Why this works:**
- Each recursive call returns the sum of its subtree, which parent nodes need
- The tilt is calculated as a side effect and accumulated
- This is a classic post-order traversal pattern: process children first, then use their results

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
    def calculateTilt(self, root: TreeNode):
        tilt = 0

        def sumHelper(node: TreeNode) -> int:
            nonlocal tilt
            if not node:
                return 0

            left_sum = sumHelper(node.left)
            right_sum = sumHelper(node.right)
            tilt += abs(left_sum - right_sum)

            return left_sum + right_sum + node.val

        sumHelper(root)
        return tilt
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
    int tilt = 0;
    
    int sumHelper(TreeNode* node) {
        if (!node) {
            return 0;
        }
        
        int leftSum = sumHelper(node->left);
        int rightSum = sumHelper(node->right);
        tilt += abs(leftSum - rightSum);
        
        return leftSum + rightSum + node->val;
    }
    
public:
    int calculateTilt(TreeNode* root) {
        tilt = 0;
        sumHelper(root);
        return tilt;
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
    private int tilt = 0;
    
    private int sumHelper(TreeNode node) {
        if (node == null) {
            return 0;
        }
        
        int leftSum = sumHelper(node.left);
        int rightSum = sumHelper(node.right);
        tilt += Math.abs(leftSum - rightSum);
        
        return leftSum + rightSum + node.val;
    }
    
    public int calculateTilt(TreeNode root) {
        tilt = 0;
        sumHelper(root);
        return tilt;
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
var calculateTilt = function(root) {
    let tilt = 0;
    
    function sumHelper(node) {
        if (!node) {
            return 0;
        }
        
        const leftSum = sumHelper(node.left);
        const rightSum = sumHelper(node.right);
        tilt += Math.abs(leftSum - rightSum);
        
        return leftSum + rightSum + node.val;
    }
    
    sumHelper(root);
    return tilt;
};
```
