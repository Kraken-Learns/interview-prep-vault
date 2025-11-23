---
title: "Two Sum"
difficulty: "Easy"
tags: ["Array", "HashTable"]
source: "HelloInterview"
date: "2023-10-27"
---

## Problem
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Approach
We can use a hash map to store the complement of the current number as we iterate through the array. If we find the complement in the map, we return the indices.

## Solution
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
