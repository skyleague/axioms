---
sidebar_position: 10
title: Axioms
---

# Axioms

One of the design goals of Axioms is to patch some missing gaps in existing libraries, or in the core languages - but more _importantly_ without getting in your way. This means that any function of the Axioms should be easily replaceable with other implementations from other libraries, or preferably with the implementation of ECMAScript definitions.

## FP Trap

Axioms exposes some concepts that are seen more commonly in functional programming, such as:

1. Either
2. Maybe
3. Try
4. Property Testing
5. Iterators

There are loads of implementations that can be found for any of these concepts in javascript/typescript. And the conceptual models are becoming more and more mainstream. Languages like Scala, Rust, C++ and even javascript are implementing more of these concepts as part of the standard language. While we will not go out of our way to look into their definitions and implementation - it is good to know that there is growing mainstream support for the conceptual models.

An often made _mistake_ (in our opinion) is to force these concepts in your application/library code by implementation specific parts. This means that your library will take over the core concepts of the programming languages by introducing a new DSL.

Lets take [Rambda](https://ramdajs.com/docs/#ifElse) (an otherwise excellent high quality library) as example:

```ts
const incCount = R.ifElse(R.has('count'), R.over(R.lensProp('count'), R.inc), R.assoc('count', 1))
incCount({ count: 1 }) //=> { count: 2 }
incCount({}) //=> { count: 1 }
```

By defining everything as a full monad on top of the javascript language, we:

1. Become extremely coupled by the implementation.
2. Have to learn a new DSL to properly read this.
3. Loose sight of where the boundaries of FP are helpful.

## Practical approach

In Axioms we decided to go in a different route. We don't define full monads, or try to take over your code completely. We gain readability, debuggability and familiarity, at the cost of some correctness and purity (and we accept that not everyone will like this tradeoff).

How do we do this? Simple! We define such simple types that you don't even need to import them from Axioms. Want to define a Left? Just define it as `{left: <value>}`. Want to have a Just? Simple, just use the value as `<value>`, `Nothing` is it's own symbol.

But if these types are as simple as we just defined - why would we need Axioms? - The honest answer is you don't :). We took a lot of care defining the concepts in this library and making sure they are practically useful. And while we define lots of functions that you might need in daily practice, there are always a few alternatives.
