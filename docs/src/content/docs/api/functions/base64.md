---
editUrl: false
next: false
prev: false
title: "base64"
---

> **base64**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid base64 (a-zA-Z0-9+/) string arbitrary. And adds the padding
as required.

### Example
```ts
random(base64())
// => "abc="
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`StringGenerator`\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary base64 string.

## Defined in

[src/random/types/string/string.ts:134](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L134)
