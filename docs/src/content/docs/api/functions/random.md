---
editUrl: false
next: false
prev: false
title: "random"
---

> **random**\<`T`\>(`arbitrary`, `ctx`): `T`

It takes an arbitrary and a context, and returns a random value of the type that arbitrary generates

### Example
```ts
random(integer())
// => 123
```

## Type Parameters

• **T**

## Parameters

### arbitrary

[`Arbitrary`](/api/interfaces/arbitrary/)\<`T`\>

The arbitrary to generate a value from.

### ctx

[`ArbitraryContext`](/api/interfaces/arbitrarycontext/) = `...`

The context used for random value generation.

## Returns

`T`

A random value of type T.

## Defined in

[src/random/arbitrary/random/random.ts:21](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/arbitrary/random/random.ts#L21)
