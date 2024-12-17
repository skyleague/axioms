---
editUrl: false
next: false
prev: false
title: "isLeft"
---

> **isLeft**\<`L`\>(`x`): `x is Left<L>`

Check whether given `x` is of type [Left](../../../../../../api/interfaces/left).

### Example
```ts
isLeft({left: 123})
// => true

isLeft({right: 456})
// => false

isLeft({left: 1234} as Either<number, string>)
// => x is Left<number>
```

## Type Parameters

• **L**

The [Left](../../../../../../api/interfaces/left) type.

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is Left<L>`

`true` if `x` is a [Left](/api/api/interfaces/left/), `false` otherwise.

## Defined in

[src/guard/is-left/is-left.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-left/is-left.ts#L27)
