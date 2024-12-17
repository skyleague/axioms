---
editUrl: false
next: false
prev: false
title: "rightToMaybe"
---

> **rightToMaybe**\<`T`\>(`x`): `T` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `T` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? [`Maybe`](/api/type-aliases/maybe/)\<`R`\> : `R` : [`Nothing`](/api/type-aliases/nothing/)

Converts a Right value from an Either type to a Just type, or returns Nothing if the value is Left.

### Example
```ts
rightToMaybe({right: "foo"})
// => "foo"

rightToMaybe({left: "bar"})
// => Nothing
```

## Type Parameters

• **T** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

The type of the Either. It determines the type encapsulated if Right.

## Parameters

### x

`T`

The Either object to examine. This function checks if it is a Right and extracts its value.

## Returns

`T` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `T` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? [`Maybe`](/api/type-aliases/maybe/)\<`R`\> : `R` : [`Nothing`](/api/type-aliases/nothing/)

A Maybe type, wrapping the Right value if present; otherwise, Nothing.

## Defined in

[src/data/maybe/maybe.ts:51](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L51)
