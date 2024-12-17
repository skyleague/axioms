---
editUrl: false
next: false
prev: false
title: "whenLeft"
---

> **whenLeft**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? `T` : `E`

If the given Either is a Left, apply the given function to the Left value and return the result.
Otherwise, return the given Either.

### Example
```ts
whenLeft({ left: 'foo' }, (x) => `${x}${x}`)
// => "foofoo"

whenLeft({ right: 'bar' }, (x) => `${x}${x}`)
// => { right: "bar" }
```

## Type Parameters

• **E** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

• **T** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

The mapped type.

## Parameters

### x

`E`

The either value to map.

### f

(`l`) => `T`

The map function.

## Returns

`E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? `T` : `E`

The mapped value if right.

## Defined in

[src/data/either/either.ts:286](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L286)
