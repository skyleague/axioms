---
editUrl: false
next: false
prev: false
title: "eitherToError"
---

> **eitherToError**\<`E`\>(`x`): `E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? `R` : `R` : `never`

Returns [right](../../../../../../api/functions/right) when `x` is a [Right](../../../../../../api/interfaces/right) type, otherwise
throw [left](../../../../../../api/functions/left).

### Pseudocode
```ts
if (isLeft(x)) {
    throw x.left
}
return x.right
```

### Example
```ts
eitherToError({ right: 'foo' })
// => 'foo'

eitherToError({ left: new MyError('my-message') })
// => throw new MyError('my-message')
```

## Type Parameters

• **E** *extends* [`Either`](/api/type-aliases/either/)\<`unknown`, `unknown`\>

## Parameters

### x

`E`

The [Either](../../../../../../api/type-aliases/either) type.

## Returns

`E` *extends* [`Right`](/api/interfaces/right/)\<infer R\> ? `E` *extends* [`Left`](/api/interfaces/left/)\<`unknown`\> ? `R` : `R` : `never`

x.right when the [Either](/api/api/type-aliases/either/) is [Right](/api/api/interfaces/right/).

## Throws

x.left when the [Either](../../../../../../api/type-aliases/either) is [Left](../../../../../../api/interfaces/left).

## See

[Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)

## Defined in

[src/data/either/either.ts:394](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/either/either.ts#L394)
