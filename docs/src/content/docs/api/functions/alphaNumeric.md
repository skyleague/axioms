---
editUrl: false
next: false
prev: false
title: "alphaNumeric"
---

> **alphaNumeric**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid alpha numeric (a-zA-Z0-9) string arbitrary.

### Example
```ts
random(alphaNumeric())
// => "9ab10"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`AlphaNumericGenerator`](/api/interfaces/alphanumericgenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary alpha numeric string.

## Defined in

[src/random/types/string/string.ts:212](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L212)
