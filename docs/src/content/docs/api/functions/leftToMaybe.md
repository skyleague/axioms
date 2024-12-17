---
editUrl: false
next: false
prev: false
title: "leftToMaybe"
---

> **leftToMaybe**\<`T`\>(`x`): `T` *extends* [`Left`](/api/interfaces/left/)\<infer L\> ? `T` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? [`Maybe`](/api/type-aliases/maybe/)\<`L`\> : `L` : [`Nothing`](/api/type-aliases/nothing/)

Converts a `Left` type from an `Either` into a `Maybe`. If the input is a `Left`, the value is returned as a `Just`.
Otherwise, if the input is a `Right`, `Nothing` is returned.

### Example
```ts
leftToMaybe({left: "error"})
// => "error"

leftToMaybe({right: 42})
// => Nothing
```

## Type Parameters

• **T** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

The type of the `Either` value.

## Parameters

### x

`T`

The `Either` value to be converted.

## Returns

`T` *extends* [`Left`](/api/interfaces/left/)\<infer L\> ? `T` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? [`Maybe`](/api/type-aliases/maybe/)\<`L`\> : `L` : [`Nothing`](/api/type-aliases/nothing/)

A `Maybe` wrapping the left value, or `Nothing`.

## Defined in

[src/data/maybe/maybe.ts:28](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L28)
