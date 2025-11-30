---
title: "Max Sum of Distinct Subarrays Length k"
difficulty: "Medium"
tags: ["Sliding Window"]
date: "2025-11-30"
source: "LeetCode"
starterCode:
  python: |
    from typing import List
    import collections
    
    class Solution:
        def maxSum(self, nums: List[int], k: int) -> int:
            # Write your code here
            pass
  cpp: |
    class Solution {
    public:
        long long maxSum(vector<int>& nums, int k) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public long maxSum(int[] nums, int k) {
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

Given an integer array `nums` and an integer `k`, write a function to identify the **highest possible sum** of a subarray within `nums`, where the subarray meets the following criteria:
- Its length is `k`
- All of its elements are **unique** (no duplicates)

Return the maximum sum, or `0` if no such subarray exists.

## Test Cases

**Example 1:**
- **Input:** `nums = [3, 2, 2, 3, 4, 6, 7, 7, -1]`, `k = 4`
- **Output:** `20`
- **Explanation:** The subarrays of nums with length 4 are:
  - `[3, 2, 2, 3]` → elements 3 and 2 are repeated
  - `[2, 2, 3, 4]` → element 2 is repeated
  - `[2, 3, 4, 6]` → meets the requirements and has a sum of 15
  - `[3, 4, 6, 7]` → meets the requirements and has a sum of 20 ✓
  - `[4, 6, 7, 7]` → element 7 is repeated
  - `[6, 7, 7, -1]` → element 7 is repeated
  - We return 20 because it is the maximum subarray sum

**Example 2:**
- **Input:** `nums = [1, 5, 4, 2, 9, 9, 9]`, `k = 3`
- **Output:** `15`
- **Explanation:** The subarray `[5, 4, 2]` or `[4, 2, 9]` both have all unique elements and sum to 15.

**Example 3:**
- **Input:** `nums = [1, 1, 1, 1, 1]`, `k = 2`
- **Output:** `0`
- **Explanation:** No subarrays of length 2 have all unique elements.


## Approach

This problem combines **sliding window** with a **hash table** to track element frequencies. The key challenge is maintaining a window where all elements are distinct.

**Algorithm:**
1. Use a hash map to count the frequency of elements in the current window
2. Expand the window by adding elements from the right
3. When we encounter a duplicate or the window exceeds size `k`:
   - Shrink the window from the left until the duplicate is removed and window size ≤ k
4. When the window size equals `k` with all unique elements, update the maximum sum
5. Return the maximum sum found (or 0 if no valid window exists)

**Key Insight:**
- We don't need to manually check for duplicates if we shrink the window whenever `counts[num] > 1`
- The window automatically maintains the invariant of having all unique elements

**Time Complexity:** O(n) - Each element is visited at most twice (once by right pointer, once by left pointer)  
**Space Complexity:** O(k) - Hash map stores at most k unique elements


## Solution

### Python
```python
from typing import List
import collections

class Solution:
    def maxSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        if k == 0:
            return 0
        if k > n:
            raise ValueError("k should be <= length of array")
        
        counts = collections.defaultdict(int)
        start, curr_sum = 0, 0
        ans = 0
        
        for i, num in enumerate(nums):
            counts[num] += 1
            curr_sum += num
            
            # Shrink while duplicate exists or window too large
            while counts[num] > 1 or i - start + 1 > k:
                start_num = nums[start]
                curr_sum -= start_num
                counts[start_num] -= 1
                start += 1
            
            # Update max when we have a valid window of size k
            if i - start + 1 == k:
                ans = max(ans, curr_sum)
        
        return ans
```

### C++
```cpp
class Solution {
public:
    long long maxSum(vector<int>& nums, int k) {
        int n = nums.size();
        if (k == 0) return 0;
        if (k > n) throw invalid_argument("k should be <= length of array");
        
        unordered_map<int, int> counts;
        int start = 0;
        long long curr_sum = 0;
        long long ans = 0;
        
        for (int i = 0; i < n; i++) {
            int num = nums[i];
            counts[num]++;
            curr_sum += num;
            
            // Shrink while duplicate exists or window too large
            while (counts[num] > 1 || i - start + 1 > k) {
                int start_num = nums[start];
                curr_sum -= start_num;
                counts[start_num]--;
                start++;
            }
            
            // Update max when we have a valid window of size k
            if (i - start + 1 == k) {
                ans = max(ans, curr_sum);
            }
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public long maxSum(int[] nums, int k) {
        int n = nums.length;
        if (k == 0) return 0;
        if (k > n) throw new IllegalArgumentException("k should be <= length of array");
        
        Map<Integer, Integer> counts = new HashMap<>();
        int start = 0;
        long currSum = 0;
        long ans = 0;
        
        for (int i = 0; i < n; i++) {
            int num = nums[i];
            counts.put(num, counts.getOrDefault(num, 0) + 1);
            currSum += num;
            
            // Shrink while duplicate exists or window too large
            while (counts.get(num) > 1 || i - start + 1 > k) {
                int startNum = nums[start];
                currSum -= startNum;
                counts.put(startNum, counts.get(startNum) - 1);
                start++;
            }
            
            // Update max when we have a valid window of size k
            if (i - start + 1 == k) {
                ans = Math.max(ans, currSum);
            }
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var maxSum = function(nums, k) {
    const n = nums.length;
    if (k === 0) return 0;
    if (k > n) throw new Error("k should be <= length of array");
    
    const counts = new Map();
    let start = 0;
    let currSum = 0;
    let ans = 0;
    
    for (let i = 0; i < n; i++) {
        const num = nums[i];
        counts.set(num, (counts.get(num) || 0) + 1);
        currSum += num;
        
        // Shrink while duplicate exists or window too large
        while (counts.get(num) > 1 || i - start + 1 > k) {
            const startNum = nums[start];
            currSum -= startNum;
            counts.set(startNum, counts.get(startNum) - 1);
            start++;
        }
        
        // Update max when we have a valid window of size k
        if (i - start + 1 === k) {
            ans = Math.max(ans, currSum);
        }
    }
    
    return ans;
};
```
