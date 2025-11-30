---
title: "Decode String"
difficulty: "Medium"
tags: ["Stack"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def decodeString(self, s: str) -> str:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        string decodeString(string s) {
            # Write your code here
        }
    };
  java: |
    class Solution {
        public String decodeString(String s) {
            # Write your code here
        }
    }
  javascript: |
    /**
     * @param {string} s
     * @return {string}
     */
    var decodeString = function(s) {
        # Write your code here
    };
---

## Problem

Given an encoded string, write a function to return its decoded string that follows a specific encoding rule: `k[encoded_string]`, where the `encoded_string` within the brackets is repeated exactly `k` times.

**Note:**
- `k` is always a positive integer.
- The input string is well-formed without any extra spaces.
- Square brackets are properly matched.
- The original data doesn't contain digits other than the ones that specify the number of times to repeat the following `encoded_string`.

## Test Cases

**Example 1:**
- **Input:** `s = "3[a]2[bc]"`
- **Output:** `"aaabcbc"`
- **Explanation:** "a" is repeated 3 times, "bc" is repeated 2 times.

**Example 2:**
- **Input:** `s = "3[a2[c]]"`
- **Output:** `"accaccacc"`
- **Explanation:** Inner "c" is repeated 2 times -> "acc". Then "acc" is repeated 3 times.

**Example 3:**
- **Input:** `s = "2[abc]3[cd]ef"`
- **Output:** `"abcabccdcdcdef"`
- **Explanation:** "abc" repeated 2 times, "cd" repeated 3 times, "ef" is appended.


## Approach

This problem involves nested structures, which makes it a perfect candidate for a **Stack** or **Recursion**.

**Algorithm (Stack):**
1. Use two stacks (or a single stack storing tuples): one for numbers (`counts`) and one for strings (`strings`).
2. Iterate through the string:
   - If digit: Build the current number (`curr_num`).
   - If '[': Push `curr_num` to `counts` and `curr_str` to `strings`. Reset `curr_num` and `curr_str`.
   - If ']': Pop the last string (`prev_str`) and last number (`num`). Update `curr_str = prev_str + curr_str * num`.
   - If character: Append to `curr_str`.
3. Return `curr_str`.

**Time Complexity:** O(maxK * n), where maxK is the maximum repeat count and n is the length of the string.  
**Space Complexity:** O(m), where m is the number of open brackets (depth of nesting).


## Solution

### Python
```python
class Solution:
    def decodeString(self, s: str) -> str:
        counts = []
        strings = []
        curr_num = 0
        curr_str = ""
        
        for char in s:
            if char.isdigit():
                curr_num = curr_num * 10 + int(char)
            elif char == '[':
                counts.append(curr_num)
                strings.append(curr_str)
                curr_num = 0
                curr_str = ""
            elif char == ']':
                string = strings.pop()
                num = counts.pop()
                curr_str = string + curr_str * num
            else:
                curr_str += char
        
        return curr_str
```

### C++
```cpp
class Solution {
public:
    string decodeString(string s) {
        stack<int> counts;
        stack<string> strings;
        string curr_str = "";
        int curr_num = 0;
        
        for (char c : s) {
            if (isdigit(c)) {
                curr_num = curr_num * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(curr_num);
                strings.push(curr_str);
                curr_num = 0;
                curr_str = "";
            } else if (c == ']') {
                string prev_str = strings.top(); strings.pop();
                int num = counts.top(); counts.pop();
                
                for (int i = 0; i < num; i++) {
                    prev_str += curr_str;
                }
                curr_str = prev_str;
            } else {
                curr_str += c;
            }
        }
        
        return curr_str;
    }
};
```

### Java
```java
class Solution {
    public String decodeString(String s) {
        Stack<Integer> counts = new Stack<>();
        Stack<StringBuilder> strings = new Stack<>();
        StringBuilder currStr = new StringBuilder();
        int currNum = 0;
        
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                currNum = currNum * 10 + (c - '0');
            } else if (c == '[') {
                counts.push(currNum);
                strings.push(currStr);
                currNum = 0;
                currStr = new StringBuilder();
            } else if (c == ']') {
                StringBuilder prevStr = strings.pop();
                int num = counts.pop();
                
                for (int i = 0; i < num; i++) {
                    prevStr.append(currStr);
                }
                currStr = prevStr;
            } else {
                currStr.append(c);
            }
        }
        
        return currStr.toString();
    }
}
```

### JavaScript
```javascript
var decodeString = function(s) {
    const counts = [];
    const strings = [];
    let currNum = 0;
    let currStr = "";
    
    for (let char of s) {
        if (!isNaN(char)) {
            currNum = currNum * 10 + parseInt(char);
        } else if (char === '[') {
            counts.push(currNum);
            strings.push(currStr);
            currNum = 0;
            currStr = "";
        } else if (char === ']') {
            const prevStr = strings.pop();
            const num = counts.pop();
            currStr = prevStr + currStr.repeat(num);
        } else {
            currStr += char;
        }
    }
    
    return currStr;
};
```
