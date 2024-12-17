---
editUrl: false
next: false
prev: false
title: "recoverTry"
---

> **recoverTry**\<`U`, `T`\>(`x`, `recover`): `AsTry`\<`U`\> \| `T`

Map the value of the `Try` when it is a `Failure`.

### Example
```ts
recoverTry("foobar", s => `${s}${s}`)
// => "foobar"

recoverTry(new Error("foobar"), s => "bar")
// => "bar"
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

### recover

(`e`) => `U`

The failure transform.

## Returns

`AsTry`\<`U`\> \| `T`

## Defined in

[src/data/try/try.ts:173](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L173)
