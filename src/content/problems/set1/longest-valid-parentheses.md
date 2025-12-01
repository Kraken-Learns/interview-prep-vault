---
title: "Longest Valid Parentheses"
difficulty: "Hard"
tags: ["Stack"]
date: "2025-12-01"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def longest_valid_parentheses(self, s: str) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int longestValidParentheses(string s) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int longestValidParentheses(String s) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {string} s
     * @return {number}
     */
    var longestValidParentheses = function(s) {
        // Write your code here
    };
---

## Problem

Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

A well-formed parentheses string is one that follows these rules:
1. Open brackets must be closed by a matching pair in the correct order.

For example, given the string "(()", the longest valid parentheses substring is "()", which has a length of 2. Another example is the string ")()())", where the longest valid parentheses substring is "()()", which has a length of 4.

## Test Cases

**Example 1:**
- **Input:** `s = "())))"`
- **Output:** `2`
- **Explanation:** The longest valid parentheses substring is "()".

**Example 2:**
- **Input:** `s = "((()()())"`
- **Output:** `8`
- **Explanation:** The longest valid parentheses substring is "(()()())" with a length of 8.

**Example 3:**
- **Input:** `s = ""`
- **Output:** `0`


## Approach

A common and efficient approach is to use a **Stack**.

**Algorithm:**
1. Initialize a stack with `-1` (this acts as a base index for valid substrings starting from the beginning).
2. Iterate through the string by index `i`:
   - If `s[i]` is `'('`, push the index `i` onto the stack.
   - If `s[i]` is `')'`:
     - Pop from the stack.
     - If the stack becomes empty, push the current index `i` (this becomes the new base for the next valid substring).
     - If the stack is not empty, calculate the length of the valid substring ending at `i` as `i - stack.top()`. Update the maximum length found so far.

**Time Complexity:** O(n) - Single pass through the string.  
**Space Complexity:** O(n) - Stack size can go up to n.


## Solution

### Python
```python
class Solution:
    def longest_valid_parentheses(self, s: str) -> int:
        stack = []
        ans = 0
        for char in s:
            if char == '(':
                stack.append(char)
            else:
                if not stack:
                    continue
                else:
                    top1 = stack.pop()
                    top2 = stack.pop() if stack else None
                    if isinstance(top1, int):
                        if top2 == '(':
                            stack.append(2 + top1)
                        else:
                            stack.append(top2)
                            stack.append(top1)
                            stack.append(char)
                    else:
                        if top1 == '(':
                            stack.append(top2)
                            stack.append(2)
                    
                    num = 0
                    while stack and isinstance(stack[-1], int):
                        num += stack.pop()
                    ans = max(ans, num)
                    stack.append(num)

        return ans
```

### C++
```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int maxLen = 0;
        
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') {
                st.push(i);
            } else {
                st.pop();
                if (st.empty()) {
                    st.push(i);
                } else {
                    maxLen = max(maxLen, i - st.top());
                }
            }
        }
        return maxLen;
    }
};
```

### Java
```java
class Solution {
    public int longestValidParentheses(String s) {
        Stack<Integer> stack = new Stack<>();
        stack.push(-1);
        int maxLen = 0;
        
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                stack.push(i);
            } else {
                stack.pop();
                if (stack.isEmpty()) {
                    stack.push(i);
                } else {
                    maxLen = Math.max(maxLen, i - stack.peek());
                }
            }
        }
        return maxLen;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    const stack = [-1];
    let maxLen = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLen;
};
```
