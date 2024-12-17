---
editUrl: false
next: false
prev: false
title: "maybeToLeft"
---

> **maybeToLeft**\<`T`, `R`\>(`x`, `right`): [[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? [`Right`](/api/interfaces/right/)\<`R`\> : [`Either`](/api/type-aliases/either/)\<[`Just`](/api/type-aliases/just/)\<`T`\>, `R`\> : [`Left`](/api/interfaces/left/)\<`T`\>

Transforms a Maybe value into an Either type, returning a Left containing the Just value.
If the Maybe is Nothing, it returns a Right with a specified default value.

### Example
```ts
maybeToLeft("foo", "fallback")
// => {left: "foo"}

maybeToLeft(Nothing, "fallback")
// => {right: "fallback"}
```

## Type Parameters

• **T**

The type held by Just in the Maybe.

• **R**

The type of the Right value in the returned Either.

## Parameters

### x

`T`

The Maybe value to transform. If it is a Just, it is returned as the Left part of an Either.

### right

`R`

The default value to use for the Right part if `x` is Nothing.

## Returns

[[`Nothing`](/api/type-aliases/nothing/)] *extends* [`T`] ? `IsEqual`\<`T`, [`Nothing`](/api/type-aliases/nothing/)\> *extends* `true` ? [`Right`](/api/interfaces/right/)\<`R`\> : [`Either`](/api/type-aliases/either/)\<[`Just`](/api/type-aliases/just/)\<`T`\>, `R`\> : [`Left`](/api/interfaces/left/)\<`T`\>

Either a Left containing the Just value or a Right with the default value.

## Defined in

[src/data/maybe/maybe.ts:108](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/data/maybe/maybe.ts#L108)
