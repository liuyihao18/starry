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
