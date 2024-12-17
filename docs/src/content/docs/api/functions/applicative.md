---
editUrl: false
next: false
prev: false
title: "applicative"
---

> **applicative**\<`T`\>(`xs`): `Iterable`\<`T`\>

It takes a traversable and returns a traversable that buffers the values of the original traversable.

### Example
```ts
const xs = applicative([1, 2, 3])
collect(xs)
// => [1, 2, 3]

const ys = applicative(take(cycle([1, 2]), 4))
collect(ys)
// => [1, 2, 1, 2]
collect(ys)
// => [1, 2, 1, 2]

```

## Type Parameters

• **T**

The element type.

## Parameters

### xs

() => `Iterable`\<`T`, `any`, `any`\>

The values to make applicative.

## Returns

`Iterable`\<`T`\>

A traversable that is an applicative.

## Defined in

[src/iterator/applicative/applicative.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/applicative/applicative.ts#L27)
