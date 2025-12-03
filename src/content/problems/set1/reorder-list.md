---
title: "Reorder List"
difficulty: "Medium"
tags: ["Linked List", "Two Pointers"]
date: "2025-12-03"
source: "LeetCode"
starterCode:
  python: |
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def reorderList(self, head: Optional[ListNode]) -> None:
            """
            Do not return anything, modify head in-place instead.
            """
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
        void reorderList(ListNode* head) {
            
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
        public void reorderList(ListNode head) {
            
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
     * @return {void} Do not return anything, modify head in-place instead.
     */
    var reorderList = function(head) {
        
    };
---

## Problem

Given a reference `head` of type `ListNode` that is the head of a singly linked list, reorder the list in-place such that the nodes are reordered to form the following pattern:

`L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

## Test Cases

**Example 1:**
- **Input:** `head = [1,2,3,4]`
- **Output:** `[1,4,2,3]`

**Example 2:**
- **Input:** `head = [1,2,3,4,5]`
- **Output:** `[1,5,2,4,3]`

## Approach

The problem can be broken down into three main steps:

1.  **Find the Middle:** Use the slow and fast pointer technique to find the middle of the linked list.
2.  **Reverse the Second Half:** Reverse the second half of the list starting from the middle.
3.  **Merge:** Merge the first half and the reversed second half by alternating nodes.

**Algorithm:**
1.  Initialize `slow` and `fast` pointers at `head`. Move `slow` one step and `fast` two steps until `fast` reaches the end. `slow` will be at the middle.
2.  Split the list into two halves. The first half ends at `slow` (set `slow.next = None`). The second half starts from the node that was after `slow`.
3.  Reverse the second half of the list.
4.  Merge the two lists:
    -   Take one node from the first half.
    -   Take one node from the second half.
    -   Repeat until the second half is exhausted.

**Time Complexity:** O(N) - We traverse the list a few times (find middle, reverse, merge), all linear operations.
**Space Complexity:** O(1) - We modify the list in-place without using extra space for data structures.

## Solution

### Python
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverse(self, head: ListNode):
        if not head:
            return head

        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        return prev

    def reorderList(self, head: Optional[ListNode]) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        if not head:
            return

        # find mid and split
        mid, fast = head, head
        while fast and fast.next:
            fast = fast.next.next
            mid = mid.next

        first = head
        second = mid.next
        mid.next = None

        # reverse second list
        second = self.reverse(second)

        # intertwine lists
        # new_head = first # Not needed as we modify in place
        while second:
            first_next = first.next
            second_next = second.next
            first.next = second
            second.next = first_next
            first = first_next
            second = second_next
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
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;

        // 1. Find middle
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // 2. Reverse second half
        ListNode* prev = nullptr;
        ListNode* curr = slow->next;
        slow->next = nullptr; // Break the link
        
        while (curr) {
            ListNode* nextTemp = curr->next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        // 3. Merge
        ListNode* first = head;
        ListNode* second = prev;
        
        while (second) {
            ListNode* temp1 = first->next;
            ListNode* temp2 = second->next;
            
            first->next = second;
            second->next = temp1;
            
            first = temp1;
            second = temp2;
        }
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
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;

        // 1. Find middle
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Reverse second half
        ListNode prev = null;
        ListNode curr = slow.next;
        slow.next = null; // Break link
        
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }

        // 3. Merge
        ListNode first = head;
        ListNode second = prev;
        while (second != null) {
            ListNode temp1 = first.next;
            ListNode temp2 = second.next;
            
            first.next = second;
            second.next = temp1;
            
            first = temp1;
            second = temp2;
        }
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if (!head || !head.next) return;

    // 1. Find middle
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. Reverse second half
    let prev = null;
    let curr = slow.next;
    slow.next = null;
    
    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    // 3. Merge
    let first = head;
    let second = prev;
    while (second) {
        let temp1 = first.next;
        let temp2 = second.next;
        
        first.next = second;
        second.next = temp1;
        
        first = temp1;
        second = temp2;
    }
};
```
