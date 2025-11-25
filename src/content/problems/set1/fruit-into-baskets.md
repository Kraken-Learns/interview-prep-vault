---
title: "Fruit Into Baskets"
difficulty: "Medium"
tags: ["Sliding Window"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    class Solution:
        def totalFruit(self, fruits: List[int]) -> int:
            pass
  cpp: |
    class Solution {
    public:
        int totalFruit(vector<int>& fruits) {
            
        }
    };
  java: |
    class Solution {
        public int totalFruit(int[] fruits) {
            
        }
    }
  javascript: |
    /**
     * @param {number[]} fruits
     * @return {number}
     */
    var totalFruit = function(fruits) {
        
    };
---

## Problem
You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the **type** of fruit the `i`th tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

1. You only have **two** baskets, and each basket can only hold a **single type** of fruit. There is no limit on the amount of fruit each basket can hold.
2. Starting from any tree of your choice, you must pick **exactly one fruit** from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
3. Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array `fruits`, return the **maximum** number of fruits you can pick.

## Test Cases

**Example 1:**
- **Input:** `fruits = [1,2,1]`
- **Output:** `3`
- **Explanation:** We can pick from all 3 trees.

**Example 2:**
- **Input:** `fruits = [0,1,2,2]`
- **Output:** `3`
- **Explanation:** We can pick from trees [1,2,2]. If we had started at the first tree, we would only pick [0,1].

**Example 3:**
- **Input:** `fruits = [1,2,3,2,2]`
- **Output:** `4`
- **Explanation:** We can pick from trees [2,3,2,2]. If we had started at the first tree, we would only pick [1,2].

**Example 4:**
- **Input:** `fruits = [3,3,3,1,2,1,1,2,3,3,4]`
- **Output:** `5`
- **Explanation:** We can pick from trees [1,2,1,1,2].

## Approach

This problem can be modeled as finding the **longest contiguous subarray** that contains **at most two distinct types** of fruits. This is a classic **Sliding Window** problem.

We can use a hash map (or frequency array) to keep track of the count of each fruit type in our current window `[left, right]`.

**Algorithm:**
1. Initialize `left` pointer to 0, `ans` to 0, and a hash map `counts`.
2. Iterate `right` from 0 to `n - 1`:
   - Add `fruits[right]` to `counts`.
   - While the number of distinct fruits in `counts` is greater than 2:
     - Decrement the count of `fruits[left]`.
     - If the count becomes 0, remove it from `counts`.
     - Increment `left`.
   - Update `ans` with the maximum window size `right - left + 1`.
3. Return `ans`.

**Time Complexity:** O(n) - Each element is added and removed at most once.
**Space Complexity:** O(1) - The map will contain at most 3 keys.

## Solutions

### Python
```python
from collections import defaultdict
from typing import List

class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        counts = defaultdict(int)
        left = 0
        ans = 0

        for right, fruit in enumerate(fruits):
            counts[fruit] += 1

            while len(counts) > 2:
                left_fruit = fruits[left]
                counts[left_fruit] -= 1
                if counts[left_fruit] == 0:
                    del counts[left_fruit]
                left += 1

            ans = max(ans, right - left + 1)

        return ans
```

### C++
```cpp
class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> counts;
        int left = 0, ans = 0;
        
        for (int right = 0; right < fruits.size(); ++right) {
            counts[fruits[right]]++;
            
            while (counts.size() > 2) {
                counts[fruits[left]]--;
                if (counts[fruits[left]] == 0) {
                    counts.erase(fruits[left]);
                }
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
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> counts = new HashMap<>();
        int left = 0, ans = 0;
        
        for (int right = 0; right < fruits.length; ++right) {
            counts.put(fruits[right], counts.getOrDefault(fruits[right], 0) + 1);
            
            while (counts.size() > 2) {
                counts.put(fruits[left], counts.get(fruits[left]) - 1);
                if (counts.get(fruits[left]) == 0) {
                    counts.remove(fruits[left]);
                }
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
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    const counts = new Map();
    let left = 0, ans = 0;
    
    for (let right = 0; right < fruits.length; ++right) {
        counts.set(fruits[right], (counts.get(fruits[right]) || 0) + 1);
        
        while (counts.size > 2) {
            counts.set(fruits[left], counts.get(fruits[left]) - 1);
            if (counts.get(fruits[left]) === 0) {
                counts.delete(fruits[left]);
            }
            left++;
        }
        
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};
```
