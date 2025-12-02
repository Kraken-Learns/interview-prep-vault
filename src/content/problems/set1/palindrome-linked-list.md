---
title: "Palindrome Linked List"
difficulty: "Easy"
tags: ["Linked List", "Two Pointers"]
date: "2025-12-02"
source: "LeetCode"
starterCode:
  python: |
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    class Solution:
        def isPalindrome(self, head: Optional[ListNode]) -> bool:
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
        bool isPalindrome(ListNode* head) {
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
        public boolean isPalindrome(ListNode head) {
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
     * @return {boolean}
     */
    var isPalindrome = function(head) {
        // Write your code here
    };
---

## Problem

Given a reference of type `ListNode` which is the head of a singly linked list, write a function to determine if the linked list is a palindrome.

A linked list is a palindrome if the values of the nodes are the same when read from left-to-right and right-to-left. An empty list is considered a palindrome.

## Test Cases

**Example 1:**
- **Input:** `head = [1,2,2,1]` (1 -> 2 -> 2 -> 1)
- **Output:** `true`
- **Explanation:** 
  - Left-to-right: 1 -> 2 -> 2 -> 1
  - Right-to-left: 1 -> 2 -> 2 -> 1

**Example 2:**
- **Input:** `head = [1,2]` (1 -> 2)
- **Output:** `false`
- **Explanation:** 
  - Left-to-right: 1 -> 2
  - Right-to-left: 2 -> 1

## Approach

To check if a singly linked list is a palindrome in O(n) time and O(1) space, we can use the **Reverse Second Half** approach.

**Algorithm:**
1. **Find the Middle:** Use the "slow and fast pointers" technique to find the middle of the linked list.
   - `slow` moves one step, `fast` moves two steps.
   - When `fast` reaches the end, `slow` will be at the middle.
2. **Reverse the Second Half:** Reverse the second half of the linked list starting from the `slow` pointer.
3. **Compare:** Compare the first half and the reversed second half node by node.
   - If any node values don't match, it's not a palindrome.
4. **Restore (Optional):** Ideally, we should restore the list to its original state by reversing the second half again, though not strictly required for the answer.
5. **Return Result:** If all nodes match, return `True`.

**Time Complexity:** O(n) - We traverse the list a few times (find middle, reverse, compare).
**Space Complexity:** O(1) - We only use a few pointers; the list is modified in-place.

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
        if not head or not head.next:
            return head

        prev = None
        curr = head

        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        return prev

    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True

        # find the mid
        fast, slow = head, head
        prev = None
        while fast and fast.next:
            fast = fast.next.next
            prev = slow
            slow = slow.next
        
        # figure out the halves
        first = head
        second = None
        # If fast is not None, the list has odd number of elements
        # slow is exactly at the middle, so we move it to next for the second half
        # Actually, standard way:
        # 1->2->3->2->1. fast at 1 (end), slow at 3.
        # 1->2->2->1. fast at None, slow at 2 (second 2).
        
        # User's logic:
        if fast: # odd length
            # prev is node before slow.
            # But wait, if head=[1], fast=[1], slow=[1], prev=None.
            # fast.next is None. Loop doesn't run.
            # if fast: prev is None. Error if prev.next.
            # Let's adjust to be robust or stick to user's logic if correct.
            # User's logic seems slightly complex with 'prev'.
            # Let's use a standard clean implementation that mirrors the logic.
            pass
        
        # Let's stick to a clean standard implementation of the same algorithm
        # to ensure correctness while respecting the user's O(1) space preference.
        
        fast = head
        slow = head
        
        # Find middle (slow will be at start of second half)
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            
        # Reverse second half
        prev = None
        curr = slow
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        
        # Compare
        left = head
        right = prev # head of reversed second half
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next
            
        return True
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
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        
        ListNode *slow = head;
        ListNode *fast = head;
        
        // Find middle
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // Reverse second half
        ListNode *prev = nullptr;
        ListNode *curr = slow;
        while (curr) {
            ListNode *nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        
        // Compare
        ListNode *left = head;
        ListNode *right = prev;
        while (right) {
            if (left->val != right->val) return false;
            left = left->next;
            right = right->next;
        }
        
        return true;
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
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        
        ListNode slow = head;
        ListNode fast = head;
        
        // Find middle
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse second half
        ListNode prev = null;
        ListNode curr = slow;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        
        // Compare
        ListNode left = head;
        ListNode right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }
        
        return true;
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
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head || !head.next) return true;
    
    let slow = head;
    let fast = head;
    
    // Find middle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null;
    let curr = slow;
    while (curr) {
        let nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }
    
    // Compare
    let left = head;
    let right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    
    return true;
};
```
