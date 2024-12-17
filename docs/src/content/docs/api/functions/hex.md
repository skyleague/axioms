---
editUrl: false
next: false
prev: false
title: "hex"
---

> **hex**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a hexidecimal (0-9a-f) string arbitrary.

### Example
```ts
random(hex())
// => "deadbeef"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`StringGenerator`\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary hexadecimal string.

## Defined in

[src/random/types/string/string.ts:116](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L116)
