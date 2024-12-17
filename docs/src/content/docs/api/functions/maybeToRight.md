---
editUrl: false
next: false
prev: false
title: "maybeToRight"
---

> **maybeToRight**\<`L`, `T`\>(`x`, `left`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? [`Left`](/api/interfaces/left/)\<`L`\> : [`Either`](/api/type-aliases/either/)\<`L`, [`Just`](/api/type-aliases/just/)\<`T`\>\> : [`Right`](/api/interfaces/right/)\<`T`\>

Converts a Maybe value to an Either type. If the input is a Just, it returns the value as a Right.
If the input is Nothing, it returns a specified default value as a Left.

### Example
```ts
maybeToRight("foo", "foobar")
// => {right: "foo"}

maybeToRight(Nothing, "foobar")
// => {left: "foobar"}
```

## Type Parameters

• **L**

The type of the default value, and of the Left result.

• **T**

The type encapsulated in Just, if `x` is Just.

## Parameters

### x

`T`

The Maybe value to evaluate.

### left

`L`

The default value to use if `x` is Nothing.

## Returns

[[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? [`Left`](/api/interfaces/left/)\<`L`\> : [`Either`](/api/type-aliases/either/)\<`L`, [`Just`](/api/type-aliases/just/)\<`T`\>\> : [`Right`](/api/interfaces/right/)\<`T`\>

An Either type, encapsulating the value in a Right if `x` is Just, or the default in a Left if `x` is Nothing.

## Defined in

[src/data/maybe/maybe.ts:77](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L77)
