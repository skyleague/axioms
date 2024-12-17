---
editUrl: false
next: false
prev: false
title: "tryAsValue"
---

> **tryAsValue**\<`T`\>(`x`): `T` *extends* [`Failure`](/api/type-aliases/failure/) ? `undefined` : [`Success`](/api/type-aliases/success/)\<`T`\>

Convert the `Try` to a value, where `Success` is converted to the value, and
`Failure` is converted to `undefined`.

### Example
```ts
tryAsValue("foobar")
// => "foobar"

tryAsValue(new Error("foobar"))
// => undefined
```

## Type Parameters

• **T** *extends* `unknown`

The value type.

## Parameters

### x

`T`

The `Try` to transform.

## Returns

`T` *extends* [`Failure`](/api/type-aliases/failure/) ? `undefined` : [`Success`](/api/type-aliases/success/)\<`T`\>

## Defined in

[src/data/try/try.ts:266](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L266)
