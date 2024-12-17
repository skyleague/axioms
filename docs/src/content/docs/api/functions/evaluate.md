---
editUrl: false
next: false
prev: false
title: "evaluate"
---

> **evaluate**\<`T`\>(`maybeEvaluate`): `T`

Takes a value or a function that returns a value, and returns the value.

### Example
```ts
evaluate("foobar")
// => "foobar"

evaluate(() => "foobar"))
// => "foobar"
```

## Type Parameters

• **T**

The element type.

## Parameters

### maybeEvaluate

The value to evaluate

`T` | () => `T`

## Returns

`T`

A function that takes a value of type T or a function that returns a value of type T and
         returns a value of type T.

## Defined in

[src/function/evaluate/evaluate.ts:23](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/function/evaluate/evaluate.ts#L23)
