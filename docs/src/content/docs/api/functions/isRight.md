---
editUrl: false
next: false
prev: false
title: "isRight"
---

> **isRight**\<`R`\>(`x`): `x is Right<R>`

Check whether given `x` is of type [Right](../../../../../../api/interfaces/right).

### Example
```ts
isRight({right: 123})
// => true

isRight({left: 456})
// => false

isRight({right: "foobar"} as Either<number, string>)
// => x is Right<string>
```

## Type Parameters

• **R**

The [Right](../../../../../../api/interfaces/right) type.

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is Right<R>`

`true` if `x` is a [Right](/api/api/interfaces/right/), `false` otherwise.

## Defined in

[src/guard/is-right/is-right.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-right/is-right.ts#L27)
