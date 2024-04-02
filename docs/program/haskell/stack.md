# 栈

基于官方的`Data.Stack`库实现的栈，同样是为了方便自己代码的抽象。

> 安装：`cabal install --lib containers`

```haskell
{-# OPTIONS_GHC -Wall #-}

module Stack where

import Data.Sequence qualified as Seq

newtype Stack a = Stack (Seq.Seq a)
  deriving (Show, Eq, Functor, Applicative)

isEmpty :: Stack a -> Bool
isEmpty = not . Stack.null

null :: Stack a -> Bool
null (Stack stack) = Seq.null stack

length :: Stack a -> Int
length = Stack.size

size :: Stack a -> Int
size (Stack stack) = Seq.length stack

empty :: Stack a
empty = Stack Seq.empty

singleton :: a -> Stack a
singleton = Stack . Seq.singleton

insert :: a -> Stack a -> Stack a
insert item (Stack stack) = Stack (stack Seq.:|> item)

view :: Stack a -> Maybe (a, Stack a)
view (Stack stack) = case Seq.viewr stack of
  Seq.EmptyR -> Nothing
  xs Seq.:> x -> Just (x, Stack xs)

```

和队列一样，`view`方法仿照了官方`Data.Heap`数据类型中的定义方式。

---

源代码：

- [`stack.hs`](src/stack.hs)
