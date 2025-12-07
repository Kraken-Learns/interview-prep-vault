---
title: "Apple Harvest"
difficulty: "Medium"
tags: ["Binary Search"]
date: "2025-12-07"
source: "Koko Eating Bananas"
starterCode:
  python: |
    def minHarvestRate(apples: List[int], h: int) -> int:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        int minHarvestRate(vector<int>& apples, int h) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int minHarvestRate(int[] apples, int h) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} apples
     * @param {number} h
     * @return {number}
     */
    var minHarvestRate = function(apples, h) {
        // Write your code here
    };
---

## Problem
Bobby has an orchard of apple trees, and each tree has a certain number of apples on it.

Bobby wants to collect all the apples by the end of the day by collecting a fixed number of apples per hour. He can only harvest apples from one tree per hour - if he finishes collecting apples from a tree before the hour is up, he must wait until the next hour to move to the next tree.

For example, if there are 3 apples on a tree and Bobby collects 1 apple per hour, it will take him 3 hours to finish collecting the apples on that tree.
If he harvests 2 apples per hour, it will take him 2 hours to finish collecting all the apples on that tree (he waits until the hour is up even though he finishes early).

Write a function to determine the slowest rate of apples Bobby can harvest per hour to finish the job in at most 'h' hours. The input to the function is an array of integers representing the number of apples on each tree and an integer 'h' representing the number of hours Bobby has to finish the job within.

## Test Cases

**Example 1:**
- **Input:** `apples = [3, 6, 7], h = 8`
- **Output:** `3`
- **Explanation:**
  - 1 apple per hour: 3 + 6 + 7 = 16 hours (> 8). NOT VALID.
  - 2 apples per hour: 2 + 3 + 4 = 9 hours (> 8). NOT VALID.
  - 3 apples per hour: 1 + 2 + 3 = 6 hours (<= 8). VALID.
  - 4 apples per hour: 1 + 2 + 2 = 5 hours (<= 8). VALID.
  - 5 apples per hour: 1 + 2 + 2 = 5 hours (<= 8). VALID.
  Therefore, the minimum number of apples Bobby must harvest per hour is 3.

**Example 2:**
- **Input:** `apples = [25, 9, 23, 8, 3], h = 5`
- **Output:** `25`
- **Explanation:** Bobby must harvest 25 apples per hour to finish in 5 hours or less.

## Approach

This problem asks for the *minimum* rate `k` such that Bobby can harvest all apples within `h` hours.
The possible rates range from 1 (slowest possible) to `max(apples)` (taking 1 hour per tree).
Since having a higher rate always reduces or keeps the time required the same, the relationship between "rate" and "time taken" is monotonic (non-increasing). This allows us to use **Binary Search**.

We binary search for the minimum `k` in the range `[1, max(apples)]`.
For a given `mid` (current rate test):
- Calculate the total hours needed. For each tree with `a` apples, time needed is `ceil(a / mid)`.
- If total hours <= `h`, it's possible to finish in time. We record `mid` as a potential answer and try to find a smaller valid rate (`right = mid - 1`).
- If total hours > `h`, this rate is too slow. We need to speed up (`left = mid + 1`).

**Time Complexity:** O(N log M), where N is number of trees and M is max apples (range of binary search).
**Space Complexity:** O(1)

## Solutions

### Python
```python
import math
from typing import List

def minHarvestRate(apples: List[int], h: int) -> int:
    def isValid(rate):
        hours = 0
        for apple in apples:
            hours += math.ceil(apple / rate)
        return hours <= h

    left, right = 1, max(apples)
    ans = right
    
    while left <= right:
        mid = (left + right) // 2
        if isValid(mid):
            ans = min(ans, mid)
            right = mid - 1
        else:
            left = mid + 1

    return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
public:
    bool isValid(vector<int>& apples, int rate, int h) {
        long long hours = 0;
        for (int apple : apples) {
            // Equivalent to ceil(apple / rate) using integer arithmetic
            hours += (apple + rate - 1) / rate;
        }
        return hours <= h;
    }

    int minHarvestRate(vector<int>& apples, int h) {
        int left = 1;
        int right = *max_element(apples.begin(), apples.end());
        int ans = right;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (isValid(apples, mid, h)) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    private boolean isValid(int[] apples, int rate, int h) {
        long hours = 0;
        for (int apple : apples) {
            // Equivalent to ceil(apple / rate)
            hours += (long)(apple + rate - 1) / rate;
        }
        return hours <= h;
    }

    public int minHarvestRate(int[] apples, int h) {
        int maxVal = 0;
        for (int apple : apples) maxVal = Math.max(maxVal, apple);

        int left = 1;
        int right = maxVal;
        int ans = right;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (isValid(apples, mid, h)) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} apples
 * @param {number} h
 * @return {number}
 */
var minHarvestRate = function(apples, h) {
    const isValid = (rate) => {
        let hours = 0;
        for (const apple of apples) {
            hours += Math.ceil(apple / rate);
        }
        return hours <= h;
    };

    let left = 1;
    let right = Math.max(...apples);
    let ans = right;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (isValid(mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};
```
