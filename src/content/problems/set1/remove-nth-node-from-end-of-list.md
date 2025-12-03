---
title: "Remove Nth Node From End of List"
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
        def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
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
        ListNode* removeNthFromEnd(ListNode* head, int n) {
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
        public ListNode removeNthFromEnd(ListNode head, int n) {
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
     * @param {number} n
     * @return {ListNode}
     */
    var removeNthFromEnd = function(head, n) {
        // Write your code here
    };
---

## Problem

Given a reference `head` of type `ListNode` that is the head node of a singly linked list and an integer `n`, write a function that removes the `n`-th node from the end of the list and returns the head of the modified list.

Note: `n` is guaranteed to be between 1 and the length of the list. If `n` is the length of the list, the head of the list should be removed.

## Test Cases

**Example 1:**
- **Input:** `head = [5,4,3,2,1], n = 2`
- **Output:** `[5,4,3,1]`
- **Explanation:** The 2nd node from the end is 2. Removing it yields [5, 4, 3, 1].

**Example 2:**
- **Input:** `head = [5,4,3,2,1], n = 5`
- **Output:** `[4,3,2,1]`
- **Explanation:** The 5th node from the end is 5 (the head). Removing it yields [4, 3, 2, 1].

## Approach

The problem can be solved using the **Two Pointers** technique (specifically, a fast and slow pointer) to do this in a single pass.

**Algorithm:**
1. Create a dummy node that points to the `head`. This simplifies edge cases, such as removing the head itself.
2. Initialize two pointers, `first` and `second`, both pointing to the dummy node.
3. Move the `first` pointer `n + 1` steps ahead. This maintains a gap of `n` nodes between `first` and `second`.
4. Move both `first` and `second` pointers one step at a time until `first` reaches the end of the list (`None` or `null`).
5. At this point, the `second` pointer will be just before the node that needs to be removed.
6. Update `second.next` to skip the target node: `second.next = second.next.next`.
7. Return `dummy.next` as the new head.

**Time Complexity:** O(L) - The algorithm makes one traversal of the list of L nodes.
**Space Complexity:** O(1) - We only use constant extra space.

## Solution

### Python
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # compute number of nodes
        temp = head
        count = 0
        while temp:
            count += 1
            temp = temp.next

        # Note: The problem statement usually guarantees valid n, 
        # but we can keep the check if desired.
        if n <= 0 or n > count:
            # In LeetCode environment this might not be needed
            # but per user solution:
            raise ValueError("Invalid n provided")

        if n == count:
            return head.next

        steps = count - n - 1
        prev = head
        while prev and steps > 0:
            prev = prev.next
            steps -= 1

        nxt = prev.next
        prev.next = nxt.next

        return head
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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* first = dummy;
        ListNode* second = dummy;

        // Advances first pointer so that the gap between first and second is n nodes apart
        for (int i = 1; i <= n + 1; i++) {
            first = first->next;
        }

        // Move first to the end, maintaining the gap
        while (first != nullptr) {
            first = first->next;
            second = second->next;
        }

        ListNode* toDelete = second->next;
        second->next = second->next->next;
        delete toDelete; // Memory management

        ListNode* newHead = dummy->next;
        delete dummy;
        return newHead;
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy;
        ListNode second = dummy;

        // Advances first pointer so that the gap between first and second is n nodes apart
        for (int i = 1; i <= n + 1; i++) {
            first = first.next;
        }

        // Move first to the end, maintaining the gap
        while (first != null) {
            first = first.next;
            second = second.next;
        }

        second.next = second.next.next;
        return dummy.next;
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let first = dummy;
    let second = dummy;

    // Advances first pointer so that the gap between first and second is n nodes apart
    for (let i = 1; i <= n + 1; i++) {
        first = first.next;
    }

    // Move first to the end, maintaining the gap
    while (first !== null) {
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;
    return dummy.next;
};
```
