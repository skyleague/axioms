---
editUrl: false
next: false
prev: false
title: "lowerAlpha"
---

> **lowerAlpha**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha (a-z) string arbitrary.

### Example
```ts
random(lowerAlpha())
// => "bab"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`AlphaGenerator`](/api/interfaces/alphagenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary lower case alpha string.

## Defined in

[src/random/types/string/string.ts:189](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L189)
