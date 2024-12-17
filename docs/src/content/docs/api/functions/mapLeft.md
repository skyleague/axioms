---
editUrl: false
next: false
prev: false
title: "mapLeft"
---

> **mapLeft**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? [`Left`](/api/interfaces/left/)\<`T`\> : `E`

If the given Either is a Right, return it, otherwise return a new Left with the result of applying
the given function to the Left value.

### Example
```ts
mapLeft({ left: 'bar' }, (x) => `${x}${x}`)
// => { left: "barbar" }

mapLeft({ right: 'bar' }, (x) => `${x}${x}`)
// => { right: "bar" }
```

## Type Parameters

• **E** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

• **T**

The mapped type.

## Parameters

### x

`E`

The either value to map.

### f

(`l`) => `T`

The map function.

## Returns

`E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? [`Left`](/api/interfaces/left/)\<`T`\> : `E`

The mapped either object.

## Defined in

[src/data/either/either.ts:217](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L217)
