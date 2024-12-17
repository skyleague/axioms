---
editUrl: false
next: false
prev: false
title: "tryFromEither"
---

> **tryFromEither**\<`L`, `R`\>(`x`): [`Try`](/api/type-aliases/try/)\<`R`\>

Convert the `Either` to a `Try`, where `Right` is converted to `Success`, and
`Left` is converted to `Failure`.

### Example
```ts
tryFromEither({right: "foobar"})
// => "foobar"

tryFromEither({left: new Error("foobar")})
// => Error("foobar")
```

## Type Parameters

• **L**

The `Left` type.

• **R** *extends* `unknown`

The `Right` type.

## Parameters

### x

[`Either`](/api/type-aliases/either/)\<`L`, `R`\>

The `Either` to transform.

## Returns

[`Try`](/api/type-aliases/try/)\<`R`\>

## Defined in

[src/data/try/try.ts:220](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L220)
