---
title: "3 Sum"
difficulty: "Medium"
tags: ["Two Pointers"]
date: "2023-10-29"
source: "LeetCode"
starterCode:
  python: |
    def threeSum(nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        vector<vector<int>> threeSum(vector<int>& nums) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public List<List<Integer>> threeSum(int[] nums) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    var threeSum = function(nums) {
        // Write your code here
    };
---

## Problem
Given an input integer array `nums`, write a function to find all **unique triplets** `[nums[i], nums[j], nums[k]]` such that `i`, `j`, and `k` are distinct indices, and the sum of `nums[i] + nums[j] + nums[k]` equals **zero**.

Ensure that the resulting list does not contain any **duplicate triplets**.

**Note:** The order of the triplets and the order of the elements within the triplets do not matter.

## Test Cases

**Example 1:**
- **Input:** `nums = [-1, 0, 1, 2, -1, -1]`
- **Output:** `[[-1, -1, 2], [-1, 0, 1]]`
- **Explanation:** 
  - `nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0`
  - `nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0`
  - `nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0`
  - The unique triplets are `[-1, -1, 2]` and `[-1, 0, 1]`

**Example 2:**
- **Input:** `nums = [0, 1, 1]`
- **Output:** `[]`
- **Explanation:** The only possible triplet does not sum to 0

**Example 3:**
- **Input:** `nums = [0, 0, 0]`
- **Output:** `[[0, 0, 0]]`
- **Explanation:** The only possible triplet sums to 0


## Approach

This problem extends the classic **Two Sum** problem. We use a combination of **sorting** and **two pointers** to find all unique triplets efficiently.

**Strategy:**

1. **Sort the array** first. This allows us to:
   - Use the two-pointer technique efficiently
   - Skip duplicates easily

2. **Iterate through the array** with a pointer `curr`:
   - For each element `nums[curr]`, we need to find two other elements that sum to `-nums[curr]`
   - This reduces the problem to a **Two Sum** problem for the remaining elements

3. **Use two pointers** (`left` and `right`) for the subarray after `curr`:
   - Start with `left = curr + 1` and `right = n - 1`
   - Calculate `sum = nums[left] + nums[right]`
   - If `sum == target`, we found a triplet! Add it to results
   - If `sum < target`, move `left` pointer right to increase sum
   - If `sum > target`, move `right` pointer left to decrease sum

4. **Skip duplicates** to avoid duplicate triplets:
   - After finding a valid triplet, skip all duplicate values for both `left` and `right` pointers
   - After processing each `curr`, skip all duplicate values

**Key Optimization:** By sorting first, we can skip duplicate values in O(1) time and use the two-pointer technique efficiently.

**Time Complexity:** O(n²) - O(n log n) for sorting + O(n²) for the nested loops  
**Space Complexity:** O(1) - Not counting the output array, only using pointers


## Solutions

### Python
```python
from typing import List

def threeSum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    curr = 0
    ans: List[List[int]] = []
    
    while curr < len(nums):
        left, right = curr + 1, len(nums) - 1
        target = -nums[curr]
        
        while left < right:
            curr_sum = nums[left] + nums[right]
            
            if curr_sum == target:
                ans.append([nums[curr], nums[left], nums[right]])
                left += 1
                # Skip duplicates for left pointer
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                right -= 1
                # Skip duplicates for right pointer
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif curr_sum < target:
                left += 1
            else:
                right -= 1
        
        curr += 1
        # Skip duplicates for curr pointer
        while curr < len(nums) and nums[curr] == nums[curr - 1]:
            curr += 1
    
    return ans
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        int curr = 0;
        
        while (curr < nums.size()) {
            int left = curr + 1, right = nums.size() - 1;
            int target = -nums[curr];
            
            while (left < right) {
                int currSum = nums[left] + nums[right];
                
                if (currSum == target) {
                    ans.push_back({nums[curr], nums[left], nums[right]});
                    left++;
                    // Skip duplicates for left pointer
                    while (left < right && nums[left] == nums[left - 1]) {
                        left++;
                    }
                    right--;
                    // Skip duplicates for right pointer
                    while (left < right && nums[right] == nums[right + 1]) {
                        right--;
                    }
                } else if (currSum < target) {
                    left++;
                } else {
                    right--;
                }
            }
            
            curr++;
            // Skip duplicates for curr pointer
            while (curr < nums.size() && nums[curr] == nums[curr - 1]) {
                curr++;
            }
        }
        
        return ans;
    }
};
```

### Java
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> ans = new ArrayList<>();
        int curr = 0;
        
        while (curr < nums.length) {
            int left = curr + 1, right = nums.length - 1;
            int target = -nums[curr];
            
            while (left < right) {
                int currSum = nums[left] + nums[right];
                
                if (currSum == target) {
                    ans.add(Arrays.asList(nums[curr], nums[left], nums[right]));
                    left++;
                    // Skip duplicates for left pointer
                    while (left < right && nums[left] == nums[left - 1]) {
                        left++;
                    }
                    right--;
                    // Skip duplicates for right pointer
                    while (left < right && nums[right] == nums[right + 1]) {
                        right--;
                    }
                } else if (currSum < target) {
                    left++;
                } else {
                    right--;
                }
            }
            
            curr++;
            // Skip duplicates for curr pointer
            while (curr < nums.length && nums[curr] == nums[curr - 1]) {
                curr++;
            }
        }
        
        return ans;
    }
}
```

### JavaScript
```javascript
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const ans = [];
    let curr = 0;
    
    while (curr < nums.length) {
        let left = curr + 1, right = nums.length - 1;
        const target = -nums[curr];
        
        while (left < right) {
            const currSum = nums[left] + nums[right];
            
            if (currSum === target) {
                ans.push([nums[curr], nums[left], nums[right]]);
                left++;
                // Skip duplicates for left pointer
                while (left < right && nums[left] === nums[left - 1]) {
                    left++;
                }
                right--;
                // Skip duplicates for right pointer
                while (left < right && nums[right] === nums[right + 1]) {
                    right--;
                }
            } else if (currSum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        curr++;
        // Skip duplicates for curr pointer
        while (curr < nums.length && nums[curr] === nums[curr - 1]) {
            curr++;
        }
    }
    
    return ans;
};
```
