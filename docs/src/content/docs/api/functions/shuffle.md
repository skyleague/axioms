---
editUrl: false
next: false
prev: false
title: "shuffle"
---

> **shuffle**\<`T`\>(`xs`, `random`): `T`[]

It takes a traversable and returns a new array with the same elements in a random order.

### Example
```ts
shuffle([1, 2, 3])
// => [2, 3, 1]

shuffle([1, 2, 3])
// => [2, 1, 3]
```

## Type Parameters

• **T**

## Parameters

### xs

`Iterable`\<`T`, `any`, `any`\>

The array to shuffle.

### random

() => `number`

The random implementation to shuffle

## Returns

`T`[]

A new array with the same elements as the original array, but in a random order.

## Defined in

[src/random/rng/shuffle/shuffle.ts:19](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/rng/shuffle/shuffle.ts#L19)
