---
editUrl: false
next: false
prev: false
title: "maybeAsValue"
---

> **maybeAsValue**\<`T`\>(`x`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `undefined` : [`Just`](/api/type-aliases/just/)\<`T`\> \| `undefined` : [`Just`](/api/type-aliases/just/)\<`T`\>

This function checks if the provided Maybe value is a Just and returns the contained value.
If the value is Nothing, it returns undefined, effectively handling optional values in your code.

### Example
```ts
maybeAsValue("foobar")
// => "foobar"

maybeAsValue(Nothing)
// => undefined
```

## Type Parameters

• **T** *extends* `unknown`

The type of the value encapsulated by Just.

## Parameters

### x

`T`

The Maybe value to extract the value from.

## Returns

[[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `undefined` : [`Just`](/api/type-aliases/just/)\<`T`\> \| `undefined` : [`Just`](/api/type-aliases/just/)\<`T`\>

The value contained within Just, or undefined if the input is Nothing.

## Defined in

[src/data/maybe/maybe.ts:137](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L137)
