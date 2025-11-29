---
title: "Max Points You Can Obtain From Cards"
difficulty: "Medium"
tags: ["Sliding Window", "Array"]
date: "2025-11-29"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def maxScore(self, cards: List[int], k: int) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int maxScore(vector<int>& cards, int k) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int maxScore(int[] cards, int k) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} cards
     * @param {number} k
     * @return {number}
     */
    var maxScore = function(cards, k) {
        // Write your code here
    };
---

## Problem

Given an array of integers representing the value of cards, write a function to calculate the **maximum score** you can achieve by selecting exactly `k` cards from either the **beginning** or the **end** of the array.

For example, if `k = 3`, then you have the option to select:
- the first three cards
- the last three cards
- the first card and the last two cards
- the first two cards and the last card

## Test Cases

**Example 1:**
- **Input:** `cards = [2, 11, 4, 5, 3, 9, 2]`, `k = 3`
- **Output:** `17`
- **Explanation:**
  - Selecting the first three cards from the beginning (2 + 11 + 4) gives a total of 17
  - Selecting the last three cards (3 + 9 + 2) gives a total of 14
  - Selecting the first card and the last two cards (2 + 9 + 2) gives a total of 13
  - Selecting the first two cards and the last card (2 + 11 + 2) gives a total of 15
  - So the maximum score is 17

**Example 2:**
- **Input:** `cards = [1, 2, 3, 4, 5, 6, 1]`, `k = 3`
- **Output:** `12`
- **Explanation:** Selecting the first two cards and the last card (1 + 2 + 6) or the last three cards (5 + 6 + 1) both give a total of 12.

**Example 3:**
- **Input:** `cards = [9, 7, 7, 9, 7, 7, 9]`, `k = 7`
- **Output:** `55`
- **Explanation:** Select all cards for a total of 55.


## Approach

This problem uses a **sliding window** technique with a clever observation: we can start by selecting all `k` cards from the left, then gradually replace cards from the left with cards from the right.

**Key Insight:**
- Start with the sum of the first `k` cards (all from the left)
- Then try replacing 1, 2, ..., k cards from the left with cards from the right
- Track the maximum sum encountered

**Algorithm:**
1. Calculate the sum of the first `k` cards (initial window from the left)
2. Set this as the current maximum
3. For each position `i` from 1 to `k`:
   - Add the `i`-th card from the right end
   - Remove the `i`-th card from the left of our initial block
   - Update the maximum if the new sum is greater
4. Return the maximum sum found

**Time Complexity:** O(k) - We iterate through k positions  
**Space Complexity:** O(1) - Only using a few variables


## Solution

### Python
```python
from typing import List

class Solution:
    def maxScore(self, cards: List[int], k: int) -> int:
        n = len(cards)
        if k == 0:
            return 0
        if k > n:
            raise ValueError("k must be less than array length")
        
        # Start with sum of first k cards (all from left)
        curr_sum = sum(cards[:k])
        ans = curr_sum
        
        # Replace i cards from left with i cards from right
        for i in range(1, k + 1):
            curr_sum += cards[-i]      # Add one more from right
            curr_sum -= cards[k - i]   # Remove corresponding card from left
            if curr_sum > ans:
                ans = curr_sum
        
        return ans
```

### C++
```cpp
class Solution {
public:
    int maxScore(vector<int>& cards, int k) {
        int n = cards.size();
        if (k == 0) return 0;
        if (k > n) throw invalid_argument("k must be less than array length");
        
        // Start with sum of first k cards (all from left)
        int curr_sum = 0;
        for (int i = 0; i < k; i++) {
            curr_sum += cards[i];
        }
        int ans = curr_sum;
        
        // Replace i cards from left with i cards from right
        for (int i = 1; i <= k; i++) {
            curr_sum += cards[n - i];      // Add one more from right
            curr_sum -= cards[k - i];      // Remove corresponding card from left
            ans = max(ans, curr_sum);
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int maxScore(int[] cards, int k) {
        int n = cards.length;
        if (k == 0) return 0;
        if (k > n) throw new IllegalArgumentException("k must be less than array length");
        
        // Start with sum of first k cards (all from left)
        int currSum = 0;
        for (int i = 0; i < k; i++) {
            currSum += cards[i];
        }
        int ans = currSum;
        
        // Replace i cards from left with i cards from right
        for (int i = 1; i <= k; i++) {
            currSum += cards[n - i];      // Add one more from right
            currSum -= cards[k - i];      // Remove corresponding card from left
            ans = Math.max(ans, currSum);
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var maxScore = function(cards, k) {
    const n = cards.length;
    if (k === 0) return 0;
    if (k > n) throw new Error("k must be less than array length");
    
    // Start with sum of first k cards (all from left)
    let currSum = 0;
    for (let i = 0; i < k; i++) {
        currSum += cards[i];
    }
    let ans = currSum;
    
    // Replace i cards from left with i cards from right
    for (let i = 1; i <= k; i++) {
        currSum += cards[n - i];      // Add one more from right
        currSum -= cards[k - i];      // Remove corresponding card from left
        ans = Math.max(ans, currSum);
    }
    
    return ans;
};
```
