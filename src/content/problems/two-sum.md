---
title: "Two Sum"
difficulty: "Easy"
tags: ["Array", "HashTable"]
date: "2023-10-27"
source: "Hello interview"
starterCode:
  python: |
    def twoSum(nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass
  cpp: |
    class Solution {
    public:
        vector<int> twoSum(vector<int>& nums, int target) {
            // Write your code here
        }
    };
  java: |
    class Solution {
        public int[] twoSum(int[] nums, int target) {
            // Write your code here
        }
    }
  javascript: |
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    var twoSum = function(nums, target) {
        // Write your code here
    };
---

## Problem
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Test Cases

**Example 1:**
- **Input:** `nums = [2,7,11,15], target = 9`
- **Output:** `[0,1]`
- **Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
- **Input:** `nums = [3,2,4], target = 6`
- **Output:** `[1,2]`

**Example 3:**
- **Input:** `nums = [3,3], target = 6`
- **Output:** `[0,1]`

## Approach
We can use a hash map to store the complement of the current number as we iterate through the array. If we find the complement in the map, we return the indices.

## Solution

### Python
```python
def twoSum(nums: List[int], target: int) -> List[int]:
    prevMap = {}  # val -> index

    for i, n in enumerate(nums):
        diff = target - n
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i
    return []
```

### C++
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> prevMap;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (prevMap.count(diff)) {
                return {prevMap[diff], i};
            }
            prevMap[nums[i]] = i;
        }
        return {};
    }
};
```

### Java
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> prevMap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (prevMap.containsKey(diff)) {
                return new int[]{prevMap.get(diff), i};
            }
            prevMap.put(nums[i], i);
        }
        return new int[]{};
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const prevMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (prevMap.has(diff)) {
            return [prevMap.get(diff), i];
        }
        prevMap.set(nums[i], i);
    }
    return [];
};
```
