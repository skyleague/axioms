---
editUrl: false
next: false
prev: false
title: "lowerAlphaNumericChar"
---

> **lowerAlphaNumericChar**(`extra`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha numeric (a-z0-9) character arbitrary.

### Example
```ts
random(lowerAlphaNumericChar())
// => "b"
```

## Parameters

### extra

`string` = `''`

A string of extra characters to include in the set of characters to choose from.

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary lower case alpha numeric character.

## Defined in

[src/random/types/char/char.ts:167](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/char/char.ts#L167)
