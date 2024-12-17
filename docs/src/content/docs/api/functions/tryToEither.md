---
editUrl: false
next: false
prev: false
title: "tryToEither"
---

> **tryToEither**\<`T`\>(`x`): [`Either`](/api/type-aliases/either/)\<[`Failure`](/api/type-aliases/failure/), [`Success`](/api/type-aliases/success/)\<`T`\>\>

Convert the `Try` to an `Either`, where `Success` is converted to `Right`, and
`Failure` is converted to `Left`.

### Example
```ts
tryToEither("foobar")
// => {right: "foobar"}

tryToEither(new Error("foobar"))
// => {left: Error("foobar")}
```

## Type Parameters

• **T** *extends* `unknown`

The value type.

## Parameters

### x

`T`

The `Try` to transform.

## Returns

[`Either`](/api/type-aliases/either/)\<[`Failure`](/api/type-aliases/failure/), [`Success`](/api/type-aliases/success/)\<`T`\>\>

## Defined in

[src/data/try/try.ts:196](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L196)
