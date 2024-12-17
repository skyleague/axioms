---
editUrl: false
next: false
prev: false
title: "isBoolean"
---

> **isBoolean**(`x`): `x is boolean`

Checks if `x` is a boolean primitive.

### Example
```ts
isBoolean(true)
// => true

isBoolean("foobar")
// => false
```

### Alternatives
- [Lodash - isBoolean](https://lodash.com/docs/#isBoolean)

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is boolean`

`true` if `x` is a boolean, `false` otherwise.

## Defined in

[src/guard/is-boolean/is-boolean.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-boolean/is-boolean.ts#L22)
