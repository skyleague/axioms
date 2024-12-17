---
editUrl: false
next: false
prev: false
title: "alphaNumericChar"
---

> **alphaNumericChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha numeric (a-zA-Z0-9) character arbitrary.

### Example
```ts
random(alphaNumericChar())
// => "9"
```

## Parameters

### extra

`string` = `''`

A string of extra characters to include in the set of characters to choose from.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary alpha numeric character.

## Defined in

[src/random/types/char/char.ts:149](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/char/char.ts#L149)
