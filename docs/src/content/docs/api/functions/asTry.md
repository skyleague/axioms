---
editUrl: false
next: false
prev: false
title: "asTry"
---

> **asTry**\<`T`\>(`x`): `AsTry`\<`T`\>

Take an expression and evaluate it. When the expression throws it will be converted to
a `Try` `Failure`.

### Example
```ts
asTry("foobar")
// => "foobar"

asTry(() => "foobar")
// => "foobar"

asTry(async () => "foobar")
// => Promise<"foobar">
```

## Type Parameters

• **T** *extends* `unknown`

The expression type.

## Parameters

### x

`T`

The expression to evaluate.

## Returns

`AsTry`\<`T`\>

The unpacked value.

## Defined in

[src/data/try/try.ts:79](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L79)
