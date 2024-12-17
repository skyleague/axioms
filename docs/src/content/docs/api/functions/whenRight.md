---
editUrl: false
next: false
prev: false
title: "whenRight"
---

> **whenRight**\<`E`, `T`\>(`x`, `f`): `E` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? `T` : `E`

If the given Either is a Left, return it, otherwise apply the given function to the Right value and
return the result.

### Example
```ts
whenRight({ right: 'foo' }, (x) => `${x}${x}`)
// => "foofoo"

whenRight({ left: 'bar' }, (x) => `${x}${x}`)
// => { left: "bar" }
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

(`r`) => `T`

The map function.

## Returns

`E` *extends* [`Right`](/api/interfaces/right/)\<`unknown`\> ? `T` : `E`

The mapped value if right.

## Defined in

[src/data/either/either.ts:141](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L141)
