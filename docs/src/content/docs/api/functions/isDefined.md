---
editUrl: false
next: false
prev: false
title: "isDefined"
---

> **isDefined**\<`T`\>(`x`): `x is T`

Checks if `x` is not `null` or `undefined`.

### Example
```ts
isDefined(true)
// => true

isDefined("1234")
// => true

isDefined(undefined)
// => false

isDefined(null)
// => false
```

## Type Parameters

• **T**

The type of `x`.

## Parameters

### x

The value to check.

`undefined` | `null` | `T`

## Returns

`x is T`

`false` if `x` is a `undefined` or `null`, `true` otherwise.

## Defined in

[src/guard/is-defined/is-defined.ts:27](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-defined/is-defined.ts#L27)
