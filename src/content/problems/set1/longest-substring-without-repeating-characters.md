---
title: "Longest Substring Without Repeating Characters"
difficulty: "Medium"
tags: ["Sliding Window"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def longestSubstringWithoutRepeat(self, s: str) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int longestSubstringWithoutRepeat(string s) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int longestSubstringWithoutRepeat(String s) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {string} s
     * @return {number}
     */
    var longestSubstringWithoutRepeat = function(s) {
        // Write your code here
    };
---

## Problem
Write a function to return the length of the longest substring in a provided string `s` where all characters in the substring are distinct.

## Test Cases

**Example 1:**
- **Input:** `s = "eghghhgg"`
- **Output:** `3`
- **Explanation:** The longest substring without repeating characters is "egh" with length of 3.

**Example 2:**
- **Input:** `s = "substring"`
- **Output:** `8`
- **Explanation:** The answer is "ubstring" with length of 8.


## Approach

We use the **sliding window** technique with a hash table to track the most recent position of each character.

**At each step:**

- We expand the window by moving the **right** pointer.

- If the current character has been seen before and is within the current window, we move the **left** pointer to skip past the previous occurrence.

- We update the character's position in the hash table.

- We calculate the maximum window size seen so far.

The window automatically maintains all distinct characters between `left` and `right`.

**Time Complexity:** O(n)  
**Space Complexity:** O(min(m, n)) where m is the charset size


## Solutions

### Python
```python
class Solution:
    def longestSubstringWithoutRepeat(self, s: str) -> int:
        chars = {}
        left = 0
        ans = 0

        for right, char in enumerate(s):
            if char in chars and chars[char] >= left:
                left = chars[char] + 1

            chars[char] = right
            ans = max(ans, right - left + 1) 

        return ans
```

### C++
```cpp
class Solution {
public:
    int longestSubstringWithoutRepeat(string s) {
        unordered_map<char, int> chars;
        int left = 0, ans = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            if (chars.count(c) && chars[c] >= left) {
                left = chars[c] + 1;
            }
            chars[c] = right;
            ans = max(ans, right - left + 1);
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int longestSubstringWithoutRepeat(String s) {
        Map<Character, Integer> chars = new HashMap<>();
        int left = 0, ans = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (chars.containsKey(c) && chars.get(c) >= left) {
                left = chars.get(c) + 1;
            }
            chars.put(c, right);
            ans = Math.max(ans, right - left + 1);
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var longestSubstringWithoutRepeat = function(s) {
    const chars = {};
    let left = 0, ans = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (chars[char] !== undefined && chars[char] >= left) {
            left = chars[char] + 1;
        }
        chars[char] = right;
        ans = Math.max(ans, right - left + 1);
    }
    
    return ans;
};
```
