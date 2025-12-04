---
title: "Swap Nodes in Pairs"
difficulty: "Medium"
tags: ["Linked List"]
date: "2025-12-04"
source: "LeetCode"
starterCode:
  python: |
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
            # Write your code here
            pass
  cpp: |
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode() : val(0), next(nullptr) {}
     *     ListNode(int x) : val(x), next(nullptr) {}
     *     ListNode(int x, ListNode *next) : val(x), next(next) {}
     * };
     */
    class Solution {
    public:
        ListNode* swapPairs(ListNode* head) {
            // Write your code here
        }
    };
  java: |
    /**
     * Definition for singly-linked list.
     * public class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode() {}
     *     ListNode(int val) { this.val = val; }
     *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
     * }
     */
    class Solution {
        public ListNode swapPairs(ListNode head) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * Definition for singly-linked list.
     * function ListNode(val, next) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.next = (next===undefined ? null : next)
     * }
     */
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    var swapPairs = function(head) {
        // Write your code here
    };
---

## Problem

Given a reference `head` of type `ListNode` that is the head of a singly linked list, write a function to swap every two adjacent nodes and return its head.

You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

## Test Cases

**Example 1:**
- **Input:** `head = [1,2,3,4]`
- **Output:** `[2,1,4,3]`
- **Explanation:**
  - Nodes 1 and 2 are swapped.
  - Nodes 3 and 4 are swapped.

**Example 2:**
- **Input:** `head = []`
- **Output:** `[]`

**Example 3:**
- **Input:** `head = [1]`
- **Output:** `[1]`

## Approach

This problem can be solved either iteratively or recursively. The core idea is to change the `next` pointers of the nodes.

**Recursive Algorithm:**
1.  **Base Case:** If the list has fewer than two nodes (i.e., `head` is `None` or `head.next` is `None`), return `head` as no swap is needed.
2.  **Recursive Step:**
    -   Identify the first node (`head`) and the second node (`head.next`).
    -   The new head of the swapped pair will be the `second` node.
    -   Recursively call the function for the rest of the list (starting from `second.next`).
    -   Point `first.next` to the result of the recursive call.
    -   Point `second.next` to `first`.
    -   Return `second`.

**Time Complexity:** O(N) - We visit each node once.
**Space Complexity:** O(N) - Stack space for recursion. (Iterative solution would be O(1)).

## Solution

### Python
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        first = head
        second = head.next

        # Recursively swap the rest of the list
        first.next = self.swapPairs(second.next)
        second.next = first
        
        return second
```

### C++
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }
        
        ListNode* first = head;
        ListNode* second = head->next;
        
        first->next = swapPairs(second->next);
        second->next = first;
        
        return second;
    }
};
```

### Java
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        
        ListNode first = head;
        ListNode second = head.next;
        
        first.next = swapPairs(second.next);
        second.next = first;
        
        return second;
    }
}
```

### JavaScript
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (!head || !head.next) {
        return head;
    }
    
    let first = head;
    let second = head.next;
    
    first.next = swapPairs(second.next);
    second.next = first;
    
    return second;
};
```
