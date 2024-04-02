{-# OPTIONS_GHC -Wall #-}

module Util where

import Data.Char
import Data.Vector qualified as V

strip :: String -> String
strip = takeWhile (not . isSpace) . dropWhile isSpace

wordsWhen :: (Char -> Bool) -> String -> [String]
wordsWhen p s = case dropWhile p s of
  "" -> []
  s' -> w : wordsWhen p s''
    where
      (w, s'') = break p s'

unWordsWith :: Char -> [String] -> String
unWordsWith _ [] = ""
unWordsWith _ [w] = w
unWordsWith d (w : ws) = w ++ [d] ++ unWordsWith d ws

removeBrackets :: String -> String
removeBrackets = takeWhile (/= ']') . dropWhile (== '[')

addBrackets :: String -> String
addBrackets str = "[" ++ str ++ "]"

takeRange :: Int -> Int -> [a] -> [a]
takeRange l r = take (r - l) . drop l

takeNAtP :: Int -> Int -> [a] -> [a]
takeNAtP p n = take n . drop p

bsearch :: Ord a => V.Vector a -> a -> Bool
bsearch vector target
  | V.null vector = False
  | target < element = bsearch vector1 target
  | target > element = bsearch vector2 target
  | otherwise = True
  where
    middle = length vector `div` 2
    element = vector V.! middle
    vector1 = V.take middle vector
    vector2 = V.drop (middle + 1) vector

lowerBound :: Ord a => V.Vector a -> a -> Int
lowerBound vector target = lowerBound' vector target 0 n
  where
    n = length vector

lowerBound' :: Ord a => V.Vector a -> a -> Int -> Int -> Int
lowerBound' vector target left right
  | V.null vector = -1
  | left >= right = left
  | target > element = lowerBound' vector target (middle + 1) right
  | otherwise = lowerBound' vector target left middle
  where
    middle = (left + right) `div` 2
    element = vector V.! middle

upperBound :: Ord a => V.Vector a -> a -> Int
upperBound vector target = upperBound' vector target 0 n
  where
    n = length vector

upperBound' :: Ord a => V.Vector a -> a -> Int -> Int -> Int
upperBound' vector target left right
  | V.null vector = -1
  | left >= right = left
  | target >= element = upperBound' vector target (middle + 1) right
  | otherwise = upperBound' vector target left middle
  where
    middle = (left + right) `div` 2
    element = vector V.! middle
