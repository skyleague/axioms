---
editUrl: false
next: false
prev: false
title: "isFailure"
---

> **isFailure**(`x`): `x is Error`

Checks if `x` is a [Failure](../../../../../../api/type-aliases/failure).

### Example
```ts
isFailure("foobar")
// => false

isFailure(new Error())
// => true
```

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is Error`

`true` if `x` is a [Failure](/api/api/type-aliases/failure/), `false` otherwise.

## Defined in

[src/guard/is-failure/is-failure.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-failure/is-failure.ts#L22)
