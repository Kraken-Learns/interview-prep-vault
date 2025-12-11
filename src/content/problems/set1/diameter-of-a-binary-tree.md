---
title: "Diameter of a Binary Tree"
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

    def maxDiameter(root: TreeNode) -> int:
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
        int maxDiameter(TreeNode* root) {
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
        public int maxDiameter(TreeNode root) {
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
    var maxDiameter = function(root) {
        // Write your code here
    };
---

## Problem
Given the root of a binary tree, write a recursive function to find the diameter of the tree. The **diameter** of a binary tree is the length of the longest path (number of edges) between any two nodes in a tree. This path may or may not pass through the root.

## Test Cases

**Example 1:**
- **Input:** `[3, 9, 2, 1, 4, null, null, null, 5]`
- **Output:** `4`
- **Explanation:** The longest path is **5 → 1 → 9 → 3 → 2** for a total of 4 edges.

**Visual representation:**
```
           3
         /   \
        9     2
       / \
      1   4
       \
        5

Longest path: 5 → 1 → 9 → 3 → 2
Number of edges: 4

Path breakdown:
• Height of left subtree of node 3: 3 (path: 9 → 1 → 5)
• Height of right subtree of node 3: 1 (path: 2)
• Diameter at node 3: 3 + 1 = 4 edges
```

**Example 2:**
- **Input:** `[3, 9, null, 1, 4, null, null, 2, null, 3]`
- **Output:** `4`
- **Explanation:** The longest path is **2 → 1 → 9 → 4 → 3** for a total of 4 edges.

**Visual representation:**
```
           3
          /
         9
        / \
       1   4
      /     \
     2       3

Longest path: 2 → 1 → 9 → 4 → 3
Number of edges: 4

Path breakdown:
• At node 9:
  - Height of left subtree: 2 (path: 1 → 2)
  - Height of right subtree: 2 (path: 4 → 3)
  - Diameter at node 9: 2 + 2 = 4 edges ✓
```


## Approach

This problem is similar to "Calculate Tilt" - we need to compute two things:
1. The **height** of each subtree (to pass up to parent nodes)
2. The **diameter** at each node (to track the maximum)

**Key Insight:** The diameter passing through a node equals the sum of the heights of its left and right subtrees.

**Strategy:**

1. Use a helper function that recursively computes the height of each subtree.

2. At each node:
   - Recursively calculate the left subtree height
   - Recursively calculate the right subtree height
   - Calculate the diameter passing through this node: `left_height + right_height`
   - Update the maximum diameter if this is larger
   - Return `1 + max(left_height, right_height)` as the height of this subtree

3. Use a nonlocal/global variable to track the maximum diameter across all nodes.

**Why this works:**
- The diameter at any node is the longest path through that node
- That path goes down the left subtree and down the right subtree
- The number of edges equals the sum of the heights
- We check all nodes, so we find the global maximum

**Important:** The problem asks for the number of edges, not nodes. Height is measured in nodes, but diameter is measured in edges.

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
    def maxDiameter(self, root: TreeNode):
        max_diameter = 0

        def heightHelper(node: TreeNode) -> int:
            nonlocal max_diameter
            if not node:
                return 0

            left_height = heightHelper(node.left)
            right_height = heightHelper(node.right)
            curr_diameter = left_height + right_height

            max_diameter = max(max_diameter, curr_diameter)
            return 1 + max(left_height, right_height)

        heightHelper(root)
        return max_diameter
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
    int maxDiameter = 0;
    
    int heightHelper(TreeNode* node) {
        if (!node) {
            return 0;
        }
        
        int leftHeight = heightHelper(node->left);
        int rightHeight = heightHelper(node->right);
        int currDiameter = leftHeight + rightHeight;
        
        maxDiameter = max(maxDiameter, currDiameter);
        return 1 + max(leftHeight, rightHeight);
    }
    
public:
    int maxDiameter(TreeNode* root) {
        maxDiameter = 0;
        heightHelper(root);
        return maxDiameter;
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
    private int maxDiameter = 0;
    
    private int heightHelper(TreeNode node) {
        if (node == null) {
            return 0;
        }
        
        int leftHeight = heightHelper(node.left);
        int rightHeight = heightHelper(node.right);
        int currDiameter = leftHeight + rightHeight;
        
        maxDiameter = Math.max(maxDiameter, currDiameter);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    public int maxDiameter(TreeNode root) {
        maxDiameter = 0;
        heightHelper(root);
        return maxDiameter;
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
var maxDiameter = function(root) {
    let maxDiameter = 0;
    
    function heightHelper(node) {
        if (!node) {
            return 0;
        }
        
        const leftHeight = heightHelper(node.left);
        const rightHeight = heightHelper(node.right);
        const currDiameter = leftHeight + rightHeight;
        
        maxDiameter = Math.max(maxDiameter, currDiameter);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    heightHelper(root);
    return maxDiameter;
};
```
