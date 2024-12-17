---
editUrl: false
next: false
prev: false
title: "isAlpha"
---

> **isAlpha**(`str`, `extra`?): `boolean`

Check whether given `str` is alphabetic string.

The allowed characters are A-Z, and a-z.

### Example
```ts
isAlpha("foobar")
// => true

isAlpha("foobar123")
// => false

isAlpha("foobar123", "123")
// => true
```

## Parameters

### str

`string`

The string to check for alphabetic characters.

### extra?

`string`

Extra characters that are allowed.

## Returns

`boolean`

`str` consists of alphabetic characters.

## Defined in

[src/guard/is-alpha/is-alpha.ts:25](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-alpha/is-alpha.ts#L25)
