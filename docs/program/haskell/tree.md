# 树

简单的二叉树节点，LeetCode上和树相关的题大多只需要该类型即可。比较麻烦的其实是和数组之间的相互转换，尤其要求与LeetCode上定义的方式兼容。

> 安装：`cabal install --lib vector`

```haskell
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

```

写了一堆工具函数来帮助实现这个过程，重点是“null”字符的处理。这是因为LeetCode树结构数据在输入时用“null”当作占位符，同样地，也要求我们在输出时用“null”当作占位符。

## 1. 输入的实现思路

首先去空格，然后以逗号分隔转化为字符串数组。因为“null”作为占位符，所以每个节点的索引对应了它在二叉树中的位置，由此我们可以直接根据索引把整棵树递归地构建出来。

## 2. 输出的实现思路

用BFS遍历即可，同样用“null”作为占位符，最后再去掉末尾的占位符。

---

源代码：

- [`tree.hs`](src/tree.hs)

- [`util.hs`](src/util.hs)
