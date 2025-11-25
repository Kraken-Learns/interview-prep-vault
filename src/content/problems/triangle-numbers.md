---
title: "Triangle Numbers"
difficulty: "Medium"
tags: ["Array", "Two Pointers", "Sorting"]
date: "2025-11-25"
source: "LeetCode"
starterCode:
  python: |
    from typing import List

    class Solution:
        def triangleNumber(self, nums: List[int]) -> int:
            # Write your code here
            pass
  cpp: |
    #include <vector>
    #include <algorithm>
    using namespace std;

    class Solution {
    public:
        int triangleNumber(vector<int>& nums) {
            // Write your code here
        }
    };
  java: |
    import java.util.Arrays;

    class Solution {
        public int triangleNumber(int[] nums) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @return {number}
     */
    var triangleNumber = function(nums) {
        // Write your code here
    };
---

## Problem

Write a function to count the number of triplets in an integer array `nums` that could form the sides of a triangle. For three sides to form a valid triangle, the sum of any two sides must be greater than the third side. The triplets do not need to be unique.

## Test Cases

**Example 1:**
- **Input:** `nums = [11,4,9,6,15,18]`
- **Output:** `10`
- **Explanation:** Valid combinations are:
  - 4, 15, 18
  - 6, 15, 18
  - 9, 15, 18
  - 11, 15, 18
  - 9, 11, 18
  - 6, 11, 15
  - 9, 11, 15
  - 4, 6, 9
  - 6, 9, 11
  - 4, 9, 11

**Example 2:**
- **Input:** `nums = [2,2,3,4]`
- **Output:** `3`
- **Explanation:** Valid combinations are:
  - 2, 3, 4 (using first 2)
  - 2, 3, 4 (using second 2)
  - 2, 2, 3

## Approach

The brute force approach would be to check every triplet, which takes O(n^3) time. We can optimize this by sorting the array first.

Once the array is sorted, if we have three numbers $a, b, c$ such that $a \le b \le c$, the condition $a + b > c$ is sufficient to form a triangle (since $b+c > a$ and $a+c > b$ are automatically true).

We can iterate through the array, fixing the largest side `nums[k]` (where `k` goes from `n-1` down to `2`). Then, we use two pointers to find pairs `(i, j)` with `i < j < k` such that `nums[i] + nums[j] > nums[k]`.

**Algorithm:**
1. Sort `nums`.
2. Iterate `k` from `n-1` down to `2`.
3. Initialize `left = 0` and `right = k - 1`.
4. While `left < right`:
   - If `nums[left] + nums[right] > nums[k]`:
     - This means `nums[right]` can form a triangle with `nums[left]` and `nums[k]`.
     - Since `nums` is sorted, `nums[right]` will also form a triangle with any element from `left+1` to `right-1` (because they are larger than `nums[left]`).
     - So, we add `right - left` to our count.
     - Decrement `right` to check the next smaller candidate for the second side.
   - Else (`nums[left] + nums[right] <= nums[k]`):
     - The sum is too small. We need a larger first side, so increment `left`.

**Time Complexity:** O(n^2) - Sorting takes O(n log n), and the two-pointer approach takes O(n^2).
**Space Complexity:** O(log n) or O(n) depending on the sorting implementation.

## Solutions

### Python
```python
from typing import List

class Solution:
    def triangleNumber(self, nums: List[int]) -> int:
        nums.sort()
        curr, ans = len(nums) - 1, 0
        while curr > 0:
            left, right = 0, curr - 1
            target = nums[curr]
            while left < right:
                curr_sum = nums[left] + nums[right]
                if curr_sum > target:
                    ans += (right - left)
                    right -= 1
                else:
                    left += 1
            curr -= 1
        return ans
```

### C++
```cpp
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int count = 0;
        for (int i = nums.size() - 1; i >= 2; i--) {
            int left = 0, right = i - 1;
            while (left < right) {
                if (nums[left] + nums[right] > nums[i]) {
                    count += (right - left);
                    right--;
                } else {
                    left++;
                }
            }
        }
        return count;
    }
};
```

### Java
```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int count = 0;
        for (int i = nums.length - 1; i >= 2; i--) {
            int left = 0, right = i - 1;
            while (left < right) {
                if (nums[left] + nums[right] > nums[i]) {
                    count += right - left;
                    right--;
                } else {
                    left++;
                }
            }
        }
        return count;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
    nums.sort((a, b) => a - b);
    let count = 0;
    for (let i = nums.length - 1; i >= 2; i--) {
        let left = 0;
        let right = i - 1;
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                count += (right - left);
                right--;
            } else {
                left++;
            }
        }
    }
    return count;
};
```
