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
