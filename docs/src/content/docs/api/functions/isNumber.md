---
editUrl: false
next: false
prev: false
title: "isNumber"
---

> **isNumber**(`x`): `x is number`

Checks if `x` is a number primitive.

### Example
```ts
isNumber(1234)
// => true

isNumber(12.34)
// => true

isNumber("foobar")
// => false
```

### Alternatives
- [Lodash isNumber](https://lodash.com/docs/4.17.15#isNumber)

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is number`

`true` if `x` is a number, `false` otherwise.

## Defined in

[src/guard/is-number/is-number.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-number/is-number.ts#L25)
