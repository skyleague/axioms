---
editUrl: false
next: false
prev: false
title: "isUndefined"
---

> **isUndefined**(`a`): `a is undefined`

Checks if `x` is `undefined`.

### Example
```ts
isUndefined(undefined)
// => true

isUndefined(true)
// => false

isUndefined("1234")
// => false

isUndefined(null)
// => false
```

### Alternatives
- [Lodash isUndefined](https://lodash.com/docs/4.17.15#isUndefined)

## Parameters

### a

`unknown`

## Returns

`a is undefined`

`true` if `x` is a `undefined`, `false` otherwise.

## Defined in

[src/guard/is-undefined/is-undefined.ts:28](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-undefined/is-undefined.ts#L28)
