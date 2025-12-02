---
title: "Linked List Cycle"
difficulty: "Easy"
tags: ["Linked List", "Two Pointers"]
date: "2025-12-02"
source: "LeetCode"
starterCode:
  python: |
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, x):
    #         self.val = x
    #         self.next = None

    class Solution:
        def hasCycle(self, head: Optional[ListNode]) -> bool:
            # Write your code here
            pass
  cpp: |
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode(int x) : val(x), next(NULL) {}
     * };
     */
    class Solution {
    public:
        bool hasCycle(ListNode *head) {
            // Write your code here
        }
    };
  java: |
    /**
     * Definition for singly-linked list.
     * class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode(int x) {
     *         val = x;
     *         next = null;
     *     }
     * }
     */
    public class Solution {
        public boolean hasCycle(ListNode head) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */

    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    var hasCycle = function(head) {
        // Write your code here
    };
---

## Problem

Write a function that takes in a parameter `head` of type `ListNode` that is a reference to the head of a linked list. The function should return `True` if the linked list contains a cycle, and `False` otherwise, without modifying the linked list in any way.

## Test Cases

**Example 1:**
- **Input:** `head = [3,2,0,-4], pos = 1` (3 -> 2 -> 0 -> -4 -> 2)
- **Output:** `true`
- **Explanation:** There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

**Example 2:**
- **Input:** `head = [1,2], pos = 0` (1 -> 2 -> 1)
- **Output:** `true`
- **Explanation:** There is a cycle in the linked list, where the tail connects to the 0th node.

**Example 3:**
- **Input:** `head = [1], pos = -1`
- **Output:** `false`
- **Explanation:** There is no cycle in the linked list.

## Approach

This problem is a classic application of the **Floyd's Cycle-Finding Algorithm** (also known as the "Tortoise and the Hare" algorithm).

**Algorithm:**
1. Initialize two pointers, `slow` and `fast`, both pointing to the head of the linked list.
2. Traverse the list with the two pointers:
   - Move `slow` one step at a time (`slow = slow.next`).
   - Move `fast` two steps at a time (`fast = fast.next.next`).
3. If there is a cycle, the `fast` pointer will eventually catch up to the `slow` pointer (i.e., `fast == slow`). Return `True`.
4. If the `fast` pointer reaches the end of the list (`fast` or `fast.next` becomes `None`), then there is no cycle. Return `False`.

**Time Complexity:** O(n) - In the worst case, we might traverse the list a couple of times.
**Space Complexity:** O(1) - We only use two pointers.

## Solution

### Python
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head:
            return False

        fast, slow = head, head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                return True

        return False
```

### C++
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head) return false;
        
        ListNode *slow = head;
        ListNode *fast = head;
        
        while (fast != NULL && fast->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        
        return false;
    }
};
```

### Java
```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        
        return false;
    }
}
```

### JavaScript
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (!head) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    
    return false;
};
```
