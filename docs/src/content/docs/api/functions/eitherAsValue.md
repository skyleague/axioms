---
editUrl: false
next: false
prev: false
title: "eitherAsValue"
---

> **eitherAsValue**\<`E`\>(`x`): `E` *extends* [`Left`](/api/interfaces/left/)\<infer L\> ? `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `L` \| `R` : `L` : `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `R` : `never`

Extracts and returns the value from an Either type, whether it is a Left or a Right.
This function discriminates between Left and Right and returns the contained value directly.

### Example
```ts
eitherAsValue({left: "foo"})
// => "foo"

eitherAsValue({right: "bar"})
// => "bar"
```

## Type Parameters

• **E** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

## Parameters

### x

`E`

The Either value to extract from.

## Returns

`E` *extends* [`Left`](/api/interfaces/left/)\<infer L\> ? `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `L` \| `R` : `L` : `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `R` : `never`

The value contained in the Either.

## Defined in

[src/data/either/either.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L23)
