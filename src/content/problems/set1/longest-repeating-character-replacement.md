---
title: "Longest Repeating Character Replacement"
difficulty: "Medium"
tags: ["Sliding Window", "Two Pointers"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    from collections import defaultdict
    
    class Solution:
        def characterReplacement(self, s: str, k: int) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int characterReplacement(string s, int k) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int characterReplacement(String s, int k) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    var characterReplacement = function(s, k) {
        // Write your code here
    };
---

## Problem

Write a function to find the length of the longest substring containing the same letter in a given string `s`, after performing **at most k operations** in which you can choose any character of the string and change it to any other uppercase English letter.

## Test Cases

**Example 1:**
- **Input:** `s = "BBABCCDD"`, `k = 2`
- **Output:** `5`
- **Explanation:** Replace the first 'A' and 'C' with 'B' to form "BBBBBCDD". The longest substring with identical letters is "BBBBB", which has a length of 5.

**Example 2:**
- **Input:** `s = "AABABBA"`, `k = 1`
- **Output:** `4`
- **Explanation:** Replace one 'A' in the middle to get "AABBBBA". The substring "BBBB" has length 4.

**Example 3:**
- **Input:** `s = "ABAB"`, `k = 2`
- **Output:** `4`
- **Explanation:** Replace both 'A's with 'B's (or vice versa) to get "BBBB" or "AAAA".


## Approach

This problem uses the **sliding window** technique with a frequency counter.

**Key Insight:**
- For any window of size `window_size`, if the most frequent character appears `max_freq` times, we need at most `window_size - max_freq` replacements to make all characters the same.
- If `window_size - max_freq > k`, the window is invalid and we need to shrink it from the left.

**Algorithm:**
1. Use a sliding window with `left` and `right` pointers
2. Track character frequencies in the current window using a hash map
3. Track the maximum frequency of any character in the current window
4. When `(right - left + 1) - max_freq > k`, shrink the window from the left
5. Update the maximum window size at each step

**Time Complexity:** O(n) - Single pass through the string  
**Space Complexity:** O(1) - At most 26 uppercase letters in the frequency map


## Solution

### Python
```python
from collections import defaultdict

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        counts = defaultdict(int)
        left = 0
        max_freq = 0
        ans = 0
        
        for right, char in enumerate(s):
            counts[char] += 1
            max_freq = max(max_freq, counts[char])
            
            # If window is invalid, shrink from left
            if (right - left + 1) - max_freq > k:
                curr = s[left]
                counts[curr] -= 1
                left += 1
            
            ans = max(ans, right - left + 1)
        
        return ans
```

### C++
```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        unordered_map<char, int> counts;
        int left = 0;
        int max_freq = 0;
        int ans = 0;
        
        for (int right = 0; right < s.length(); right++) {
            counts[s[right]]++;
            max_freq = max(max_freq, counts[s[right]]);
            
            // If window is invalid, shrink from left
            if ((right - left + 1) - max_freq > k) {
                counts[s[left]]--;
                left++;
            }
            
            ans = max(ans, right - left + 1);
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int characterReplacement(String s, int k) {
        Map<Character, Integer> counts = new HashMap<>();
        int left = 0;
        int maxFreq = 0;
        int ans = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            counts.put(c, counts.getOrDefault(c, 0) + 1);
            maxFreq = Math.max(maxFreq, counts.get(c));
            
            // If window is invalid, shrink from left
            if ((right - left + 1) - maxFreq > k) {
                char leftChar = s.charAt(left);
                counts.put(leftChar, counts.get(leftChar) - 1);
                left++;
            }
            
            ans = Math.max(ans, right - left + 1);
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var characterReplacement = function(s, k) {
    const counts = new Map();
    let left = 0;
    let maxFreq = 0;
    let ans = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        counts.set(char, (counts.get(char) || 0) + 1);
        maxFreq = Math.max(maxFreq, counts.get(char));
        
        // If window is invalid, shrink from left
        if ((right - left + 1) - maxFreq > k) {
            const leftChar = s[left];
            counts.set(leftChar, counts.get(leftChar) - 1);
            left++;
        }
        
        ans = Math.max(ans, right - left + 1);
    }
    
    return ans;
};
```
