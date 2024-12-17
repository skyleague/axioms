---
editUrl: false
next: false
prev: false
title: "isEither"
---

> **isEither**\<`L`, `R`\>(`x`): `x is Either<L, R>`

Check whether given `x` is of type [Either](../../../../../../api/type-aliases/either).

### Example
```ts
isEither({left: 123})
// => true

isEither({right: 456})
// => true

isEither("foobar")
// => false
```

## Type Parameters

• **L**

The [Left](../../../../../../api/interfaces/left) type.

• **R**

The [Right](../../../../../../api/interfaces/right) type.

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is Either<L, R>`

`true` if `x` is a [Left](/api/api/interfaces/left/) or a [Right](/api/api/interfaces/right/), `false` otherwise.

## Defined in

[src/guard/is-either/is-either.ts:28](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-either/is-either.ts#L28)
