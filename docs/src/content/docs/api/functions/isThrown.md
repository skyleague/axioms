---
editUrl: false
next: false
prev: false
title: "isThrown"
---

> **isThrown**\<`T`\>(`x`): `x is T & { [Thrown]?: true }`

Checks if `x` was tagged as thrown.

## Type Parameters

• **T** *extends* `object`

## Parameters

### x

`unknown`

The value to check.

## Returns

`x is T & { [Thrown]?: true }`

`true` if `x` is tagged as thrown, otherwise `false`.

## Defined in

[src/guard/is-thrown/is-thrown.ts:13](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/guard/is-thrown/is-thrown.ts#L13)
