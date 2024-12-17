---
editUrl: false
next: false
prev: false
title: "tryToError"
---

> **tryToError**\<`T`\>(`x`): `T` *extends* [`Failure`](/api/type-aliases/failure/) ? `never` : [`Success`](/api/type-aliases/success/)\<`T`\>

Convert the `Try` to a its value, where `Success` is converted to the value, and
`Failure` is thrown`.

### Example
```ts
tryToError("foobar")
// => "foobar"

tryToError(new Error("foobar"))
// => throw Error("foobar")
```

## Type Parameters

• **T** *extends* `unknown`

The value type.

## Parameters

### x

`T`

The `Try` to transform.

## Returns

`T` *extends* [`Failure`](/api/type-aliases/failure/) ? `never` : [`Success`](/api/type-aliases/success/)\<`T`\>

## Defined in

[src/data/try/try.ts:289](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L289)
