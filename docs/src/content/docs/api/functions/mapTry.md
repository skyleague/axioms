---
editUrl: false
next: false
prev: false
title: "mapTry"
---

> **mapTry**\<`U`, `T`\>(`x`, `fn`): `AsTry`\<`U`\>

Map the value of the `Try` when it is a `Success`.

### Example
```ts
mapTry("foobar", s => `${s}${s}`)
// => "foobarfoobar"

mapTry(new Error("foobar"), s => `${s}${s}`)
// => Error("foobar")
```

## Type Parameters

• **U**

The transformed type.

• **T** *extends* `unknown`

The input type.

## Parameters

### x

`T`

The `Try` to transform.

### fn

(`e`) => `U`

The success transform.

## Returns

`AsTry`\<`U`\>

## Defined in

[src/data/try/try.ts:149](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L149)
