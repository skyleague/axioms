---
sidebar_position: 1
---

# Monads
A monad is a type of structure that can be used to encapsulate a sequence of computations. It's an abstraction that lets us write code sequentially, without having to worry about the underlying details. Monads are useful for structuring functional programs. Some concepts from functional programming are hard to translate to practical software design, but monads can give us a nice way to represent state and chain operations.  A monad must satisfy a few properties:

1. There must be a constructor to turn a value into a monad. (unit)
2. A monad stores a value. (state)
3. The monad needs to allow transformations to new monads. (bind)

Sounds vague? Understandable. In more simple terms: monads are composable functions. 

Monads are used to encapsulate computation states, but what exactly are their values? A value in a monad is simply the representation of a computation that has just been done. It can be described as "current state" or "state transitions." 
A simple way to think about it is as an object containing two fields: state and transition functions. This makes it easy to see how monads are used in programming. 

All the monads can be described as a state machine on which the current state is at a particular value. The values of these monad's states are represented by their "transition functions."

Even better - you've already used them!

## Arrays
```ts
const xs = [1, 2, 3]
const timesTwo = x => x * 2
xs.map(timesTwo)
// => [1, 4, 6]
```

The `Array<T>.map<U>` function maps an array to an array - `T[]` to a `U[]`, to be more precise.


## Unit functions
The unit function is the constructor that easily creates the monad by wrapping a generic value.

A very simple example can be found in the javascript array implementation:

```ts
Array.of(2)
// => [2]
```

The unit function creates an array of the given input, and it does not matter that the values are here.


## State

## Binding

```ts
xs.map(timesTwo)
  .map(timesTwo)
// => [1, 8, 16]
```



Obviously we don't have any syntax sugar in javascript to generically compose functions together.

## Functors
Functors are a kind of structure-preserving mapping between categories, and monads are just one kind of functor. A Functor is a container which can be mapped upon by a Unary function.

```ts
const functor = <T>(v: T) => ({
  value: v,
  map: <U>(f: (x: T) => U) => functor(f(v))
})
```

### Identity
```ts
const f = [1, 2, 3];
f.map(x => x); // [1, 2, 3]
```

### Composition
```
F.map(x => f(g(x))) === F.map(g).map(f)
```

## Applicative


## How to make this work in practice


## In depth

### The monad laws

#### Left Identity
```ts
unit(x).flatMap(f) === f(x)
```

#### Right Identity
```ts
m.flatMap(unit) === m
```

#### Associativity
```ts
m.flatMap(f).flatMap(g) == m.flatMap(x ⇒ f(x).flatMap(g))
```

