---
editUrl: false
next: false
prev: false
title: "isString"
---

> **isString**(`x`): `x is string`

Checks if `x` is a [string](../../../../../../api/functions/string).

### Example
```ts
isString("foobar")
// => true

isString(1234)
// => false

isString({})
// => false
```

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is string`

`true` if `x` is a [string](/api/api/functions/string/), `false` otherwise.

## Defined in

[src/guard/is-string/is-string.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-string/is-string.ts#L22)
