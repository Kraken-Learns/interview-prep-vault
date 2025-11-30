---
title: "Valid Parentheses"
difficulty: "Easy"
tags: ["Stack"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def isValid(self, s: str) -> bool:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        bool isValid(string s) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public boolean isValid(String s) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {string} s
     * @return {boolean}
     */
    var isValid = function(s) {
        // Write your code here
    };
---

## Problem

Given an input string `s` consisting solely of the characters '(', ')', '{', '}', '[' and ']', determine whether `s` is a valid string.

A string is considered valid if:
1. Every opening bracket is closed by a matching type of bracket.
2. Brackets are closed in the correct order.
3. Every closing bracket has a corresponding opening bracket of the same type.

## Test Cases

**Example 1:**
- **Input:** `s = "(){({})}"`
- **Output:** `True`

**Example 2:**
- **Input:** `s = "(){({}})"`
- **Output:** `False`

**Example 3:**
- **Input:** `s = "()"`
- **Output:** `True`

**Example 4:**
- **Input:** `s = "(]"`
- **Output:** `False`


## Approach

This is a classic problem that can be solved using a **Stack**.

**Algorithm:**
1. Initialize an empty stack.
2. Iterate through each character in the string.
3. If the character is an opening bracket ('(', '{', '['), push it onto the stack.
4. If the character is a closing bracket:
   - Check if the stack is empty. If it is, the string is invalid (no matching opening bracket).
   - Pop the top element from the stack.
   - Check if the popped element matches the current closing bracket. If not, the string is invalid.
5. After iterating through the entire string, check if the stack is empty.
   - If empty, all brackets were matched correctly -> Return `True`.
   - If not empty, there are unmatched opening brackets -> Return `False`.

**Time Complexity:** O(n) - We traverse the string once.  
**Space Complexity:** O(n) - In the worst case, we might push all characters onto the stack (e.g., "(((((").


## Solution

### Python
```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        # We don't strictly need a set for openings if we check keys in pairs
        pairs = {')': '(', ']': '[', '}': '{'}
        
        for char in s:
            if char in pairs:
                # It's a closing bracket
                if not stack or stack[-1] != pairs[char]:
                    return False
                stack.pop()
            else:
                # It's an opening bracket
                stack.append(char)
        
        return not stack
```

### C++
```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {
            {')', '('},
            {']', '['},
            {'}', '{'}
        };
        
        for (char c : s) {
            if (pairs.count(c)) {
                // It's a closing bracket
                if (st.empty() || st.top() != pairs[c]) {
                    return false;
                }
                st.pop();
            } else {
                // It's an opening bracket
                st.push(c);
            }
        }
        
        return st.empty();
    }
};
```

### Java
```java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put(']', '[');
        pairs.put('}', '{');
        
        for (char c : s.toCharArray()) {
            if (pairs.containsKey(c)) {
                // It's a closing bracket
                if (stack.isEmpty() || stack.peek() != pairs.get(c)) {
                    return false;
                }
                stack.pop();
            } else {
                // It's an opening bracket
                stack.push(c);
            }
        }
        
        return stack.isEmpty();
    }
}
```

### JavaScript
```javascript
var isValid = function(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (pairs[char]) {
            // It's a closing bracket
            if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
                return false;
            }
            stack.pop();
        } else {
            // It's an opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
};
```
