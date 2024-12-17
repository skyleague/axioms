---
editUrl: false
next: false
prev: false
title: "alphaChar"
---

> **alphaChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha (a-zA-Z) character arbitrary.

### Example
```ts
random(alphaChar())
// => "B"
```

## Parameters

### extra

`string` = `''`

A string of extra characters to include in the set of characters to choose from.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary alpha character.

## Defined in

[src/random/types/char/char.ts:113](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/char/char.ts#L113)
