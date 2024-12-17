---
editUrl: false
next: false
prev: false
title: "span"
---

> **span**\<`T`, `R`\>(`xs`, `predicate`): [`T`[], `IteratorObject`\<`T`, `R`\>]

Returns a tuple where first element is longest prefix of `xs` of elements
that satisfy the predicate and second element is the remainder of the Iterable.

### Example
```ts
const [init, rest] = span([1, 2, 3, 4], (x) => x < 3)
init
// => [1, 2]

collect(rest)
// => [3, 4]
```

## Type Parameters

• **T**

The element type.

• **R**

The return type.

## Parameters

### xs

`Iterable`\<`T`, `R`, `any`\>

The values to span.

### predicate

(`x`) => `boolean`

The predicate to split the Iterable on.

## Returns

[`T`[], `IteratorObject`\<`T`, `R`\>]

A tuple.

## Defined in

[src/iterator/span/span.ts:24](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/iterator/span/span.ts#L24)
