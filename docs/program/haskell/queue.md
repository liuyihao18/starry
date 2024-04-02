# 队列

基于官方的`Data.Sequence`库实现的队列，也是为了方便自己代码的抽象。

> 安装：`cabal install --lib containers`

```haskell
{-# OPTIONS_GHC -Wall #-}

module Queue where

import Data.Sequence qualified as Seq

newtype Queue a = Queue (Seq.Seq a)
  deriving (Show, Eq, Functor, Applicative)

isEmpty :: Queue a -> Bool
isEmpty = not . Queue.null

null :: Queue a -> Bool
null (Queue queue) = Seq.null queue

length :: Queue a -> Int
length = Queue.size

size :: Queue a -> Int
size (Queue queue) = Seq.length queue

empty :: Queue a
empty = Queue Seq.empty

singleton :: a -> Queue a
singleton = Queue . Seq.singleton

insert :: a -> Queue a -> Queue a
insert item (Queue queue) = Queue (queue Seq.:|> item)

view :: Queue a -> Maybe (a, Queue a)
view (Queue queue) = case Seq.viewl queue of
  Seq.EmptyL -> Nothing
  x Seq.:< xs -> Just (x, Queue xs)

```

函数名顾名思义，我就不多做解释了，其中的`view`方法仿照了官方`Data.Heap`数据类型中的定义方式。

---

源代码：

- [`queue.hs`](src/queue.hs)
