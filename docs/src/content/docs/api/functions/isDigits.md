---
editUrl: false
next: false
prev: false
title: "isDigits"
---

> **isDigits**(`xs`): `boolean`

Checks if `xs` contains only digits.

### Example
```ts
isDigits("1234")
// => true

isDigits("1234foobar")
// => false

isDigits("123.45")
// => false
```

## Parameters

### xs

`string`

The value to check.

## Returns

`boolean`

`true` if `xs` only contains digits, `false` otherwise.

## Defined in

[src/guard/is-digit/is-digit.ts:22](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-digit/is-digit.ts#L22)
