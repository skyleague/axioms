---
editUrl: false
next: false
prev: false
title: "alpha"
---

> **alpha**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha (a-zA-Z) string arbitrary.

### Example
```ts
random(alpha())
// => "Bab"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`AlphaGenerator`](/api/interfaces/alphagenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary alpha string.

## Defined in

[src/random/types/string/string.ts:170](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L170)
