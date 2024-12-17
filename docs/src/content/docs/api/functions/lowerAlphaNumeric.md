---
editUrl: false
next: false
prev: false
title: "lowerAlphaNumeric"
---

> **lowerAlphaNumeric**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate a valid lower case alpha numeric (a-z0-9) string arbitrary.

### Example
```ts
random(lowerAlphaNumericChar())
// => "b"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<[`AlphaNumericGenerator`](/api/interfaces/alphanumericgenerator/)\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An arbitrary lower case alpha numeric string.

## Defined in

[src/random/types/string/string.ts:231](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L231)
