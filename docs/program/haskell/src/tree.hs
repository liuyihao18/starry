{-# OPTIONS_GHC -Wall #-}

module Tree where

import Data.List
import Data.Vector qualified as V
import Queue qualified as Q
import Util

data Tree a
  = TreeNode {val :: a, left :: Tree a, right :: Tree a}
  | Empty

empty :: Tree a
empty = Empty

singleton :: a -> Tree a
singleton val = TreeNode val empty empty

instance Functor Tree where
  fmap _ Empty = Empty
  fmap f (TreeNode val left right) = TreeNode (f val) (fmap f left) (fmap f right)

instance (Show a) => Show (Tree a) where
  show = toString

fromString :: (Read a) => String -> Tree a
fromString str = fromList $ map strip $ wordsWhen (== ',') $ removeBrackets str

fromList :: (Read a) => [String] -> Tree a
fromList list = _fromVector vector 0
  where
    vector = V.fromList list

-- Index
_fromVector :: (Read a) => V.Vector String -> Int -> Tree a
_fromVector vector index
  | index < 0 || index >= n = Empty
  | otherwise = let val = (vector V.! index) in if val == "null" then Empty else TreeNode (read val) (_fromVector vector (2 * index + 1)) (_fromVector vector (2 * (index + 1)))
  where
    n = length vector

toString :: (Show a) => Tree a -> String
toString = addBrackets . unWordsWith ',' . toList

toList :: (Show a) => Tree a -> [String]
toList = dropWhileEnd (== "null") . _toList . Q.singleton

-- BFS
_toList :: (Show a) => Q.Queue (Tree a) -> [String]
_toList queue = case Q.view queue of
  Nothing -> []
  Just (Empty, q) -> "null" : _toList q
  Just (TreeNode val left right, q) -> show val : _toList (Q.insert right . Q.insert left $ q)
