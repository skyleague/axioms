---
editUrl: false
next: false
prev: false
title: "isInteger"
---

> **isInteger**(`x`): `x is number`

Checks if `x` is an integer.

### Example
```ts
isInteger(1234)
// => true

isInteger(12.34)
// => false

isInteger("foobar")
// => false
```

### Alternatives
- [ECMAScript Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is number`

`true` if `x` is an integer, `false` otherwise.

## Defined in

[src/guard/is-integer/is-integer.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-integer/is-integer.ts#L25)
