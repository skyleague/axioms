---
editUrl: false
next: false
prev: false
title: "base64Char"
---

> **base64Char**(): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid base64 (a-zA-Z0-9+/) character arbitrary.

### Example
```ts
random(base64Char())
// => "A"
```

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary base64 character.

## Defined in

[src/random/types/char/char.ts:94](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/char/char.ts#L94)
