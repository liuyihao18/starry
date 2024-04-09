{-# OPTIONS_GHC -Wall #-}

module Solution where

import IO

maximumCount :: [Int] -> Int
maximumCount nums = pos `max` neg
  where
    pos = length . filter (> 0) $ nums
    neg = length . filter (< 0) $ nums

nums1 :: [Int]
nums1 = [-2, -1, -1, 1, 2, 3]

nums2 :: [Int]
nums2 = [-3, -2, -1, 0, 0, 1, 2]

nums3 :: [Int]
nums3 = [5, 20, 66, 1314]

input :: [Int] -> IO ()
input = input1 "nums"

output :: Int -> IO ()
output = output1

main :: IO ()
main = do
  input nums1
  output (maximumCount nums1)
  input nums2
  output (maximumCount nums2)
  input nums3
  output (maximumCount nums3)