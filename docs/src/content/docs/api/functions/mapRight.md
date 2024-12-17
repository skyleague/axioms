---
editUrl: false
next: false
prev: false
title: "mapRight"
---

> **mapRight**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? [`Right`](/api/interfaces/right/)\<`T`\> : `E`

Applies a transformation function to the `Right` value of an `Either` type, if present.
If the input is a `Left`, it remains unchanged.

### Example
```ts
mapRight({ right: 'bar' }, (x) => `${x}${x}`)
// => { right: "barbar" }

mapRight({ left: 'bar' }, (x) => `${x}${x}`)
// => { left: "bar" }
```

## Type Parameters

• **E** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

The type of the Either.

• **T**

The type of the transformed `Right` value.

## Parameters

### x

`E`

The `Either` value to map.

### f

(`r`) => `T`

The transformation function to apply to the `Right` value.

## Returns

`E` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? [`Right`](/api/interfaces/right/)\<`T`\> : `E`

An `Either` object where the `Right` has been transformed if present, or the original `Left`.

## Defined in

[src/data/either/either.ts:73](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L73)
