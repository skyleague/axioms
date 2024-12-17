---
editUrl: false
next: false
prev: false
title: "utf16Surrogate"
---

> **utf16Surrogate**(`context`): [`Dependent`](/api/interfaces/dependent/)\<`string`\>

Generate an utf16 string (including surrogate) arbitrary.

### Example
```ts
random(utf16Surrogate())
// => "c"
```

## Parameters

### context

[`MaybePartial`](/api/type-aliases/maybepartial/)\<`StringGenerator`\> = `{}`

## Returns

[`Dependent`](/api/interfaces/dependent/)\<`string`\>

An utf16 string.

## Defined in

[src/random/types/string/string.ts:283](https://github.com/skyleague/axioms/blob/75fb1c5c977f1940e84e5cdcef2be336d1fd81da/src/random/types/string/string.ts#L283)
