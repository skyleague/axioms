---
editUrl: false
next: false
prev: false
title: "whenJust"
---

> **whenJust**\<`T`, `M`\>(`x`, `f`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `T` : [`Maybe`](/api/type-aliases/maybe/)\<`M`\> : `M`

Applies a transformation function to the value inside a Just, or returns Nothing if the value is Nothing.
This function is used to manipulate the data within a Just, allowing for operations like transformations or computations,
while safely handling cases where there is no value (i.e., Nothing).

### Example
```ts
whenJust(5, x => x * 2)
// => 10

whenJust(Nothing, (x) => `${x}${x}`)
// => Nothing
```

## Type Parameters

• **T** *extends* `unknown`

The type of the value inside the Just.

• **M** *extends* `unknown` = `T`

The type of the value returned by function f, wrapped in a Just.

## Parameters

### x

`T`

The Maybe value to process. It can be a Just containing a value or Nothing.

### f

(`x`) => `M`

A function to apply to the value inside the Just.

## Returns

[[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? `T` : [`Maybe`](/api/type-aliases/maybe/)\<`M`\> : `M`

If x is a Just, returns a new Just containing the result of applying f to the original value. If x is Nothing, returns Nothing.

## Defined in

[src/data/maybe/maybe.ts:168](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L168)
