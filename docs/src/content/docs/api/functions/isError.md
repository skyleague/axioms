---
editUrl: false
next: false
prev: false
title: "isError"
---

> **isError**(`x`): `x is Error`

Checks if `x` is classified as Error.

### Example
```ts
isError(new Error("this is an error"))
// => true

isError("foobar")
// => false
```

### Alternatives
- [Lodash - isError]https://lodash.com/docs/#isError)

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is Error`

`true` if `x` is an Error, `false` otherwise.

## Defined in

[src/guard/is-error/is-error.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-error/is-error.ts#L22)
