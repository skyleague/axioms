---
editUrl: false
next: false
prev: false
title: "failure"
---

> **failure**\<`T`\>(`f`): [`Failure`](/api/type-aliases/failure/)

Converts the value to a `Failure`. The function as as an identity function on a failure.

### Example
```ts
failure("foobar")
// => Error("foobar")

failure(new Error("foobar"))
// => Error("foobar")
```

## Type Parameters

• **T**

The value type.

## Parameters

### f

`T`

The value to create a Failure from.

## Returns

[`Failure`](/api/type-aliases/failure/)

The unpacked value.

## Defined in

[src/data/try/try.ts:44](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/try/try.ts#L44)
