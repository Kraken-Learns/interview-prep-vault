---
title: "Maximum Sum of Subarrays of Size K"
difficulty: "Easy"
tags: ["Sliding Window"]
date: "2025-11-29"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    
    class Solution:
        def maxSum(self, nums: List[int], k: int) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        int maxSum(vector<int>& nums, int k) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int maxSum(int[] nums, int k) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    var maxSum = function(nums, k) {
        // Write your code here
    };
---

## Problem

Given an array of integers `nums` and an integer `k`, find the **maximum sum** of any contiguous subarray of size `k`.

## Test Cases

**Example 1:**
- **Input:** `nums = [2, 1, 5, 1, 3, 2]`, `k = 3`
- **Output:** `9`
- **Explanation:** The subarray with the maximum sum is [5, 1, 3] with a sum of 9.

**Example 2:**
- **Input:** `nums = [1, 4, 2, 10, 23, 3, 1, 0, 20]`, `k = 4`
- **Output:** `39`
- **Explanation:** The subarray [4, 2, 10, 23] has the maximum sum of 39.

**Example 3:**
- **Input:** `nums = [100, 200, 300, 400]`, `k = 2`
- **Output:** `700`
- **Explanation:** The subarray [300, 400] has the maximum sum of 700.


## Approach

This is a classic **sliding window** problem. Instead of recalculating the sum for each window from scratch, we can efficiently slide the window by:
1. Adding the new element entering the window
2. Removing the old element leaving the window

**Algorithm:**
1. Calculate the sum of the first `k` elements (initial window)
2. Set this sum as the current maximum
3. Slide the window one position at a time:
   - Add the next element (at position `end`)
   - Remove the element that's `k` positions back (at position `end - k`)
   - Update the maximum sum if the current sum is greater
4. Return the maximum sum found

**Time Complexity:** O(n) - Single pass through the array  
**Space Complexity:** O(1) - Only using a few variables


## Solution

### Python
```python
from typing import List

class Solution:
    def maxSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        if n == 0:
            return 0
        if k > n:
            raise ValueError("k must be smaller than array length")
        
        # Calculate sum of first window
        curr_sum = sum(nums[:k])
        ans = curr_sum
        
        # Slide the window
        for end in range(k, n):
            curr_sum += (nums[end] - nums[end - k])
            ans = max(ans, curr_sum)
        
        return ans
```

### C++
```cpp
class Solution {
public:
    int maxSum(vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0) return 0;
        if (k > n) throw invalid_argument("k must be smaller than array length");
        
        // Calculate sum of first window
        int curr_sum = 0;
        for (int i = 0; i < k; i++) {
            curr_sum += nums[i];
        }
        int ans = curr_sum;
        
        // Slide the window
        for (int end = k; end < n; end++) {
            curr_sum += nums[end] - nums[end - k];
            ans = max(ans, curr_sum);
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int maxSum(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) return 0;
        if (k > n) throw new IllegalArgumentException("k must be smaller than array length");
        
        // Calculate sum of first window
        int currSum = 0;
        for (int i = 0; i < k; i++) {
            currSum += nums[i];
        }
        int ans = currSum;
        
        // Slide the window
        for (int end = k; end < n; end++) {
            currSum += nums[end] - nums[end - k];
            ans = Math.max(ans, currSum);
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var maxSum = function(nums, k) {
    const n = nums.length;
    if (n === 0) return 0;
    if (k > n) throw new Error("k must be smaller than array length");
    
    // Calculate sum of first window
    let currSum = 0;
    for (let i = 0; i < k; i++) {
        currSum += nums[i];
    }
    let ans = currSum;
    
    // Slide the window
    for (let end = k; end < n; end++) {
        currSum += nums[end] - nums[end - k];
        ans = Math.max(ans, currSum);
    }
    
    return ans;
};
```
