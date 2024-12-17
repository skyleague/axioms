---
editUrl: false
next: false
prev: false
title: "tryToMaybe"
---

> **tryToMaybe**\<`T`\>(`x`): `T` *extends* [`Failure`](/api/type-aliases/failure/) ? [`Nothing`](/api/type-aliases/nothing/) : [`Success`](/api/type-aliases/success/)\<`T`\>

Convert the `Try` to a `Maybe`, where `Success` is converted to `Just`, and
`Failure` is converted to `Nothing`.

### Example
```ts
tryToMaybe("foobar")
// => "foobar"

tryToMaybe(new Error("foobar"))
// => Nothing
```

## Type Parameters

• **T** *extends* `unknown`

The value type.

## Parameters

### x

`T`

The `Try` to transform.

## Returns

`T` *extends* [`Failure`](/api/type-aliases/failure/) ? [`Nothing`](/api/type-aliases/nothing/) : [`Success`](/api/type-aliases/success/)\<`T`\>

## Defined in

[src/data/try/try.ts:243](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L243)
