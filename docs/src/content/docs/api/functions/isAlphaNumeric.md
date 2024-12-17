---
editUrl: false
next: false
prev: false
title: "isAlphaNumeric"
---

> **isAlphaNumeric**(`str`, `extra`?): `boolean`

Check whether given `str` is alphanumeric string.

The allowed characters are A-Z, and a-z.

### Example
```ts
isAlphaNumeric("foobar")
// => true

isAlphaNumeric("foobar123")
// => true

isAlphaNumeric("foobar")
// => false

isAlphaNumeric("foobar$", "$")
// => true
```

## Parameters

### str

`string`

The string to check for alphanumeric characters.

### extra?

`string`

Extra characters that are allowed.

## Returns

`boolean`

`str` consists of alphanumeric characters.

## Defined in

[src/guard/is-alpha-numeric/is-alpha-numeric.ts:28](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-alpha-numeric/is-alpha-numeric.ts#L28)
