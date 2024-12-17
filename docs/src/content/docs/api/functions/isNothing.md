---
editUrl: false
next: false
prev: false
title: "isNothing"
---

> **isNothing**(`x`): `x is typeof Nothing`

Checks if `x` is [Nothing](../../../../../../api/variables/nothing).

### Example
```ts
isNothing(Nothing)
// => true

isNothing(1234)
// => false

isNothing("foobar")
// => false
```

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is typeof Nothing`

`true` if `x` is [Nothing](/api/api/variables/nothing/), `false` otherwise.

## See

[isJust](../../../../../../api/functions/isjust)

## Defined in

[src/guard/is-nothing/is-nothing.ts:28](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-nothing/is-nothing.ts#L28)
