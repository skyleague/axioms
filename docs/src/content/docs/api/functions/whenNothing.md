---
editUrl: false
next: false
prev: false
title: "whenNothing"
---

> **whenNothing**\<`T`, `M`\>(`x`, `f`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `M` : `M` \| [`Just`](/api/type-aliases/just/)\<`T`\> : `T`

If the given Maybe is a Nothing, then return the result of the given function, otherwise return the
given Maybe.

### Example
```ts
whenNothing(Nothing, () => `foobar`)
// => "foobar"

whenNothing(0, () => `foobar`)
// => 0
```

## Type Parameters

• **T** *extends* `unknown`

The maybe type.

• **M** *extends* `unknown` = `T`

The mapped type.

## Parameters

### x

`T`

The Maybe value to map.

### f

() => `M`

The map function.

## Returns

[[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `M` : `M` \| [`Just`](/api/type-aliases/just/)\<`T`\> : `T`

The mapped value if Nothing.

## Defined in

[src/data/maybe/maybe.ts:242](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L242)
