---
editUrl: false
next: false
prev: false
title: "swapEither"
---

> **swapEither**\<`L`, `R`\>(`x`): [`Either`](/api/type-aliases/either/)\<`R`, `L`\>

If the input is a Left, return a Right with the same value, otherwise return a Left with the same
value.

### Example
```ts
swapEither({left: "foobar"})
// => {right: "foobar"}

swapEither({right: "foobar"})
// => {left: "foobar"}
```

## Type Parameters

• **L**

The [Left](../../../../../../api/interfaces/left) type.

• **R**

The [Right](../../../../../../api/interfaces/right) type.

## Parameters

### x

[`Either`](/api/type-aliases/either/)\<`L`, `R`\>

## Returns

[`Either`](/api/type-aliases/either/)\<`R`, `L`\>

## Defined in

[src/data/either/either.ts:357](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L357)
